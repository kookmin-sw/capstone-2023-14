import React, { useState } from 'react';
import StrokeButton from '../../components/Buttons/strokeButton';
import FullButton from '../../components/Buttons/fullButton';
import InputBox from '../../components/Inputs/inputBox';
import { useNavigate } from 'react-router-dom';

import { BlockWrap, Wrap, Row } from './styles';
import { Normal } from '../../components/Fonts/fonts';
import axios from 'axios';

import { useRecoilState } from 'recoil';
import { email } from '../../store/userInfo';

function Login() {
  const navigator = useNavigate();
  const [userEmail, setUserEmail] = useRecoilState(email);
  const [autoLogin, setAutoLogin] = useState(false);
  const [inputInfo, setInputInfo] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputInfo({
      ...inputInfo,
      [name]: value,
    });
  };

  const handleClickLogin = async () => {
    await axios
      .post('http://localhost:5001/api/login', inputInfo)
      .then((response) => {
        // 로그인 성공했을 때
        if (response.status === 200 && response.data.success) {
          setUserEmail(inputInfo.email);
          navigator('/home');
        }
      })
      .catch((error) => {
        // 로그인 실패했을 때
        if (error.response.status === 401)
          alert('사용자 이름 또는 패스워드가 올바르지 않습니다.');
      });
  };

  return (
    <Wrap>
      <div>
        <img src={''} alt="" />
      </div>
      <div>
        <BlockWrap>
          <InputBox
            title={'이메일'}
            onChange={handleOnChange}
            name="email"
            value={inputInfo.email}
          />
          <InputBox
            title={'비밀번호'}
            onChange={handleOnChange}
            type="password"
            name="password"
            value={inputInfo.password}
          />
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
                alt=""
              />
            ) : (
              <img
                src={process.env.PUBLIC_URL + '/images/Common/noChecked.svg'}
                alt=""
              />
            )}
            <Normal>자동로그인</Normal>
          </Row>
        </Row>
        <div>
          <FullButton btnName="로그인" onClick={handleClickLogin} />
          <StrokeButton btnName="회원가입" onClick={() => navigator('/join')} />
        </div>
      </div>
    </Wrap>
  );
}
export default Login;
