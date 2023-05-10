import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/header';
import { Title } from '../../components/Fonts/fonts';
import Record from '../../components/Records/recordList';
import Footer from '../../components/Footer/footer';
import { FloatingButton, Wrap } from './styles';
import RecordUpload from '../../components/Modals/recordUpload';
import RecordDetail from '../../components/Modals/recordDetail';
import axios from 'axios';

function Join() {
  const [upload, setUpload] = useState(false);
  const [detail, setDetail] = useState(false);
  const [userEmail, setUserEmail] = useState('test');
  const [recordList, setRecordList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        'http://localhost:5001/api/get-recordList',
        {
          email: userEmail,
        },
      );
      setRecordList(response.data);
    };

    fetchData();
  }, []);

  return (
    <Wrap>
      <Header title={'record'} />
      <div>
        <Title margin={'20px 0'}>내가 기록한 여행지</Title>
        <div>
          {recordList.map((record) => (
            <Record
              key={record.country_id}
              cityName={record.city_name}
              startDate={record.duration_start.split('T')[0]}
              endDate={record.duration_end.split('T')[0]}
              rating={record.rating}
              imgUrl={record.picture}
              onClick={() => setDetail(true)}
            />
          ))}
        </div>
      </div>
      <FloatingButton onClick={() => setUpload(true)}>+</FloatingButton>
      {detail ? <RecordDetail setDetail={setDetail} detail={detail} /> : null}
      {upload ? <RecordUpload setUpload={setUpload} /> : null}
      <Footer />
    </Wrap>
  );
}
export default Join;
