import React from 'react';
import { Wrap } from './styles';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigator = useNavigate();
  return (
    <Wrap>
      <img
        src={process.env.PUBLIC_URL + '/images/Footer/homeIcon.svg'}
        onClick={() => navigator('/home')}
      />
      <img
        src={process.env.PUBLIC_URL + '/images/Footer/recordIcon.svg'}
        onClick={() => navigator('/')}
      />
      <img
        src={process.env.PUBLIC_URL + '/images/Footer/boardIcon.svg'}
        onClick={() => navigator('/')}
      />
      <img
        src={process.env.PUBLIC_URL + '/images/Footer/notiIcon.svg'}
        onClick={() => navigator('/')}
      />
      <img
        src={process.env.PUBLIC_URL + '/images/Footer/mypageIcon.svg'}
        onClick={() => navigator('/')}
      />
    </Wrap>
  );
}
export default Footer;
