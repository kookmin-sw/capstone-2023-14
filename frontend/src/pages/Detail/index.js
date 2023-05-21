import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import { useParams } from 'react-router-dom';
import ImgSlider from '../../components/Slider';
import { InfoWrap, UserWrap, Wrap } from './styles';
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompanion = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `http://3.38.84.113:5000/dm/companion?user_id=${userEmail}&country_id=${cityId}`,
      );
      setCompanionList(response.data.result);
      setIsLoading(false);
    };

    const fetchData = async () => {
      setIsLoading(true);

      const response = await axios.post('/api/get-info', {
        city: destination,
      });
      setCity({ ...city, info: response.data });
      setCityId(response.data.id);

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
            <UserWrap key={companion.name}>
              {companion.profile ? (
                <img
                  src={`data:image/jpeg;base64,${companion.profile}`}
                  alt="profile"
                />
              ) : (
                <img
                  src="https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMjU4/MDAxNTIwMDQxODA4Mjc0.gR3L5xx3IbpACbvRRF9j9xjJmO-EPAY35oF1AdBnDcog.WZyeqFi6cMmH-v-R-ec44Ny6ZgVyAJIYMT78p4Rxbkwg.PNG.osy2201/2_%2850%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800"
                  alt="profile"
                />
              )}

              <Normal>{companion.name}</Normal>
              <Small color={'#D9D9D9'}>{companion.mbti}</Small>
            </UserWrap>
          ))}
        </div>
      </Wrap>
      <Footer />
    </div>
  );
}

export default Detail;
