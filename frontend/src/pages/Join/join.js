import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heic2any from 'heic2any';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  ImgWrap,
  BlockWrap,
  Wrap,
  InfoWrap,
  GenderWrap,
  GenderButton,
  TermsWrap,
} from './styles';
import { Title, SubTitle } from '../../components/Fonts/fonts';

import StrokeButton from '../../components/Buttons/strokeButton';
import FullButton from '../../components/Buttons/fullButton';
import Header from '../../components/Header/header';
import InputBox from '../../components/Inputs/inputBox';
import Mbti from '../../components/Modals/mbti';

function Join() {
  const navigator = useNavigate();

  const imgRef = useRef();

  // user profile image
  const [base64, setBase64] = useState('');

  // mbti modal on/off
  const [mbtiModal, setMbtiModal] = useState(false);

  const [startDate, setStartDate] = useState(new Date());

  // database에 저장할 유저의 회원정보
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    gender: 'man',
    birthday: '',
    mbti: '',
  });

  // 입력값 변화 적용
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // 프로필 사진 업로드
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

  return (
    <div>
      <Header title="join" />
      <Wrap>
        <input
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
            <img src={base64} />
            <img src={process.env.PUBLIC_URL + '/images/Common/camera.svg'} />
          </label>
        </ImgWrap>
        <Title margin={'0 0 20px'}>회원정보입력</Title>
        <BlockWrap>
          <InputBox
            title={'이름'}
            onChange={handleOnChange}
            name={'name'}
            value={userInfo.name}
          />
          <InputBox
            title={'전화번호'}
            onChange={handleOnChange}
            name={'phone'}
            value={userInfo.phone}
          />
          <InputBox
            title={'이메일'}
            onChange={handleOnChange}
            type={'email'}
            value={userInfo.email}
          />
          <InputBox
            title={'비밀번호'}
            onChange={handleOnChange}
            type={'new-password'}
            value={userInfo.password}
          />
          <InputBox title={'비밀번호 확인'} type={'new-password'} />
          <div>
            <SubTitle margin={'0 0 10px'}>성별</SubTitle>
            <GenderWrap>
              <GenderButton
                onClick={() => setUserInfo({ ...userInfo, gender: 'man' })}
                checked={userInfo.gender === 'man' ? true : false}
              >
                남자
              </GenderButton>
              <GenderButton
                onClick={() => setUserInfo({ ...userInfo, gender: 'woman' })}
                checked={userInfo.gender === 'woman' ? true : false}
              >
                여자
              </GenderButton>
            </GenderWrap>
          </div>
          <InfoWrap>
            <SubTitle margin={'0 0 10px'}>생년월일</SubTitle>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setUserInfo({ ...userInfo, birthday: date });
              }}
              dateFormat="yyyy-MM-dd"
            />
          </InfoWrap>
          <InfoWrap>
            <SubTitle margin={'0 0 10px'}>MBTI</SubTitle>
            <input
              type={'button'}
              value={userInfo.mbti}
              onClick={() => {
                setMbtiModal(true);
              }}
            />
          </InfoWrap>
        </BlockWrap>
        <TermsWrap>
          <div>
            <img
              src={process.env.PUBLIC_URL + '/images/Common/noChecked.svg'}
            />
            <span>전체선택</span>
          </div>
          <div>
            <img
              src={process.env.PUBLIC_URL + '/images/Common/noChecked.svg'}
            />
            <span>개인정보 처리방침을 확인했습니다.</span>
          </div>
          <div>
            <img
              src={process.env.PUBLIC_URL + '/images/Common/noChecked.svg'}
            />
            <span>서비스 이용방침을 확인했습니다.</span>
          </div>
        </TermsWrap>
        <BlockWrap>
          <FullButton btnName="회원가입" />
          <StrokeButton btnName="뒤로가기" onClick={() => navigator(-1)} />
        </BlockWrap>
      </Wrap>
      {mbtiModal ? (
        <Mbti
          setMbtiModal={setMbtiModal}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      ) : null}
    </div>
  );
}
export default Join;
