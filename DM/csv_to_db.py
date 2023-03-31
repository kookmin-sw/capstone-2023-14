#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import re #추가
from dotenv import load_dotenv
import pandas as pd
from collections import Counter
from datetime import datetime

from konlpy.tag import Komoran, Okt, Mecab
from database import Database
import platform


#데이터 전처리 함수
def preprocessing(review):
    #한글 이외의 것 제거
    hangul = re.compile('[^가-힣]')
    review_text = hangul.sub(' ', review)

    # komoran를 사용해 형태소 단위로 쪼개주기
    # komoran = Komoran()
    # word_review = komoran.nouns(review_text)

    # Mecab 설치 (Komoran보다 훨씬 빠름)
    # https://velog.io/@jyong0719/konlpy-mecab-%EC%84%A4%EC%B9%98-window
    if platform.system() == "Linux":
        mecab = Mecab()
    else:
        mecab = Mecab(dicpath=os.environ.get('MECAB_DIR'))
    word_review = mecab.nouns(review_text)

    #불용어 제거하기
    fire_dragon = ['의', '이', '있', '하', '들', '그', '되', '수', '보', '않', '없', '나', '사람', '아', '등', '같', '오', '있','한']
    fire_dragon += ['여행', '사진', '시간', '정도', '생각', '지만', '절대', '니다', '', '그간', '남이', '조금', '후기', '사용', '도착', '때문', '보니', '안녕하세요',
                    '이다', '한국', '이랑', '이번', '간다', '완전', '이건', '나름', '하면', '여기', '다음', '이후', '']
    word_review = list(set(word_review))
    fire_word = [w for w in word_review if not w in fire_dragon and len(w)>1]

    return fire_word  #가볍게 전처리를 한 문자열 반환




if __name__ == "__main__":
    # load .env
    load_dotenv()
    # os.environ['JAVA_HOME'] = os.environ.get('JAVA_HOME')

    # ./blog_data/ 폴더 밑에 있는 크롤링 csv파일 로드
    crawl_path = './blog_data/'
    file_list = os.listdir(crawl_path)
    file_list = sorted(file_list, key=lambda x: int(x.split('_')[0]))    # 파일명 순서대로 정렬

    # Database에서 country id 가져오기
    db = Database()

    for file in file_list:
        country_name = file.split('_')[1]
        res = db.select(f'select id from country where name="{country_name}"')
        if len(res) == 0:
            continue

        country_id = res[0][0]

        # pandas csv 파일 읽기
        # Buffer overflow 관련 오류로 lineterminator 파라미터 추가
        data = pd.read_csv(crawl_path + file, lineterminator='\n')
        word_set = []

        for idx, content in enumerate(data['contents']):
            try:
                final_word_list = preprocessing(content)
                word_set.extend(final_word_list)
            except Exception as e:
                if str(e).find('expected string or bytes-like object') != -1:
                    continue
                print(e)


        wc = dict(Counter(word_set).most_common())

        wc = dict(filter(lambda x:x[1] > 10, wc.items()))   # 10번 이상 들어간 값만 추출
        # print(wc)
        # print(f"{country_id}_{country_name} : LENGTH={len(str(wc))}")
        # print("="*50)


        # Database 데이터 insert (값이 있으면 UPDATE)
        cur_time = datetime.today().strftime("%Y/%m/%d %H:%M:%S")
        query = f'INSERT INTO country_data VALUES({country_id}, "{str(wc)}", now())' \
                f'ON DUPLICATE KEY UPDATE id="{country_id}", contents="{str(wc)}", upload_time=now();'

        db.query(query)




    db.close()

