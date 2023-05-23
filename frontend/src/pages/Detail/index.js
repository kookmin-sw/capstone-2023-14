import React, { useEffect, useState, useRef } from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import { useParams } from 'react-router-dom';
import ImgSlider from '../../components/Slider';
import { InfoWrap, UserInfoDetail, UserWrap, Wrap } from './styles';
import { Title, SubTitle, Small, Normal } from '../../components/Fonts/fonts';
import loadingImage from '../../assets/Ball.gif';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { email } from '../../store/userInfo';

function Detail() {
  const params = useParams();
  const destination = params.id;
  const userEmail = useRecoilValue(email);
  const [city, setCity] = useState({
    name: destination,
    info: {},
  });
  const [cityId, setCityId] = useState(-1);
  const [companionList, setCompanionList] = useState([]);
  const [detailUser, setDetailUser] = useState({}); // 동행인 디테일 정보
  const [detailInfo, setDetailInfo] = useState(false); // 동행인 디테일 모달 노출 유무
  const [isLoading, setIsLoading] = useState(true);

  const dimmed = useRef();

  const handleModalOutsideClick = (event) => {
    if (detailInfo && !dimmed.current.contains(event.target)) {
      setDetailInfo(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleModalOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleModalOutsideClick);
    };
  });

  useEffect(() => {
    const fetchCompanion = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://3.38.84.113:5000/dm/companion?user_id=${userEmail}&country_id=${cityId}`,
        );
        setCompanionList(response.data.result);
      } catch (e) {
        console.log(e);
      }

      setIsLoading(false);
    };

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.post('/api/get-info', {
          city: destination,
        });
        setCity({ ...city, info: response.data });
        setCityId(response.data.id);
      } catch (e) {
        console.log(e);
      }

      if (cityId !== -1) {
        fetchCompanion();
      }
      setIsLoading(false);
    };

    fetchData();
  }, [cityId]);

  if (isLoading)
    return (
      <img
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        src={loadingImage}
        alt="loading gif"
      />
    );

  return (
    <div>
      <Header title="Detail" />
      <ImgSlider
        Img1={`data:image/jpeg;base64,${city.info.imgUrl1}`}
        Img2={`data:image/jpeg;base64,${city.info.imgUrl2}`}
        Img3={`data:image/jpeg;base64,${city.info.imgUrl3}`}
      />
      <Wrap>
        <Title margin={'20px 0 12px'}>{destination}</Title>
        <InfoWrap>
          <div>{city.info.contents}</div>
          <div>
            <div>
              <SubTitle margin={'0 0 4px'}>날씨</SubTitle>
              <div>최저 {city.info.low_temperature}°</div>
              <div>최고 {city.info.high_temperature}°</div>
            </div>
            <div>
              <SubTitle margin={'0 0 4px'}>소요시간</SubTitle>
              <div>{city.info.flight_time}</div>
            </div>
            <div>
              <SubTitle margin={'0 0 4px'}>비자유무</SubTitle>
              <div>{city.info.visa}</div>
            </div>
          </div>
        </InfoWrap>
        <div>
          <Title margin={'0 0 20px'}>동행인 추천</Title>
          {companionList.map((companion) => (
            <UserWrap
              key={companion.name}
              onClick={() => {
                setDetailUser(companion);
                setDetailInfo(true);
              }}
            >
              {companion.profile ? (
                <img
                  src={`data:image/jpeg;base64,${companion.profile}`}
                  alt="profile"
                />
              ) : (
                <img
                  src={'https://cdn-icons-png.flaticon.com/256/44/44463.png'}
                  alt="profile"
                />
              )}

              <Normal size={'14px'}>{companion.name}</Normal>
              <Small color={'#D9D9D9'}>{companion.mbti}</Small>
            </UserWrap>
          ))}
        </div>
      </Wrap>
      {detailInfo && detailUser ? (
        <UserInfoDetail>
          <div ref={dimmed}>
            <button onClick={() => setDetailInfo(false)}>X</button>
            <div>
              {detailUser.profile ? (
                <img src={`data:image/jpeg;base64,${detailUser.profile}`} />
              ) : (
                <img
                  src={'https://cdn-icons-png.flaticon.com/256/44/44463.png'}
                  alt=""
                />
              )}
            </div>
            <div>
              <span>이름: </span>
              <span>{detailUser.name}</span>
            </div>
            <div>
              <span>생일: </span>
              <span>{new Date(detailUser.birth).toDateString()}</span>
            </div>
            <div>
              <span>MBTI: </span>
              <span>{detailUser.mbti}</span>
            </div>
            <div>
              <span>성별: </span>
              <span>{detailUser.gender}</span>
            </div>
            <div>
              <span>이메일: </span>
              <span>{detailUser.user_id}</span>
            </div>
          </div>
        </UserInfoDetail>
      ) : null}
      <Footer />
    </div>
  );
}

export default Detail;
