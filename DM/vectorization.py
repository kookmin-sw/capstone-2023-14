#!/usr/bin/env python
# -*- coding: utf-8 -*-
import math
import numpy as np
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
    # Database 접속 -> 크롤링 요약 데이터 가져오기
    db = Database()
    res = db.select('''
                    select c.id, c.name, cd.contents
                    from country_data as cd, country as c
                    where cd.id=c.id
                    order by 1;
                ''')

    country_word_list = []
    country_cnt = Counter([])
    country_name = []
    # ID, NAME, CONTENTS
    for row in res:
        country_name.append(row[1])
        crawl_data = eval(row[2])
        country_cnt += crawl_data

    country_name = np.array(country_name)

    # Cosine 벡터 pickle로부터 get
    with open('data.pickle', 'rb') as f:
        cosine_sim = pickle.load(f)

    # 사용자 별점정보 조회
    user_info = dict()  # 이메일과 index 매칭
    user_data = dict()
    res = db.select('''
            select user_id, country_id, rating 
            from member_rating
            order by 1, 2;
        ''')

    # 'seo5220@naver.com': [0, 0, 0, 0, 0, 0, 0, 0, 0,
    for item in res:
        index = item[0]
        i_country = int(item[1])
        i_rating = int(item[2])
        if index not in user_data:
            user_data[index] = np.array([0 for cn in country_name])
        user_data[index][i_country] = i_rating
    # print(user_data)

    # 행=유저수, 열=Country수
    user_ratings = np.zeros((len(user_data.keys()), len(country_name)))
    for idx, key in enumerate(user_data.keys()):
        user_ratings[idx] = user_data[key]
        # user_info는 이메일<->index값
        user_info[idx] = key
        user_info[key] = idx
    # print(user_info)

    travel_cosim = cosine_similarity(user_ratings, cosine_sim)
    _input = 'seo52201@naver.com'
    if _input in user_info:
        _index = user_info[_input]
        # 본인이 갔다왔던 여행지는 제외
        except_index = np.where(user_data[_input] > 0)
        travel_cosim[_index][except_index] = 0

        score_indics = np.argsort(travel_cosim[_index])[::-1]
    else:
        # 아예 평가를 하지 않았던 여행자 Case
        # 랜덤 Index로 처리하게 되었음. 추후 보완 필요
        ran_index = random.randint(0, len(country_name))
        score_indics = np.argsort(cosine_sim[ran_index])[::-1]

    output = country_name[score_indics][:10]
    print(output)

    db.close()

def getCompanion():
    db = Database()




    # STEP1. 특정여행지 별점행렬
    # user_info: user_id와 index를 치환하는 용도
    user_info = dict()

    # rating_data: 특정여행지에 대한 별점정보
    # {'test': 5.0, 'vory': 4.5}
    rating_data = list()
    country_id = 1
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
    _input = 'test'
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
        info = {
            'name': item[0],
            'phone': item[1],
            'gender': item[2],
            'birth': item[3],
            'mbti': item[4],
            'profile': item[5]
        }
        result.append(info)

    print(companion_list)
    print(result)












    db.close()

if __name__ == "__main__":
    getCompanion()