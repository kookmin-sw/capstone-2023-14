#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request
from flask_restx import Resource, Api, reqparse

import numpy as np
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer, TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity
from collections import Counter


from database import Database

app = Flask(__name__)
api = Api(app)
app.config['DEBUG'] = True
np.set_printoptions(threshold=np.inf, linewidth=np.inf)

@app.route('/api/country', methods=['GET'])
def getCountry():
    _input = request.args['email']

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

        # '호텔': 665 -> 호텔 665번 나오게 됨
        word_list = list(Counter(crawl_data).elements())
        country_word_list.append(" ".join(word_list))

    country_name = np.array(country_name)

    vectorizer = TfidfVectorizer()  # 상위 500단어 추출
    tfidf_matrix = vectorizer.fit_transform(country_word_list)

    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    cosine_sim = np.array(cosine_sim)

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
    _index = user_info[_input]
    # 본인이 갔다왔던 여행지는 제외
    except_index = np.where(user_data[_input] > 0)
    travel_cosim[_index][except_index] = 0

    score_indics = np.argsort(travel_cosim[_index])[::-1]
    output = country_name[score_indics][:10]

    db.close()

    return jsonify({
        'result': list(output)
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0')