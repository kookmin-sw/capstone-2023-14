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
  Row,
} from './styles';
import { Title, SubTitle } from '../../components/Fonts/fonts';

import StrokeButton from '../../components/Buttons/strokeButton';
import FullButton from '../../components/Buttons/fullButton';
import Header from '../../components/Header/header';
import InputBox from '../../components/Inputs/inputBox';
import Mbti from '../../components/Modals/mbti';
import axios from 'axios';

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
    email: '',
    id: '',
    password: '',
    name: '',
    phone: '',
    gender: 'M',
    birthday: '',
    mbti: '',
  });

  const [passwordMessage, setPasswordMessage] = useState('');

  const [policy, setPolicy] = useState({
    privacy: false,
    terms: false,
  });

  // const [privacy, setPrivacy] = useState(false);
  // const [terms, setTerms] = useState(false);

  // 입력값 변화 적용
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // 전화번호 정규식
    if (name === 'phone') {
      const regex = /^[0-9\b -]{0,11}$/;
      if (!regex.test(value)) {
        return;
      }
    }

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

  const handleClickSignUp = async (event) => {
    const signUpData = new FormData();
    signUpData.append('profile', base64);
    signUpData.append('email', userInfo.email);
    signUpData.append('id', userInfo.id);
    signUpData.append('password', userInfo.password);
    signUpData.append('name', userInfo.name);
    signUpData.append('phone', userInfo.phone);
    signUpData.append('gender', userInfo.gender);
    signUpData.append('birthday', userInfo.birthday);
    signUpData.append('mbti', userInfo.mbti);

    await axios
      .post('http://localhost:5001/api/signup', signUpData)
      .then((response) => {
        if (response.status === 201) {
          //console.log('회원가입 성공');
          alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
          navigator('/');
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          alert('이미 존재하는 이메일입니다.');
        }
      });
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
            <img src={base64} alt="" />
            <img
              src={process.env.PUBLIC_URL + '/images/Common/camera.svg'}
              alt=""
            />
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
            name={'email'}
            value={userInfo.email}
          />
          <InputBox
            title={'비밀번호'}
            onChange={handleOnChange}
            type={'password'}
            name={'password'}
            value={userInfo.password}
          />
          <InputBox
            title={'비밀번호 확인'}
            type={'password'}
            onChange={(event) => {
              if (
                userInfo.password.length !== 0 &&
                userInfo.password === event.target.value
              )
                setPasswordMessage('비밀번호가 일치합니다.');
              else setPasswordMessage('비밀번호가 일치하지 않습니다.');
            }}
          />
          <span>{passwordMessage}</span>
          <div>
            <SubTitle margin={'0 0 10px'}>성별</SubTitle>
            <GenderWrap>
              <GenderButton
                onClick={() => setUserInfo({ ...userInfo, gender: 'M' })}
                checked={userInfo.gender === 'M' ? true : false}
              >
                남자
              </GenderButton>
              <GenderButton
                onClick={() => setUserInfo({ ...userInfo, gender: 'F' })}
                checked={userInfo.gender === 'F' ? true : false}
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
              name={'mbti'}
              value={userInfo.mbti}
              onClick={() => {
                setMbtiModal(true);
              }}
            />
          </InfoWrap>
        </BlockWrap>
        <TermsWrap>
          <Row
            gap={'8px'}
            onClick={() => {
              if (!policy.privacy || !policy.terms)
                setPolicy((policy) => ({
                  ...policy,
                  privacy: true,
                  terms: true,
                }));
              else {
                setPolicy((policy) => ({
                  ...policy,
                  privacy: !policy.privacy,
                  terms: !policy.terms,
                }));
              }
            }}
          >
            {policy.privacy && policy.terms ? (
              <img
                src={process.env.PUBLIC_URL + '/images/Common/checked.svg'}
                alt=""
              />
            ) : (
              <img
                src={process.env.PUBLIC_URL + '/images/Common/noChecked.svg'}
                alt=""
              />
            )}
            <span>전체선택</span>
          </Row>
          <Row
            gap={'8px'}
            onClick={() => {
              setPolicy((policy) => ({ ...policy, privacy: !policy.privacy }));
            }}
          >
            {policy.privacy ? (
              <img
                src={process.env.PUBLIC_URL + '/images/Common/checked.svg'}
                alt=""
              />
            ) : (
              <img
                src={process.env.PUBLIC_URL + '/images/Common/noChecked.svg'}
                alt=""
              />
            )}
            <span>개인정보 처리방침을 확인했습니다.</span>
          </Row>
          <Row
            gap={'8px'}
            onClick={() => {
              setPolicy((policy) => ({ ...policy, terms: !policy.terms }));
            }}
          >
            {policy.terms ? (
              <img
                src={process.env.PUBLIC_URL + '/images/Common/checked.svg'}
                alt=""
              />
            ) : (
              <img
                src={process.env.PUBLIC_URL + '/images/Common/noChecked.svg'}
                alt=""
              />
            )}
            <span>서비스 이용방침을 확인했습니다.</span>
          </Row>
        </TermsWrap>
        <BlockWrap>
          <FullButton btnName="회원가입" onClick={handleClickSignUp} />
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
