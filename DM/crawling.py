#!/usr/bin/env python
# -*- coding: utf-8 -*-
# 네이버 검색 API 예제 - 블로그 검색
import os,sys
import requests
import re
import json
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import pandas as pd

from database import Database

# iframe 제거 후 blog.naver.com 붙이기
def delete_iframe(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"}
    res = requests.get(url, headers=headers)
    res.raise_for_status()  # 문제시 프로그램 종료
    soup = BeautifulSoup(res.text, "lxml")

    src_url = "https://blog.naver.com/" + soup.iframe["src"]

    return src_url

def text_scraping(url):
    headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"}
    res = requests.get(url, headers=headers)
    res.raise_for_status() # 문제시 프로그램 종료
    soup = BeautifulSoup(res.text, "lxml")

    if soup.find("div", attrs={"class":"se-main-container"}):
        text = soup.find("div", attrs={"class":"se-main-container"}).get_text()
        text = text.replace("\n","") #공백 제거
        text = text.replace("Previous imageNext image", "")
        return text
    else:
        return ""





if __name__ == "__main__":
    # load .env
    load_dotenv()
    client_id = os.environ.get('CLIENT_ID')
    client_secret = os.environ.get('CLIENT_SECRET')


    headers = {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret,
    }

    if len(sys.argv) == 1:
        # 도시 파일관련 json 가져오기
        file_path = './country.json'
        with open(file_path, 'r', encoding='UTF-8') as file:
            data = json.load(file)['item']

        country_list = []
        for item in data:
            country_list.extend(item['country'])

        # 진행된 정보 가져오기 (파일명 제일 앞에있는 번호를 기준)
        last_index = 0
        crawl_dir = './blog_data'
        # file_list = os.listdir('./blog_data')
        # if len(file_list) > 0:
        #     last_index = sorted(file_list, key=lambda x: int(x.split('_')[0]), reverse=True)[0].split('_')[0]
        #     last_index = int(last_index)
        #     print(f"{last_index}_{country_list[last_index]} 까지 진행했음")
        #     print('='*50)
        # print(f"Last Index : {last_index}")


        for idx, country in enumerate(country_list):
            # if last_index > 0 and idx <= last_index: continue
            # print(f"=============== {idx}_{country} 진행중 ===============")

            review_list = []
            # 네이버 검색 API는 최대 100개까지 밖에 볼 수 없기때문에 for문을 돌려서 총 1000개의 블로그를 조회
            for i in range(1, 11):
                params = {
                    'start': i,
                    'display': 100,
                    'sort': 'sim',
                    'query': f'{country} 여행'
                }


                url = "https://openapi.naver.com/v1/search/blog"
                res = requests.get(url, headers=headers, params=params)
                res.encoding = 'utf-8'
                resJson = res.json()

                for item in resJson['items']:
                    title = item['title'].replace("<b>", "").replace("</b>", "")
                    post_link = item['link']

                    blog_p = re.compile("blog.naver.com")
                    blog_m = blog_p.search(post_link)

                    if blog_m:
                        # iframe 제거 후 블로그 내용 가져옴
                        blog_text = text_scraping(delete_iframe(post_link))
                        review_list.append(blog_text)

            # Pandas dataframe으로 변환 -> CSV 파일 저장
            df = pd.DataFrame({'country': [country for i in review_list], 'contents' : review_list})
            save_file_path = f'./blog_data/{idx}_{country}_crawling.csv'
            df.to_csv(save_file_path, encoding='UTF-8')

            print(f'Saved {save_file_path}')
            print('='*50)


    # crawling.py 나트랑
    elif len(sys.argv) == 2:
        country = sys.argv[1]
        db = Database()
        res = db.select(f'select id from country where name="{country}"')

        if len(res) > 0:
            country_id = res[0][0]
            print(f"=============== {country_id}_{country} 진행중 =============== ")

            review_list = []
            # 네이버 검색 API는 최대 100개까지 밖에 볼 수 없기때문에 for문을 돌려서 총 1000개의 블로그를 조회
            for i in range(1, 11):
                params = {
                    'start': i,
                    'display': 100,
                    'sort': 'sim',
                    'query': f'{country} 여행'
                }

                url = "https://openapi.naver.com/v1/search/blog"
                res = requests.get(url, headers=headers, params=params)
                res.encoding = 'utf-8'
                resJson = res.json()

                for item in resJson['items']:
                    title = item['title'].replace("<b>", "").replace("</b>", "")
                    post_link = item['link']

                    blog_p = re.compile("blog.naver.com")
                    blog_m = blog_p.search(post_link)

                    if blog_m:
                        # iframe 제거 후 블로그 내용 가져옴
                        blog_text = text_scraping(delete_iframe(post_link))
                        review_list.append(blog_text)

            # Pandas dataframe으로 변환 -> CSV 파일 저장
            df = pd.DataFrame({'country': [country for i in review_list], 'contents': review_list})
            save_file_path = f'./blog_data/{country_id}_{country}_crawling.csv'
            df.to_csv(save_file_path, encoding='UTF-8')

            print(f'Saved {save_file_path}')
            print('=' * 50)