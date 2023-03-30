import React, { useState } from 'react';
import Header from '../../components/Header/header';
import { Title } from '../../components/Fonts/fonts';
import RecordList from '../../components/Records/recordList';
import Footer from '../../components/Footer/footer';
import { FloadingButton, Wrap } from './styles';
import RecordUpload from '../../components/Modals/recordUpload';
import RecordDetail from '../../components/Modals/recordDetail';

function Join() {
  const [upload, setUpload] = useState(false);
  const [detail, setDetail] = useState(false);

  return (
    <div>
      <Header title={'record'} />
      <Wrap>
        <Title margin={'20px 0'}>내가 기록한 여행지</Title>
        <div>
          <RecordList onClick={() => setDetail(true)} />
          <RecordList onClick={() => setDetail(true)} />
          <RecordList onClick={() => setDetail(true)} />
          <RecordList onClick={() => setDetail(true)} />
          <RecordList onClick={() => setDetail(true)} />
          <RecordList onClick={() => setDetail(true)} />
          <RecordList onClick={() => setDetail(true)} />
        </div>
        <FloadingButton onClick={() => setUpload(true)}>+</FloadingButton>
      </Wrap>
      {detail ? <RecordDetail setDetail={setDetail} detail={detail} /> : null}
      {upload ? <RecordUpload setUpload={setUpload} /> : null}
      <Footer />
    </div>
  );
}
export default Join;
