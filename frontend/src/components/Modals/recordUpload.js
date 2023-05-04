import React, { useState, useEffect } from 'react';
import {
  DateWrap,
  ImgWrap,
  InputWrap,
  StarRatingWrap,
  Textarea,
  Wrap,
} from './styles';
import InputBox from '../Inputs/inputBox';
import { SubTitle } from '../Fonts/fonts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const RecordUpload = (props) => {
  const [userEmail, setUserEmail] = useState('test');
  const [imgUrl, setImgUrl] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [userRecord, setUserRecord] = useState({
    email: 'test',
    destination: '방콕',
    rating: 0,
    duration_start: '',
    duration_end: '',
    record: '',
    cost: 0,
  });

  useEffect(() => {
    setUserRecord((prevState) => {
      return {
        ...prevState,
        duration_start: convertDateToString(startDate),
        duration_end: convertDateToString(endDate),
      };
    });
  }, [startDate, endDate]);

  const starRating = [];
  for (let i = 1; i <= userRecord.rating; i++) {
    starRating.push(
      <img
        src={process.env.PUBLIC_URL + '/images/Rating/fillstar.svg'}
        key={i}
        alt=""
      />,
    );
  }
  if (userRecord.rating % 1 > 0) {
    starRating.push(
      <img
        src={process.env.PUBLIC_URL + '/images/Rating/halfstar.svg'}
        key={'0.5'}
        alt=""
      />,
    );
  }
  for (let i = 1; i <= 5 - userRecord.rating; i++) {
    starRating.push(
      <img
        src={process.env.PUBLIC_URL + '/images/Rating/emptystar.svg'}
        key={5 + i}
        alt=""
      />,
    );
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserRecord({
      ...userRecord,
      [name]: value,
    });
  };

  // 여행지 선택시 이미지 설정
  const handleOnSelectDest = async (e) => {
    e.preventDefault();
    // setDestination(e.target.value);
    const response = await axios.post('http://localhost:5001/api/get-info', {
      city: userRecord.destination,
    });
    setImgUrl(response.data.imgUrl1);
  };

  const convertDateToString = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  };

  // record save button clicked
  const handleOnSaveRecord = async (e) => {
    e.preventDefault();
    props.setUpload(false);

    try {
      await axios.post('http://localhost:5001/api/record-write', userRecord);
    } catch (e) {
      console.log(e);
    }

    console.log(userRecord);
  };

  return (
    <Wrap>
      <div>
        <ImgWrap>
          <img src={`data:image/jpeg;base64,${imgUrl}`} alt="" />
        </ImgWrap>
        <InputWrap>
          <div>
            <SubTitle margin={'0 0 10px'}>여행지 평점</SubTitle>
            <StarRatingWrap>
              <div>
                {userRecord.rating > 0 ? (
                  starRating
                ) : (
                  <>
                    <img
                      src={
                        process.env.PUBLIC_URL + '/images/Rating/emptystar.svg'
                      }
                      alt=""
                    />
                    <img
                      src={
                        process.env.PUBLIC_URL + '/images/Rating/emptystar.svg'
                      }
                      alt=""
                    />
                    <img
                      src={
                        process.env.PUBLIC_URL + '/images/Rating/emptystar.svg'
                      }
                      alt=""
                    />
                    <img
                      src={
                        process.env.PUBLIC_URL + '/images/Rating/emptystar.svg'
                      }
                      alt=""
                    />
                    <img
                      src={
                        process.env.PUBLIC_URL + '/images/Rating/emptystar.svg'
                      }
                      alt=""
                    />
                  </>
                )}
              </div>
              <select
                onChange={(e) =>
                  setUserRecord({ ...userRecord, rating: e.target.value })
                }
              >
                <option value={0}>0</option>
                <option value={0.5}>0.5</option>
                <option value={1}>1</option>
                <option value={1.5}>1.5</option>
                <option value={2}>2</option>
                <option value={2.5}>2.5</option>
                <option value={3}>3</option>
                <option value={3.5}>3.5</option>
                <option value={4}>4</option>
                <option value={4.5}>4.5</option>
                <option value={5}>5</option>
              </select>
            </StarRatingWrap>
          </div>
          <InputBox
            title={'여행지'}
            small
            name={'destination'}
            value={userRecord.destination}
            onChange={handleOnSelectDest}
          />
          <div>
            <SubTitle margin={'0 0 10px'}>여행기간</SubTitle>
            <DateWrap>
              <DatePicker
                selected={startDate}
                maxDate={new Date()}
                onChange={(date) => {
                  setStartDate(date);
                }}
                dateFormat="yyyy-MM-dd"
              />
              <span>-</span>
              <DatePicker
                selected={endDate}
                selectsEnd
                startDate={startDate}
                minDate={startDate}
                maxDate={new Date()}
                onChange={(date) => {
                  setEndDate(date);
                }}
                dateFormat="yyyy-MM-dd"
              />
            </DateWrap>
          </div>
          <InputBox
            title={'총 여행경비'}
            small
            name={'cost'}
            value={userRecord.cost}
            onChange={handleOnChange}
          />
          <div>
            <SubTitle margin={'0 0 10px'}>나의 기록</SubTitle>
            <Textarea
              name={'record'}
              value={userRecord.record}
              onChange={handleOnChange}
            />
          </div>
          <button onClick={handleOnSaveRecord}>저장</button>
        </InputWrap>
      </div>
    </Wrap>
  );
};

export default RecordUpload;
