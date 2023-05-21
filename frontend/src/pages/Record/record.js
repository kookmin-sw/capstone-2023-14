import React, { useCallback, useEffect, useState } from 'react';
import Header from '../../components/Header/header';
import { Normal, Title } from '../../components/Fonts/fonts';
import Record from '../../components/Records/recordList';
import Footer from '../../components/Footer/footer';
import { Wrap } from './styles';
import RecordUpload from '../../components/Modals/recordUpload';
import RecordDetail from '../../components/Modals/recordDetail';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { email } from '../../store/userInfo';
import { AddOptionModal } from './styles';

function MyRecord() {
  const [upload, setUpload] = useState(false);
  const [detail, setDetail] = useState(false);
  const userEmail = useRecoilValue(email);
  const [recordList, setRecordList] = useState([]);
  const [detailInfo, setDetailInfo] = useState({});
  const [deleteContent, setDeleteContent] = useState(false);

  // fetchData를 useCallback으로 감싸서 의존성이 변경될 때만 함수가 재생성되도록
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post('/api/get-recordList', {
        email: userEmail,
      });
      setRecordList(response.data);
    } catch (e) {
      console.log(e);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchData();
  }, [fetchData, upload]);

  const deleteUserRecord = async (record_id) => {
    try {
      // api 요청 후 화면 리렌더링 시, 시간 지연 발생하여 화면 전환 먼저 진행
      const updatedArr = recordList.filter(
        (item) => item.country_id !== record_id,
      );
      setRecordList(updatedArr);

      await axios.post('/api/del-record', {
        email: userEmail,
        id: record_id,
      });
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };
  const [del, setDel] = useState(false);
  const [recordDel, setRecordDel] = useState();
  const HandleDeleteRecord = async (record_id) => {
    setDel(true);
    setRecordDel(record_id);
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
                  HandleDeleteRecord(record.country_id);
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
      {detail && (
        <RecordDetail
          setDetail={setDetail}
          detail={detail}
          record={detailInfo}
        />
      )}
      {upload && <RecordUpload setUpload={setUpload} />}
      {del ? (
        <AddOptionModal>
          <div>
            <div>
              <Normal>정말로 삭제하시겠습니까 ?</Normal>
              <Normal>삭제한 게시글은 복구가 불가능합니다.</Normal>
            </div>
            <div>
              <button
                onClick={() => {
                  deleteUserRecord(recordDel);
                  setDel(false);
                }}
              >
                삭제
              </button>
              <button
                onClick={() => {
                  setDel(false);
                  setDeleteContent(false);
                }}
              >
                취소
              </button>
            </div>
          </div>
        </AddOptionModal>
      ) : null}
      <Footer onClick={() => setUpload(true)} upload={upload} />
    </Wrap>
  );
}
export default MyRecord;
