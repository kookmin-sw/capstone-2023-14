#!/usr/bin/env python
# -*- coding: utf-8 -*-
import math
import base64
import numpy as np
import pandas
import pandas as pd
import pickle
import random
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer, TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity
from sklearn.preprocessing import normalize
from collections import Counter

from database import Database


np.set_printoptions(threshold=np.inf, linewidth=np.inf)

def getCountry():
    # Database 접속
    db = Database()


    # 여행지 이름 찾기
    sql = 'select id, name from country order by 1;'
    country = pd.read_sql_query(sql, db.conn)
    country_name = country['name']


    # 사용자 별점정보 조회
    user_id = 'test'
    sql = f'''
            select c.user_id, c.id, ifnull(mr.rating, 0.0) as rating 
            from member_rating as mr right outer join (select member.email as user_id, country.* from member right outer join country on 1=1) as c 
            on mr.user_id=c.user_id and mr.country_id=c.id
            where c.user_id="{user_id}"
            order by 1, 2;
        '''
    df = pd.read_sql_query(sql, db.conn)

    # index는 행을 의미
    user_data = pd.pivot_table(df, index='user_id', columns='id', values='rating')
    user_ratings = user_data.to_numpy().reshape(-1)


    # Content기반 예측평점 계산
    with open('data.pickle', 'rb') as f:
        content_similarities = pickle.load(f)
        content_similarities = np.array(content_similarities)


    # 하이브리드 추천시스템 (CF X Content기반)
    # 유저의 예측 별점계산
    user_predicted_ratings = np.zeros((len(country)))
    for item in range(len(country)):
        # 이미 별점이 있는 경우
        if user_ratings[item] != 0:
            user_predicted_ratings[item] = user_ratings[item]
            continue

        # Content기반 필터링
        similar_countries = np.argsort(content_similarities[item])[::-1]

        # 유저가 매긴 별점이 있는 유사한 여행지만 추출
        rated_similar_country = []
        for country in similar_countries:
            if user_ratings[country] != 0:
                rated_similar_country.append(country)
                # 유사한 여행지 상위 5개로 제한
                if len(rated_similar_country) == 5:
                    break

        if len(rated_similar_country) > 0:
            weighted_ratings = 0
            similarity_sum = 0

            # Hybrid Filtering
            # 콘텐츠 기반 필터링이 적용된 상태
            for country in rated_similar_country:
                similarity = content_similarities[item][country]
                weighted_ratings += user_ratings[country] * similarity
                similarity_sum += similarity
            predict_rating = weighted_ratings / similarity_sum
        else:
            # 평가한 데이터가 아예 없는 경우
            predict_rating = 0

        user_predicted_ratings[item] = predict_rating

    print(user_predicted_ratings)


    # Hybrid 필터링 (CF+콘텐츠기반)

    # hybrid_ratings = user_predicted_ratings.dot(content_similarities)

    # print(hybrid_ratings)


    db.close()

def getCompanion():
    db = Database()

    # STEP1. 특정여행지 별점행렬
    # user_info: user_id와 index를 치환하는 용도
    user_info = dict()

    # rating_data: 특정여행지에 대한 별점정보
    # {'test': 5.0, 'vory': 4.5}
    rating_data = list()
    country_id = 22
    sql = f'''
        select member_info.id, ifnull(member_rating.rating, 0.0) as rating
        from member_rating right outer join member_info 
        on member_rating.user_id=member_info.id and member_rating.country_id={country_id}
        order by 1, 2;
    '''
    res = db.select(sql)
    for idx, item in enumerate(res):
        user_id, rating = item
        rating_data.append(float(rating))

        # user_info는 이메일<->index값
        user_info[idx] = user_id
        user_info[user_id] = idx

    rating_data = np.array(rating_data)
    # 0값이면 평균값으로 치환
    rating_data = np.where(rating_data<0.5, np.average(rating_data), rating_data)
    # 정규화(normalization)
    rating_data = rating_data / np.linalg.norm(rating_data)

    # 점수끼리 내적 (서로 비슷한 점수일수록 1에 가까워짐)
    length = len(rating_data)
    rating_distance = np.empty((length, length), np.float32)
    for i, data in enumerate(rating_data):
        for j, data2 in enumerate(rating_data):
            # 점수가 비슷할수록 값이 커지도록
            rating_distance[i, j] = 1 - np.abs(data - data2)
    # print(rating_distance)


    # STEP2. 취향행렬
    # user_data: 취향정보 string 배열
    # user_data_gender: 혼성,동성 정보 배열
    user_data = list()
    user_data_gender = list()
    sql = '''
        select mf.*, m.gender
        from member_info as mf, member as m
        where mf.id=m.email
        order by 1;
    '''
    res = db.select(sql)
    for idx, item in enumerate(res):
        user_id = item[0]
        info = ";".join(item[1:4])
        user_data.append(info)
        # 혼성/동성, 본인의 gender
        user_data_gender.append([item[4], item[5]])

    # print(user_data)
    # print(user_data_gender)

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(user_data)

    # 이미 행렬이 정규화된 상태이므로 linear_kernel
    user_cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    user_cosine_sim = np.array(user_cosine_sim)
    # print(user_cosine_sim)


    # STEP3. 위 두개의 행렬계산
    # rating_distance는 평가하지 않은 사람들이 모두 동일하게 나오는 단점
    # 따라서 비율을 조정함(30%)
    combine_scores = rating_distance*0.3 + user_cosine_sim*0.7
    print(combine_scores)

    # input: user_id
    _input = 'vory'
    _index = user_info[_input]

    companion_index = np.argsort(combine_scores[_index])[::-1]
    # 동성/혼성 조건
    # 혼성으로 설정했으면 제외
    include_index = list()
    for idx in companion_index[1:]:
        if user_data_gender[_index][0] == '혼성':
            if user_data_gender[idx][0] == '혼성':
                include_index.append(idx)
            elif user_data_gender[_index][1] == user_data_gender[idx][1]:   # 성이 같을때만
                include_index.append(idx)
        elif user_data_gender[_index][0] == '동성':
            if user_data_gender[_index][1] == user_data_gender[idx][1]:  # 성이 같을때만
                include_index.append(idx)


    # 본인은 제외 (최대 10명까지)
    max_len = min(10, len(include_index))
    include_index = include_index[:max_len]
    companion_list = list()
    for idx in include_index:
        companion_list.append(user_info[idx])


    # 유저 정보 조회
    _str = ",".join('"'+x+'"' for x in companion_list)
    sql = f'''
        select name, phone_number, gender, birth, mbti, profile
        from member
        where email in ({_str})
        order by FIELD(email, {_str});
    '''
    res = db.select(sql)

    result = list()
    for item in res:
        profile = item[5]
        if profile != None:
            profile = base64.b64encode(item[5])

        info = {
            'name': item[0],
            'phone': item[1],
            'gender': item[2],
            'birth': item[3],
            'mbti': item[4],
            'profile': profile
        }
        result.append(info)

    print(companion_list)
    print(result)












    db.close()









if __name__ == "__main__":
    getCountry()
    # getCompanion()