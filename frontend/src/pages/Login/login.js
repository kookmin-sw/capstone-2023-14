import React, { useState } from 'react';
import StrokeButton from '../../components/Buttons/strokeButton';
import FullButton from '../../components/Buttons/fullButton';
import InputBox from '../../components/Inputs/inputBox';
import Footer from '../../components/Footer/footer';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/header';
import { BlockWrap, ButtonWrap, Wrap, Row } from './styles';
import { Normal } from '../../components/Fonts/fonts';

function Login() {
  const navigator = useNavigate();
  const [autoLogin, setAutoLogin] = useState(false);

  return (
    <Wrap>
      <div>
        <img src={''} />
      </div>
      <div>
        <BlockWrap>
          <InputBox title={'이메일'} />
          <InputBox title={'비밀번호'} />
        </BlockWrap>
        <Row justify={'space-between'} margin={'18px 0 40px'}>
          <Row gap={'8px'}>
            <Normal cursor={'pointer'}>아이디 찾기</Normal>
            <span>|</span>
            <Normal cursor={'pointer'}>비밀번호 찾기</Normal>
          </Row>
          <Row gap={'8px'} onClick={() => setAutoLogin(!autoLogin)}>
            {autoLogin ? (
              <img
                src={process.env.PUBLIC_URL + '/images/Common/checked.svg'}
              />
            ) : (
              <img
                src={process.env.PUBLIC_URL + '/images/Common/noChecked.svg'}
              />
            )}
            <Normal>자동로그인</Normal>
          </Row>
        </Row>
        <ButtonWrap>
          <FullButton btnName="로그인" onClick={() => navigator('/home')} />
          <StrokeButton btnName="회원가입" onClick={() => navigator('/join')} />
        </ButtonWrap>
      </div>
    </Wrap>
  );
}
export default Login;
