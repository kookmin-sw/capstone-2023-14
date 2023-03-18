import React from 'react';
import { Wrap } from './styles';
import { useNavigate } from 'react-router-dom';
import { Title } from '../Fonts/fonts';

function Header(props) {
  const navigator = useNavigate();
  return (
    <Wrap>
      <img
        src={process.env.PUBLIC_URL + '/images/Common/backIcon.svg'}
        alt=""
        onClick={() => navigator(-1)}
      />
      <Title>{props.title}</Title>
    </Wrap>
  );
}

export default Header;
