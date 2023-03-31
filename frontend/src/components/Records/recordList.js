import React from 'react';

import { RecordWrap } from './styles';
import { Small, SubTitle } from '../Fonts/fonts';

const RecordList = (props) => {
  return (
    <RecordWrap onClick={props.onClick}>
      <img src={''} />
      <div>
        <div>
          <SubTitle>서울</SubTitle>
          <Small color={'7c7c7c'} margin={'0 0 8px'}>
            2023.01.01-2023.03.24
          </Small>
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + '/images/Rating/fillstar.svg'} />
          <img src={process.env.PUBLIC_URL + '/images/Rating/fillstar.svg'} />
          <img src={process.env.PUBLIC_URL + '/images/Rating/fillstar.svg'} />
          <img src={process.env.PUBLIC_URL + '/images/Rating/fillstar.svg'} />
          <img src={process.env.PUBLIC_URL + '/images/Rating/fillstar.svg'} />️
        </div>
      </div>
    </RecordWrap>
  );
};
export default RecordList;
