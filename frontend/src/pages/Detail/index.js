import React from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import { useParams } from 'react-router-dom';
import ImgSlider from '../../components/Slider';
import { Wrap, Title, List, Item } from './styles';

function Detail() {
  const params = useParams();
  const destination = params.id; // ex) "도쿄 / 이집트 / 영국"

  // test data
  const Info = {
    thumbnailList: [
      'https://search.pstatic.net/common?src=http%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-o%2F1b%2Fde%2F4e%2F5f%2Fphoto3jpg.jpg&type=w800_travelsearch',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAxMjZfMjcg%2FMDAxNjc0NzI3OTgxMzc2.cOSJIS85UD67Hqf56HgnS7YujYXIFSxOeNlUIHeGpyUg.fbJB2wA0RgHV_ZlawXrSZjLKEejo7ffVG5xZVUL61bkg.JPEG.dhyoon0308%2FIMG_2664.JPG&type=sc960_832',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMjVfMjc1%2FMDAxNjc3Mjk4ODA0MjMy.arcEsUyclA9O9WP-XZQGPWNiz2XpPK6dylh3HmYCSeMg.MJ7dQKQzvneeQlCqqH1OZyGucD2oIW5OHe0rhZxl0g0g.JPEG.intel007%2FIMG_5581.JPG&type=sc960_832',
    ],
    introduction:
      '유럽 대륙 서북쪽에 자리한 섬나라로 우아한 왕실 문화와 신사적 이미지가 연상되는 나라',
    weather: '최저 3.8°, 최고 10.3°',
    exchangeRate: ' 1GBP1 ↔ 591.89원',
    timeTaken: '직항 11시간',
    visa: '무비자',
    companionList: [
      { name: '윤서영', mbti: 'ISTP' },
      { name: '김지홍', mbti: 'ISFJ' },
      { name: '남상림', mbti: 'ENTJ' },
      { name: '윤서', mbti: 'IST' },
      { name: '김지', mbti: 'ISF' },
      { name: '남상', mbti: 'ENT' },
    ],
  };

  return (
    <Wrap>
      {' '}
      <Header />
      <ImgSlider
        Img1={Info.thumbnailList[0]}
        Img2={Info.thumbnailList[1]}
        Img3={Info.thumbnailList[2]}
      />
      <div className="Info" style={{ paddingBottom: '15px' }}>
        <Title>{destination}</Title>
        <p style={{ marginTop: '0' }}>{Info.introduction}</p>
        <div>날씨: {Info.weather}</div>
        <div>환율: {Info.exchangeRate}</div>
        <div>소요시간: {Info.timeTaken}</div>
        <div>비자유무: {Info.visa}</div>
      </div>
      <hr />
      <Title>동행인 추천</Title>
      <List>
        {/* 동명이인일 경우, 해당 key 부적절 */}
        {Info.companionList.map((companion) => (
          <div key={companion.name}>
            <Item>
              <div>
                <img
                  src="https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMjU4/MDAxNTIwMDQxODA4Mjc0.gR3L5xx3IbpACbvRRF9j9xjJmO-EPAY35oF1AdBnDcog.WZyeqFi6cMmH-v-R-ec44Ny6ZgVyAJIYMT78p4Rxbkwg.PNG.osy2201/2_%2850%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800" // 사용자 프로필 이미지
                  alt="profile"
                />
              </div>
              {companion.name}
              <span>{companion.mbti}</span>
            </Item>
          </div>
        ))}
      </List>
      <Footer />
    </Wrap>
  );
}

export default Detail;
