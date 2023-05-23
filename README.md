

# 함께할래 ?
<img style="width: 120px; margin:auto; display:block" src="https://github.com/kookmin-sw/capstone-2023-14/assets/54922803/ddee6de4-efb1-4672-9b64-e8996857ce8b" alt="함께할래 로고">

- Capstone Design Project for Kookmin University, 2023
- [Check out the github-pages here](https://kookmin-sw.github.io/capstone-2023-14/)

### 1. 프로젝트 소개

팬데믹 당시 억눌려있었던 여행에 대한 갈망이 엔데믹 이후 증가하면서 많은 분들이 다시 여행을 가기 시작했습니다. 그러나 정작 본인이 가고픈 다음 여행지를 모를 때도 있을뿐더러, 나와 여행 기간, 예상 경비 등 조건이 맞는 지인을 찾기 힘들 때가 있습니다.

현재 동행인을 찾는 방법으로는 여행 관련 카페를 통한 경우가 많은데 본인이 직접 모집 글을 작성하거나, 나와 맞을 것 같은 상대방을 직접 찾아야 하는 번거로움이 있습니다. 
따라서 유사도 추천 시스템을 통해 나와 잘 맞을 것 같은 동행인을 추천해줌으로써 번거로움을 해결하고자 합니다.

'함께할래?' 는 이전에 가봤던 여행지 선호도와 본인의 취향에 기반하여 비슷한 여행지를 추천하고, 자신의 여행 성향과 유사한 동행인을 쉽고 간편하게 추천해주는 서비스입니다.

 <br/>

### Abstract

Many people started to travel again as their expectation for travel which was suppressed during pandemic increased with the pandemic coming to an end.
However, they are unsure about their destination and itinerary. It is very hard to find someone who meets travel conditions such as travel period and travel expenses.

Currently, there are many ways to find companion(ex. through a travel related cafe ) but but there is a hassle of having to write a recruitment writing or find a person who seems to fit me.
Therefore, We would like to solve the inconvenience by recommending a companion who seems to fit user well through the similarity recommendation system.

‘Do you want to join me?’ is a service that recommends similar destinations based on your preference for travel destinations and your taste, and conveniently recommends companions similar to your travel tendency.

---

### 2. 주요 기능

- 여행 리뷰 데이터를 전처리 작업을 통해 키워드를 추출 → 유저가 매긴 여행지 선호도 점수를 기반으로 다음 여행지 추천 모델을 구축
- 유저에게 입력받은 여행 성향 데이터를 기반하여 유사한 성격을 가진 다른 사용자를 추천하는 동행인 추천 모델을 구현
- 구현한 모델을 바탕으로 유저에게 추천 여행지 및 동행자를 메인페이지에서 노출시켜 확인
- 게시글을 통해 직접 동행자를 모집 할 수 있으며 댓글을 활용하여 소통 가능

---

### 3. 시스템 구성도

![SW아키텍쳐](https://github.com/kookmin-sw/capstone-2023-14/assets/55116940/a8425ff4-7d88-4c1a-9a5c-40cd26f5fddd)

---

### 4. 소개 영상

[![Video Label](http://img.youtube.com/vi/FoNKwS__j4M/0.jpg)](https://youtu.be/FoNKwS__j4M)

---

### 5. 팀 소개

| <span style="justify-content:center; align-items: center; display: flex;">윤서영</span>                                                                                                                                                                                     | <span style="justify-content:center; align-items: center; display: flex">김지홍</span>                                                                                                                                                                                      | <span style="justify-content:center; align-items: center; display: flex">남상림</span>                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="200px" src="https://user-images.githubusercontent.com/54922803/227139823-d6c577b9-9206-4a2b-9e0c-427aecb39737.jpeg">                                                                                                                                            | <img width="200px" src="https://github.com/kookmin-sw/capstone-2023-14/assets/54922803/ee000a30-d6d7-47f7-8acc-7aae6d8a37da">                                                                                                                                               | <img width="200px" src="https://user-images.githubusercontent.com/54922803/227139845-b502b414-5a07-4054-adb7-f466bd93594d.jpeg">                                                                                                                                                |
| 👩🏻‍💻 학번: xxxx1633                                                                                                                                                                                                                                                           | 👩🏻‍💻 학번: xxxx1572                                                                                                                                                                                                                                                           | 👩🏻‍💻 학번: xxxx1584                                                                                                                                                                                                                                                               |
| Team Leader, Data Mining, Server                                                                                                                                                                                                                                            | FrontEnd, BackEnd                                                                                                                                                                                                                                                           | FrontEnd, BackEnd, Design                                                                                                                                                                                                                                                       |
| <div style="display:flex; gap: 4px; align-items:center "><img width="20px" style="align: center;" src="https://raw.githubusercontent.com/tandpfun/skill-icons/59059d9d1a2c092696dc66e00931cc1181a4ce1f/icons/Github-Dark.svg"> [young43](https://github.com/young43) </div> | <div style="display:flex; gap: 4px; align-items:center "><img width="20px" style="align: center;" src="https://raw.githubusercontent.com/tandpfun/skill-icons/59059d9d1a2c092696dc66e00931cc1181a4ce1f/icons/Github-Dark.svg"> [Ziihong](https://github.com/Ziihong) </div> | <div style="display:flex; gap: 4px; align-items:center "><img width="20px" style="align: center;" src="https://raw.githubusercontent.com/tandpfun/skill-icons/59059d9d1a2c092696dc66e00931cc1181a4ce1f/icons/Github-Dark.svg"> [sanglim00](https://github.com/sanglim00) </div> |

---

### 6. 사용법

#### 프론트엔드

(1) AWS EC2 서버 인스턴스를 실행 후, SSH 터미널로 접속한다.

(2) nginx 를 설치한다.

```shell
sudo apt-get install nginx
```

(3) /etc/nginx/ 폴더로 들어가서 해당 명령어를 실행하여 파일을 복사하고 링크를 생성한다

```shell
cd /etc/nginx/
sudo cp ~/capstone-2023-14/nginx/site-available/client ./site-available/
sudo ln -s ./site-available/client ./site-enabled/
```

(4) 해당 Git Repository를 Clone 한다.

```shell
git clone https://github.com/kookmin-sw/capstone-2023-14.git
```

(5) Node.js 16버전을 설치한다.

```shell
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

(6) npm 패키지 설치를 진행한다.

```shell
cd ~/capstone-2023-14/frontend
npm install
```

(7) 빌드 진행 후 nginx를 구동시킨다.

```shell
npm run build
sudo systemctl start nginx
```

<br/>

#### 백엔드

(1) forever 패키지를 다운로드한다.

```shell
cd ~/capstone-2023-14/backend/
npm -g install forever
```

(2) forever를 통해 Node.js express 모듈을 실행한다.

```shell
forever start -w app.js
```

<br/>

#### 추천모델 API

(1) DM폴더로 이동후, requirements.txt 를 통해 Python3 package를 설치한다.

```shell
cd ~/capstone-2023-14/DM/
pip3 install -r requirements.txt
```

(2) crawling.py 를 실행하여 네이버 블로그 글을 크롤링 해온다.

```shell
python3 crawling.py
```

(3) csv_to_db.py 를 실행하여 크롤링 한 데이터를 벡터화 시킨다.

```
python3 csv_to_db.py
```

(4) nohup 명령어를 사용하여 flask 서버를 백그라운드로 동작시킨다.

```shell
nohup app.py &
```

### 7. 팀 포스터

<img src="https://github.com/kookmin-sw/capstone-2023-14/assets/54923245/367b22ea-86dc-4531-a515-e6c2104d5f5d" alt='team14' width="600px" />

