import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FullButton from '../Buttons/fullButton';
import StrokeButton from '../Buttons/strokeButton';

import { SmallTitle, Title } from '../Fonts/fonts';
import { ButtonWrap, Options, Row } from './styles';
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

  const styleTaste = [
    {
      name: 'style',
      value: '계획적',
    },
    {
      name: 'style',
      value: '즉흥적',
    },
    {
      name: 'style',
      value: '뚜벅이',
    },
    {
      name: 'style',
      value: '대중교통',
    },
  ];
  const objectTaste = [
    {
      name: 'object',
      value: '휴양',
    },
    {
      name: 'object',
      value: '관광',
    },
    {
      name: 'object',
      value: '쇼핑',
    },
    {
      name: 'object',
      value: '액티비티',
    },
    {
      name: 'object',
      value: '음식&카페',
    },
    {
      name: 'object',
      value: '문화',
    },
    {
      name: 'object',
      value: '촬영',
    },
  ];

  const handleOnTasteSave = async () => {
    try {
      await axios.post('http://localhost:5001/api/hashtag-taste', userTaste);
    } catch (e) {
      console.log(e);
    }
  };

  const SaveMyTaste = (e) => {
    const checked = e.target.checked;
    const parent = e.target.parentNode;
    const name = e.target.name;
    const value = e.target.parentNode.children[1].innerHTML;

    if (checked) {
      parent.style.border = '1.5px solid #EF4E3E';
    } else {
      parent.style.border = '1.5px solid #7c7c7c';
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
            {styleTaste.map((i) => (
              <Options>
                <input
                  type={'checkbox'}
                  name={i.name}
                  onClick={(e) => SaveMyTaste(e)}
                />
                <span>{i.value}</span>
              </Options>
            ))}
          </Row>
        </div>
        <div>
          <SmallTitle margin={'0 0 12px'}>목적</SmallTitle>
          <Row>
            {objectTaste.map((i) => (
              <Options>
                <input
                  type={'checkbox'}
                  name={i.name}
                  onClick={(e) => SaveMyTaste(e)}
                />
                <span>{i.value}</span>
              </Options>
            ))}
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
            <Options>
              <input
                type={'checkbox'}
                name={'age'}
                onClick={(e) => SaveMyTaste(e)}
              />
              <span>10대</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'age'}
                onClick={(e) => SaveMyTaste(e)}
              />
              <span>20대</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'age'}
                onClick={(e) => SaveMyTaste(e)}
              />
              <span>30대</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'age'}
                onClick={(e) => SaveMyTaste(e)}
              />
              <span>40대</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'age'}
                onClick={(e) => SaveMyTaste(e)}
              />
              <span>50대</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'age'}
                onClick={(e) => SaveMyTaste(e)}
              />
              <span>상관없음</span>
            </Options>
          </Row>
        </div>
        <div>
          <SmallTitle margin={'0 0 12px'}>성별</SmallTitle>
          <Row>
            <Options>
              <input
                type={'checkbox'}
                name={'gender'}
                onClick={(e) => SaveMyTaste(e)}
              />
              <span>동성</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'gender'}
                onClick={(e) => SaveMyTaste(e)}
              />
              <span>혼성</span>
            </Options>
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
