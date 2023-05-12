import React, { useEffect } from 'react';
import { Wrap, Icon } from './styles';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Home } from './homeIcon.svg';
import { ReactComponent as Record } from './recordIcon.svg';
import { ReactComponent as Board } from './boardIcon.svg';
import { ReactComponent as Info } from './findIcon.svg';
import { ReactComponent as Mypage } from './mypageIcon.svg';

const Footer = () => {
  const navigator = useNavigate();
  const active = window.location.pathname.slice(1);

  return (
    <Wrap>
      <Icon value={'home'} active={active}>
        <Home onClick={() => navigator('/home')} />
      </Icon>
      <Icon value={'record'} active={active}>
        <Record onClick={() => navigator('/record')} />
      </Icon>
      <Icon value={'board'} active={active}>
        <Board onClick={() => navigator('/board')} />
      </Icon>
      <Icon value={'info'} active={active}>
        <Info onClick={() => navigator('/info')} />
      </Icon>
      <Icon value={'mypage'} active={active}>
        <Mypage onClick={() => navigator('/mypage')} />
      </Icon>
    </Wrap>
  );
};
export default Footer;
