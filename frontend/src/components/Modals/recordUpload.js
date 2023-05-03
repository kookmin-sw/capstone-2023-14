import React, { useRef, useState } from 'react';
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
import heic2any from 'heic2any';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const RecordUpload = (props) => {
  // user profile image
  const imgRef = useRef();
  const [base64, setBase64] = useState('');

  const [userEmail, setUserEmail] = useState('test');
  const [imgUrl, setImgUrl] = useState('');
  const [destination, setDestination] = useState('방콕');
  const [cost, setCost] = useState(0);
  const [record, setRecord] = useState('');

  // date-picker
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // star rating
  const [rating, setRating] = useState();
  const starRating = [];
  for (let i = 1; i <= rating; i++) {
    starRating.push(
      <img
        src={process.env.PUBLIC_URL + '/images/Rating/fillstar.svg'}
        key={i}
        alt=""
      />,
    );
  }
  if (rating % 1 > 0) {
    starRating.push(
      <img
        src={process.env.PUBLIC_URL + '/images/Rating/halfstar.svg'}
        alt=""
      />,
    );
  }
  for (let i = 1; i <= 5 - rating; i++) {
    starRating.push(
      <img
        src={process.env.PUBLIC_URL + '/images/Rating/emptystar.svg'}
        key={5 + i}
        alt=""
      />,
    );
  }

  // 이미지 업로드
  const upload = async () => {
    let file = imgRef.current.files[0];
    const fileName = file.name.split('.')[1].toLowerCase(); //확장자명 체크를 위해 소문자 변환 HEIC, heic
    if (fileName === 'heic') {
      let blob = file;
      await heic2any({ blob: blob, toType: 'image/jpeg' })
        .then(function (resultBlob) {
          file = new File([resultBlob], file.name.split('.')[0] + '.jpg', {
            type: 'image/jpeg',
            lastModified: new Date().getTime(),
          });
          reader.readAsDataURL(file);
        })
        .catch(function (x) {
          console.log(x);
        });
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      setBase64(reader.result);
    };
  };

  // 여행지 선택시 이미지 설정
  const handleOnSelectDest = async (e) => {
    e.preventDefault();
    // setDestination(e.target.value);
    const response = await axios.post('http://localhost:5001/api/get-info', {
      city: destination,
    });
    setImgUrl(response.data.imgUrl1);
  };

  // record save button clicked
  const handleOnSaveRecord = async (e) => {
    e.preventDefault();
    props.setUpload(false);
  };

  return (
    <Wrap>
      <div>
        {/* <input
          accept="image/*, image/heic"
          id="uploadImg"
          name="img_url"
          type="file"
          content_type="multipart/form-data"
          ref={imgRef}
          onChange={upload}
        />
        <ImgWrap>
          <label htmlFor={'uploadImg'}>
            <img src={} alt="" />
            {base64 ? null : (
              <img
                src={process.env.PUBLIC_URL + '/images/Common/camera.svg'}
                alt=""
              />
            )}
          </label>
        </ImgWrap> */}
        <img
          src={`data:image/jpeg;base64,${imgUrl}`}
          alt=""
          style={{ width: '100%', height: '250px' }}
        />
        <InputWrap>
          <div>
            <SubTitle margin={'0 0 10px'}>여행지 평점</SubTitle>
            <StarRatingWrap>
              <div>
                {rating > 0 ? (
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
              <select onChange={(e) => setRating(e.target.value)}>
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
            value={destination}
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
          <InputBox title={'총 여행경비'} small value={cost} />
          <div>
            <SubTitle margin={'0 0 10px'}>나의 기록</SubTitle>
            <Textarea value={record} />
          </div>
          <button onClick={handleOnSaveRecord}>저장</button>
        </InputWrap>
      </div>
    </Wrap>
  );
};

export default RecordUpload;
