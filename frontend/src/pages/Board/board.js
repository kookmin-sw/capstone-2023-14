import React from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import { Block, DetailInfo, Wrap, WriterInfo } from './styles';
import { Small, SubTitle } from '../../components/Fonts/fonts';
import { useNavigate } from 'react-router-dom';

function Board() {
  const navigator = useNavigate();

  // test-data
  const testData = [
    {
      username: '남상림',
      age: '24',
      gender: '여성',
      mbti: 'ENTJ',
      content:
        '23년도 7-8월 도쿄로 여름 휴가 가실 분 구합니다. 총 4명이 함께하며 2명이 구해져있습니다 ! 저희는...',
      contentId: 1,
    },
    {
      username: '윤서영',
      age: '26',
      gender: '여성',
      mbti: 'ISTP',
      content:
        '(급해요) LA 가실 분 구합니다. 비행기 표는 다 예매했습니다. 여행 기간은 ...',
      contentId: 2,
    },
    {
      username: '김지홍',
      age: '25',
      gender: '여성',
      mbti: 'ISFJ',
      content:
        '동유럽 여행자 구합니다 ! 대학생 환영합니다. 단체로 이동할거라...',
      contentId: 3,
    },
  ];

  return (
    <div>
      <Header title={'board'} />
      <Wrap>
        <div>필터 및 검색</div>
        {testData.map((user, key) => (
          <Block
            onClick={() => navigator(`/board/${user.contentId}`)}
            key={key}
          >
            <WriterInfo>
              <img src={''} />
              <div>
                <SubTitle margin={'0 0 2px'}>{user.username}</SubTitle>
                <DetailInfo>
                  <Small color={'#7c7c7c'}>{user.age}세</Small>
                  <Small color={'#7c7c7c'}>{user.gender}</Small>
                  <Small color={'#EF4E3E'}>{user.mbti}</Small>
                </DetailInfo>
              </div>
            </WriterInfo>
            <div>{user.content}</div>
          </Block>
        ))}
      </Wrap>
      <Footer onClick={() => navigator('./upload')} />
    </div>
  );
}

export default Board;
