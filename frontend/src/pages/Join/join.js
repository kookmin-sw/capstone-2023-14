import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heic2any from 'heic2any';

import {
  ImgWrap,
  BlockWrap,
  Wrap,
  InfoWrap,
  GenderWrap,
  GenderButton,
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

  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    gender: 'man',
    birthday: '',
    mbti: '',
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

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
  console.log(userInfo.gender);

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
            type={'password'}
            value={userInfo.password}
          />
          <InputBox title={'비밀번호 확인'} type={'password'} />
          <div>
            <SubTitle margin={'0 0 10px'}>성별</SubTitle>
            <GenderWrap>
              <GenderButton check={userInfo.gender === 'man' ? true : false}>
                남자
              </GenderButton>
              <GenderButton check={userInfo.gender === 'woman' ? true : false}>
                여자
              </GenderButton>
            </GenderWrap>
          </div>
          <InfoWrap>
            <SubTitle margin={'0 0 10px'}>생년월일</SubTitle>
            <input type={'button'} value={userInfo.birthday} disabled={true} />
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
