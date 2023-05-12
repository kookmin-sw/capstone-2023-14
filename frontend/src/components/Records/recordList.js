import React from 'react';

import { RecordWrap } from './styles';
import { Small, SubTitle } from '../Fonts/fonts';

const RecordList = ({
  cityName,
  startDate,
  endDate,
  rating,
  imgUrl,
  onClick,
  deleteContent,
}) => {
  const renderRatingStars = () => {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(
        <img
          key={i}
          src={process.env.PUBLIC_URL + '/images/Rating/fillstar.svg'}
          alt=""
        />,
      );
    }
    if (!Number.isInteger(rating)) {
      stars.push(
        <img
          key={'0.5'}
          src={process.env.PUBLIC_URL + '/images/Rating/halfstar.svg'}
          alt=""
        />,
      );
    }
    for (let i = 1; i <= 5 - rating; i++) {
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
    <RecordWrap onClick={onClick}>
      <img src={`data:image/jpeg;base64,${imgUrl}`} alt="여행지이미지" />
      <div>
        <div>
          <SubTitle>{cityName}</SubTitle>
          <Small color={'7c7c7c'} margin={'0 0 8px'}>
            {startDate} ~ {endDate}
          </Small>
        </div>
        <div>
          <div>{renderRatingStars()}</div>
        </div>
      </div>
      <div>
        {deleteContent ? (
          <>
            <svg
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 4.98C15.67 4.65 12.32 4.48 8.98 4.48C7 4.48 5.02 4.58 3.04 4.78L1 4.98"
                stroke="#D9D9D9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.5 3.97L6.72 2.66C6.88 1.71 7 1 8.69 1H11.31C13 1 13.13 1.75 13.28 2.67L13.5 3.97"
                stroke="#D9D9D9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.85 8.14L16.2 18.21C16.09 19.78 16 21 13.21 21H6.79C4 21 3.91 19.78 3.8 18.21L3.15 8.14"
                stroke="#D9D9D9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.33 15.5H11.66"
                stroke="#D9D9D9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 11.5H12.5"
                stroke="#D9D9D9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        ) : null}{' '}
      </div>
    </RecordWrap>
  );
};
export default RecordList;
