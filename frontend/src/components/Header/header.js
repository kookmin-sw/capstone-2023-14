import React from 'react';
import { Wrap } from './styles';
import { useNavigate } from 'react-router-dom';
import { Title } from '../Fonts/fonts';

const Header = (props) => {
  const navigator = useNavigate();
  return (
    <Wrap>
      <img
        src={process.env.PUBLIC_URL + '/images/Common/backIcon.svg'}
        alt=""
        onClick={() => navigator(-1)}
      />
      <Title>{props.title}</Title>
      {props.title === 'record' ? (
        <img
          src={process.env.PUBLIC_URL + '/images/Common/hamburger.svg'}
          onClick={props.onClick}
        />
      ) : props.title === 'mypage' ? (
        <img
          src={process.env.PUBLIC_URL + '/images/Common/settingIcon.svg'}
          onClick={() => navigator('/setting')}
        />
      ) : props.title === 'board-upload' ? (
        <button onClick={props.onClick}>작성</button>
      ) : props.title === 'taste' ? (
        <button onClick={props.onClick}>직접추가</button>
      ) : null}
    </Wrap>
  );
};

export default Header;
