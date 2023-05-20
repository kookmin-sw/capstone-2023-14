import React, { useState } from 'react';

import { Normal } from '../Fonts/fonts';
import { Flex, MySwitch } from './styles';

const Item = (props) => {
  //switch state
  const [mySwitch, setMySwitch] = useState(false);
  const switchClicked = () => {
    setMySwitch(!mySwitch);
  };

  return (
    <Flex padding onClick={props.onClick}>
      <Flex gap>
        <img src={props.img} />
        <Normal>{props.text}</Normal>
      </Flex>
      {props.icon === 'icon' ? (
        <img src={process.env.PUBLIC_URL + '/images/Common/nextIcon.svg'} />
      ) : props.icon === 'switch' ? (
        <MySwitch onClick={switchClicked} mySwitch={mySwitch}>
          <div></div>
        </MySwitch>
      ) : props.text === '버전 정보' ? (
        <span>1.0.0</span>
      ) : null}
    </Flex>
  );
};

export default Item;
