import math
import numpy as np
import pandas as pd

from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer, TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from collections import Counter

from database import Database


np.set_printoptions(threshold=np.inf, linewidth=np.inf)

def get_tfidf(data):
    # 모든 문서의 단어 집합 만들기
    vocabulary = set([d.keys() for d in data])
    print(vocabulary)



if __name__ == "__main__":
    # Database 접속 -> 크롤링 요약 데이터 가져오기
    db = Database()
    res = db.select('select id,contents from country_data order by 1;')

    country_word_list = []
    country_cnt = Counter([])
    for row in res:
        crawl_data = eval(row[1])
        country_cnt += crawl_data

        # '호텔': 665 -> 호텔 665번 나오게 됨
        word_list = list(Counter(crawl_data).elements())
        country_word_list.append(" ".join(word_list))
    db.close()

    # print(country_word_list[0])

    vectorizer = TfidfVectorizer(max_features=500)  # 상위 500단어 추출
    tfidf_matrix = vectorizer.fit_transform(country_word_list)

    # print(tfidf_matrix.toarray())
    # print()
    # print(tfidf_matrix.shape)

    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    print(cosine_sim)

    df = pd.DataFrame(cosine_sim)

    df.to_csv('sample.csv', index=False)



