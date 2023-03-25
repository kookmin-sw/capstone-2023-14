import React from 'react';
import Header from '../../components/Header/header';
import { Title } from '../../components/Fonts/fonts';
import RecordList from '../../components/Records/recordList';
import Footer from '../../components/Footer/footer';
import { Wrap } from './styles';

function Join() {
  return (
    <div>
      <Header title={'record'} />
      <Wrap>
        <Title margin={'20px 0'}>내가 기록한 여행지</Title>
        <div>
          <RecordList />
          <RecordList />
          <RecordList />
          <RecordList />
          <RecordList />
          <RecordList />
          <RecordList />
        </div>
      </Wrap>
      <Footer />
    </div>
  );
}
export default Join;
