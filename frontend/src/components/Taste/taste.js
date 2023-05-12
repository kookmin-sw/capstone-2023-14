import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FullButton from '../Buttons/fullButton';
import StrokeButton from '../Buttons/strokeButton';

import { SmallTitle, Title } from '../Fonts/fonts';
import { ButtonWrap, Options, Row } from './styles';
import axios from 'axios';

const Taste = (props) => {
  const navigator = useNavigate();

  const [userTaste, setUserTaste] = useState({
    email: 'test',
    style: [],
    object: [],
    preferAge: [],
    preferGender: '',
  });

  const handleOnTasteSave = async () => {
    const saveInfo = {
      email: 'test',
      style: userTaste.style.join(),
      object: userTaste.object.join(),
      preferAge: userTaste.preferAge.join(),
      preferGender: userTaste.preferGender,
    };

    try {
      await axios.post('http://localhost:5001/api/hashtag-taste', saveInfo);
    } catch (e) {
      console.log(e);
    }
  };

  const checkMyTaste = (e) => {
    const { name, value } = e.target;
    const checked = e.target.checked;
    const parent = e.target.parentNode;

    if (checked) {
      parent.style.border = '1.5px solid #EF4E3E';
    } else {
      parent.style.border = '1.5px solid #7c7c7c';
    }

    setUserTaste((prevState) => {
      if (Array.isArray(prevState[name])) {
        if (checked) {
          return {
            ...prevState,
            [name]: [...prevState[name], value],
          };
        } else {
          return {
            ...prevState,
            [name]: prevState[name].filter((item) => item !== value),
          };
        }
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  return (
    <div>
      <div>
        <Row title="true">
          <Title size={'20px'}>남상림</Title>
          <Title color={'#7c7c7c'}>님의 여행스타일을 알려주세요 !</Title>
        </Row>
        <div>
          <SmallTitle margin={'0 0 12px'}>스타일</SmallTitle>
          <Row>
            <Options>
              <input
                type={'checkbox'}
                name={'style'}
                value={'계획적'}
                onClick={(e) => checkMyTaste(e)}
              />
              <span>계획적</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'style'}
                value={'즉흥적'}
                onClick={(e) => checkMyTaste(e)}
              />
              <span>즉흥적</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'style'}
                value={'뚜벅이'}
                onClick={(e) => checkMyTaste(e)}
              />
              <span>뚜벅이</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'style'}
                value={'대중교통'}
                onClick={(e) => checkMyTaste(e)}
              />
              <span>대중교통</span>
            </Options>
          </Row>
        </div>
        <div>
          <SmallTitle margin={'0 0 12px'}>목적</SmallTitle>
          <Row>
            <Options>
              <input
                type={'checkbox'}
                name={'object'}
                value={'휴양'}
                onClick={(e) => checkMyTaste(e)}
              />
              <span>휴양</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'object'}
                value={'관광'}
                onClick={(e) => checkMyTaste(e)}
              />
              <span>관광</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'object'}
                value={'쇼핑'}
                onClick={(e) => checkMyTaste(e)}
              />
              <span>쇼핑</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'object'}
                value={'액티비티'}
                onClick={(e) => checkMyTaste(e)}
              />
              <span>액티비티</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'object'}
                value={'음식&카페'}
                onClick={(e) => checkMyTaste(e)}
              />
              <span>음식&카페</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'object'}
                value={'문화'}
                onClick={(e) => checkMyTaste(e)}
              />
              <span>문화</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'object'}
                value={'촬영'}
                onClick={(e) => checkMyTaste(e)}
              />
              <span>촬영</span>
            </Options>
          </Row>
        </div>
      </div>
      <div>
        <Row title="true">
          <Title size={'20px'}>남상림</Title>
          <Title color={'#7c7c7c'}>님은 이런 동행자를 선호해요 !</Title>
        </Row>
        <div>
          <SmallTitle margin={'0 0 12px'}>연령대</SmallTitle>
          <Row>
            <Options>
              <input
                type={'checkbox'}
                name={'preferAge'}
                value={'10대'}
                onClick={(e) => checkMyTaste(e)}
              />
              <span>10대</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'preferAge'}
                value={'20대'}
                onClick={(e) => checkMyTaste(e)}
              />
              <span>20대</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'preferAge'}
                value={'30대'}
                onClick={(e) => checkMyTaste(e)}
              />
              <span>30대</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'preferAge'}
                value={'40대'}
                onClick={(e) => checkMyTaste(e)}
              />
              <span>40대</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'preferAge'}
                value={'50대'}
                onClick={(e) => checkMyTaste(e)}
              />
              <span>50대</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'preferAge'}
                value={'상관없음'}
                onClick={(e) => checkMyTaste(e)}
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
                name={'preferGender'}
                value={'동성'}
                onClick={(e) => checkMyTaste(e)}
              />
              <span>동성</span>
            </Options>
            <Options>
              <input
                type={'checkbox'}
                name={'preferGender'}
                value={'혼성'}
                onClick={(e) => checkMyTaste(e)}
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
