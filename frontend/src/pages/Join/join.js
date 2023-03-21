import React from 'react';
import StrokeButton from '../../components/Buttons/strokeButton';
import FullButton from '../../components/Buttons/fullButton';
import Header from '../../components/Header/header';
import { useNavigate } from 'react-router-dom';

function Join() {
  const navigator = useNavigate();
  return (
    <div>
      <Header title="join" />
      <FullButton btnName="회원가입 하기" />
      <StrokeButton btnName="뒤로가기" onClick={() => navigator(-1)} />
    </div>
  );
}
export default Join;
