#!/usr/bin/env python
# -*- coding: utf-8 -*-
import math
import numpy as np
import pandas as pd
import pickle
import random
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer, TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity
from collections import Counter

from database import Database


np.set_printoptions(threshold=np.inf, linewidth=np.inf)



if __name__ == "__main__":
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