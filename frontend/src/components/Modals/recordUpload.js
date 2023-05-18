import React, { useState, useEffect } from 'react';
import {
  DateWrap,
  ImgWrap,
  InputWrap,
  StarRatingWrap,
  Textarea,
  Wrap,
  DropdownMenu,
} from './styles';
import InputBox from '../Inputs/inputBox';
import { SubTitle } from '../Fonts/fonts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { email } from '../../store/userInfo';

const RecordUpload = (props) => {
  const userEmail = useRecoilValue(email);
  const [imgUrl, setImgUrl] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [userRecord, setUserRecord] = useState({
    email: userEmail,
    destination: '',
    rating: 0,
    duration_start: '',
    duration_end: '',
    record: '',
    cost: '',
  });
  const [showList, setShowList] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    const fetchCityList = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5001/api/get-cityList',
        );
        setCityOptions(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    setUserRecord((prevState) => {
      return {
        ...prevState,
        duration_start: convertDateToString(startDate),
        duration_end: convertDateToString(endDate),
      };
    });

    fetchCityList();
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

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    if (name === 'cost') {
      const regex = /^[0-9\b -]{0,20}$/;
      if (!regex.test(value)) {
        return;
      }
    }

    setUserRecord({
      ...userRecord,
      [name]: value,
    });
  };

  // 여행지 선택시 이미지 설정
  const handleOnSelectDest = async (input) => {
    setUserRecord((prevState) => {
      return {
        ...prevState,
        destination: input,
      };
    });
    setShowList(false);

    const response = await axios.post('http://localhost:5001/api/get-info', {
      city: input,
    });
    setImgUrl(response.data.imgUrl1);
  };

  function addCommasToNumber(number) {
    const strNumber = String(number);

    return strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const convertDateToString = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  };

  // record save button clicked
  const handleOnSaveRecord = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5001/api/record-write', userRecord);
      alert('기록이 저장되었습니다.');
      props.setUpload(false);
    } catch (e) {
      alert('문제가 발생했어요. 기록이 저장되지 않았습니다. :(');
      console.log(e);
    }
  };

  return (
    <Wrap>
      <div>
        <ImgWrap>
          {imgUrl ? (
            <img src={`data:image/jpeg;base64,${imgUrl}`} alt="" />
          ) : (
            <img
              src={process.env.PUBLIC_URL + '/images/Common/emptyDefault.png'}
              alt=""
            />
          )}
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
          <div style={{ position: 'relative' }}>
            <InputBox
              title={'여행지'}
              small
              name={'destination'}
              value={userRecord.destination}
              onChange={handleChangeInput}
              onClick={() => setShowList(!showList)}
            />
            {showList && (
              <DropdownMenu>
                {cityOptions.map((option, index) => (
                  <li key={index} onClick={() => handleOnSelectDest(option)}>
                    {option}
                  </li>
                ))}
              </DropdownMenu>
            )}
          </div>
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
            onChange={handleChangeInput}
          />
          <div>
            <SubTitle margin={'0 0 10px'}>나의 기록</SubTitle>
            <Textarea
              name={'record'}
              value={userRecord.record}
              onChange={handleChangeInput}
            />
          </div>
          <span>
            <button onClick={handleOnSaveRecord}>저장</button>
            <button onClick={() => props.setUpload(false)}>취소</button>
          </span>
        </InputWrap>
      </div>
    </Wrap>
  );
};

export default RecordUpload;
