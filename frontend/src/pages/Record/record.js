import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/header';
import { Title } from '../../components/Fonts/fonts';
import Record from '../../components/Records/recordList';
import Footer from '../../components/Footer/footer';
import { Wrap } from './styles';
import RecordUpload from '../../components/Modals/recordUpload';
import RecordDetail from '../../components/Modals/recordDetail';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { email } from '../../store/userInfo';

function MyRecord() {
  const [upload, setUpload] = useState(false);
  const [detail, setDetail] = useState(false);
  const userEmail = useRecoilValue(email);
  const [recordList, setRecordList] = useState([]);
  const [detailInfo, setDetailInfo] = useState({});
  const [deleteContent, setDeleteContent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:5001/api/get-recordList',
          {
            email: userEmail,
          },
        );
        setRecordList(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [upload]);

  const deleteUserRecord = async (record_id) => {
    try {
      await axios.post('http://localhost:5001/api/del-record', {
        email: userEmail,
        id: record_id,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrap>
      <Header
        title={'record'}
        onClick={() => setDeleteContent(!deleteContent)}
      />
      <div>
        <Title margin={'20px 0'}>내가 기록한 여행지</Title>
        <div>
          {recordList.map((record) => (
            <Record
              deleteContent={deleteContent}
              key={record.country_id}
              cityName={record.city_name}
              startDate={record.duration_start.split('T')[0]}
              endDate={record.duration_end.split('T')[0]}
              rating={record.rating}
              imgUrl={record.imgUrl}
              onClick={() => {
                if (deleteContent) {
                  deleteUserRecord(record.country_id);
                  return;
                }
                // detail 페이지에 정보 전달 및 모달 띄우기
                setDetail(true);
                setDetailInfo({
                  ...record,
                });
              }}
            />
          ))}
        </div>
      </div>
      {detail ? (
        <RecordDetail
          setDetail={setDetail}
          detail={detail}
          record={detailInfo}
        />
      ) : null}
      {upload ? <RecordUpload setUpload={setUpload} /> : null}
      <Footer onClick={() => setUpload(true)} upload={upload} />
    </Wrap>
  );
}
export default MyRecord;
