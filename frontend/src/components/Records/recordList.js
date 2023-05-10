import React, { useEffect } from 'react';

import { RecordWrap } from './styles';
import { Small, SubTitle } from '../Fonts/fonts';

const RecordList = ({ countryId, startDate, endDate, rating, onClick }) => {
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
    return stars;
  };

  return (
    <RecordWrap onClick={onClick}>
      <img src={''} alt="여행지이미지" />
      <div>
        <div>
          <SubTitle>{countryId}</SubTitle>
          <Small color={'7c7c7c'} margin={'0 0 8px'}>
            {startDate}-{endDate}
          </Small>
        </div>
        <div>
          <div>{renderRatingStars()}</div>
        </div>
      </div>
    </RecordWrap>
  );
};
export default RecordList;
