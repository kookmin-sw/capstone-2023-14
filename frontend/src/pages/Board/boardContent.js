import React from 'react';
import Header from '../../components/Header/header';
import { DetailInfo, Wrap, WriterInfo } from './styles';
import { Small, SubTitle } from '../../components/Fonts/fonts';

function BoardContent() {
  return (
    <div>
      <Header title={'board-content'} />
      <Wrap>
        <WriterInfo>
          <img src={''} />
          <div>
            <SubTitle margin={'0 0 2px'}>username</SubTitle>
            <DetailInfo>
              <Small color={'#7c7c7c'}>age세</Small>
              <Small color={'#7c7c7c'}>gender</Small>
              <Small color={'#EF4E3E'}>mbti</Small>
            </DetailInfo>
          </div>
        </WriterInfo>
        <div>content</div>
      </Wrap>
    </div>
  );
}

export default BoardContent;
