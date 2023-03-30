import React, { useRef, useEffect } from 'react';
import { ImgWrap, InputWrap, Textarea, Wrap } from './styles';
import { Small, SubTitle, Title } from '../Fonts/fonts';
import InputBox from '../Inputs/inputBox';

const RecordDetail = (props) => {
  // dimmed 영역 처리
  const dimmed = useRef();
  const handleModalOutsideClick = (event) => {
    if (props.detail && !dimmed.current.contains(event.target)) {
      props.setDetail(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleModalOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleModalOutsideClick);
    };
  });
  return (
    <Wrap>
      <div ref={dimmed}>
        <ImgWrap>
          <label>
            <img src={''} />
          </label>
        </ImgWrap>
        <InputWrap small>
          <div>
            <Title>대한민국 서울</Title>
            <Small color={'7c7c7c'} margin={'0 0 8px'}>
              2023.01.01-2023.03.24
            </Small>
            <div>
              <img
                src={process.env.PUBLIC_URL + '/images/Rating/fillstar.svg'}
              />
              <img
                src={process.env.PUBLIC_URL + '/images/Rating/fillstar.svg'}
              />
              <img
                src={process.env.PUBLIC_URL + '/images/Rating/fillstar.svg'}
              />
              <img
                src={process.env.PUBLIC_URL + '/images/Rating/fillstar.svg'}
              />
              <img
                src={process.env.PUBLIC_URL + '/images/Rating/fillstar.svg'}
              />
            </div>
          </div>
          <InputBox title={'여행지'} small disabled />
          <InputBox title={'여행기간'} small disabled />
          <InputBox title={'총 여행경비'} small disabled />
          <div>
            <SubTitle margin={'0 0 10px'}>나의 기록</SubTitle>
            <Textarea disabled />
          </div>
        </InputWrap>
      </div>
    </Wrap>
  );
};
export default RecordDetail;
