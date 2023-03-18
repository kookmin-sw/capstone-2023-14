import React from 'react';
import StrokeButton from '../../components/Buttons/strokeButton';
import FullButton from '../../components/Buttons/fullButton';
import InputBox from '../../components/Inputs/inputBox';
import Footer from '../../components/Footer/footer';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/header';

function Login() {
  const navigator = useNavigate();

  return (
    <div>
      <FullButton btnName="로그인" />
      <StrokeButton btnName="회원가입" onClick={() => navigator('/join')} />
    </div>
  );
}
export default Login;
