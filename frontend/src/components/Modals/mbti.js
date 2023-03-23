import React from 'react';
import { TypeWrap, Wrap } from './styles';
import { SubTitle, Title } from '../Fonts/fonts';

function Mbti(props) {
  const CheckUserMBTI = (e) => {
    props.setUserInfo({ ...props.userInfo, mbti: e.target.id });
    props.setMbtiModal(false);
  };

  return (
    <Wrap>
      <div>
        <Title margin={'0 0 24px'}>본인의 MBTI를 선택하세요 !</Title>
        <div>
          <SubTitle margin={'0 0 12px'}>분석가형</SubTitle>
          <TypeWrap onClick={CheckUserMBTI}>
            <div id={'INTJ'}>INTJ</div>
            <div id={'INTP'}>INTP</div>
            <div id={'ENTJ'}>ENTJ</div>
            <div id={'ENTP'}>ENTP</div>
          </TypeWrap>
          <SubTitle margin={'0 0 12px'}>외교관형</SubTitle>
          <TypeWrap onClick={CheckUserMBTI}>
            <div id={'INFJ'}>INFJ</div>
            <div id={'INFP'}>INFP</div>
            <div id={'ENFJ'}>ENFJ</div>
            <div id={'ENFP'}>ENFP</div>
          </TypeWrap>
          <SubTitle margin={'0 0 12px'}>관리자형</SubTitle>
          <TypeWrap onClick={CheckUserMBTI}>
            <div id={'ISTJ'}>ISTJ</div>
            <div id={'ISFJ'}>ISFJ</div>
            <div id={'ESTJ'}>ESTJ</div>
            <div id={'ESFJ'}>ESFJ</div>
          </TypeWrap>
          <SubTitle margin={'0 0 12px'}>탐험가형</SubTitle>
          <TypeWrap onClick={CheckUserMBTI}>
            <div id={'ISTP'}>ISTP</div>
            <div id={'ISFP'}>ISFP</div>
            <div id={'ESTP'}>ESTP</div>
            <div id={'ESFP'}>ESFP</div>
          </TypeWrap>
        </div>
      </div>
    </Wrap>
  );
}
export default Mbti;
