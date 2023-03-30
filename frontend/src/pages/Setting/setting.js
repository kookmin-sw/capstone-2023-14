import React from 'react';
import Header from '../../components/Header/header';
import { SubTitle } from '../../components/Fonts/fonts';

function Setting() {
  return (
    <div>
      <Header title={'Setting'} />
      <div>
        <SubTitle>개인정보</SubTitle>
        <SubTitle>앱</SubTitle>
        <SubTitle>정보</SubTitle>
      </div>
    </div>
  );
}
export default Setting;
