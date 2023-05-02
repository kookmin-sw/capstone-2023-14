import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FullButton from '../Buttons/fullButton';
import StrokeButton from '../Buttons/strokeButton';

import { SmallTitle, Title } from '../Fonts/fonts';
import { ButtonWrap, Row } from './styles';
import axios from 'axios';

const Taste = (props) => {
  const navigator = useNavigate();

  // api 호출할 데이터. 각 값은 string 형태여야함
  const [userTaste, setUserTaste] = useState({
    email: 'oo',
    style: ['계획', '대중교통', '택시'].join(),
    object: ['액티비티', '촬영', '타로'].join(),
    preferAge: ['30대', '40대'].join(),
    preferGender: '혼성',
  });

  const handleOnTasteSave = async () => {
    try {
      await axios.post('http://localhost:5001/api/hashtag-taste', userTaste);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>
        <Row title>
          <Title size={'20px'}>남상림</Title>
          <Title color={'#7c7c7c'}>님의 여행스타일을 알려주세요 !</Title>
        </Row>
        <div>
          <SmallTitle margin={'0 0 12px'}>스타일</SmallTitle>
          <Row>
            <span>계획적</span>
            <span>즉흥적</span>
            <span>뚜벅이</span>
            <span>대중교통</span>
          </Row>
        </div>
        <div>
          <SmallTitle margin={'0 0 12px'}>목적</SmallTitle>
          <Row>
            <span>휴양</span>
            <span>관광</span>
            <span>쇼핑</span>
            <span>액티비티</span>
            <span>음식&카페</span>
            <span>문화</span>
            <span>촬영</span>
          </Row>
        </div>
      </div>
      <div>
        <Row title>
          <Title size={'20px'}>남상림</Title>
          <Title color={'#7c7c7c'}>님은 이런 동행자를 선호해요 !</Title>
        </Row>
        <div>
          <SmallTitle margin={'0 0 12px'}>연령대</SmallTitle>
          <Row>
            <span>10대</span>
            <span>20대</span>
            <span>30대</span>
            <span>40대</span>
            <span>50대</span>
            <span>상관없음</span>
          </Row>
        </div>
        <div>
          <SmallTitle margin={'0 0 12px'}>성별</SmallTitle>
          <Row>
            <span>동성</span>
            <span>혼성</span>
          </Row>
        </div>
      </div>
      <ButtonWrap setting={props.setting}>
        <FullButton btnName={'저장'} onClick={handleOnTasteSave} />
        <StrokeButton
          btnName={'취소'}
          onClick={() => (props.setting ? navigator(-1) : null)}
        />
      </ButtonWrap>
    </div>
  );
};

export default Taste;
