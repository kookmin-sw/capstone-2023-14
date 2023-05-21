import React, { useRef, useEffect } from 'react';
import { ImgWrap, InputWrap, Textarea, Wrap } from './styles';
import { Small, SubTitle, Title } from '../Fonts/fonts';
import InputBox from '../Inputs/inputBox';

const RecordDetail = (props) => {
  // dimmed 영역 처리
  const dimmed = useRef();
  const userRecord = props.record;

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

  const renderRatingStars = () => {
    const stars = [];
    for (let i = 1; i <= userRecord.rating; i++) {
      stars.push(
        <img
          key={i}
          src={process.env.PUBLIC_URL + '/images/Rating/fillstar.svg'}
          alt=""
        />,
      );
    }
    if (!Number.isInteger(userRecord.rating)) {
      stars.push(
        <img
          key={'0.5'}
          src={process.env.PUBLIC_URL + '/images/Rating/halfstar.svg'}
          alt=""
        />,
      );
    }
    for (let i = 1; i <= 5 - userRecord.rating; i++) {
      stars.push(
        <img
          src={process.env.PUBLIC_URL + '/images/Rating/emptystar.svg'}
          key={5 + i}
          alt=""
        />,
      );
    }
    return stars;
  };
  return (
    <Wrap>
      <div ref={dimmed}>
        <ImgWrap>
          <label>
            <img src={`data:image/jpeg;base64,${userRecord.imgUrl}`} alt="" />
          </label>
        </ImgWrap>
        <InputWrap small>
          <div>
            <SubTitle margin={'0 0 10px'}>여행지 평점</SubTitle>
            <div>{renderRatingStars()}</div>
          </div>
          <InputBox
            title={'여행지'}
            value={userRecord.city_name}
            small
            disabled
          />
          <InputBox
            title={'여행기간'}
            value={`${userRecord.duration_start.split('T')[0]} ~ ${
              userRecord.duration_end.split('T')[0]
            }`}
            small
            disabled
          />
          <InputBox
            title={'총 여행경비'}
            value={userRecord.cost}
            small
            disabled
          />
          <div>
            <SubTitle margin={'0 0 10px'}>나의 기록</SubTitle>
            <Textarea value={userRecord.record} disabled />
          </div>
          <button onClick={() => props.setDetail(false)}>닫기</button>
        </InputWrap>
      </div>
    </Wrap>
  );
};
export default RecordDetail;
