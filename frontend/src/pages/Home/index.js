import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer/footer';
import Destination from '../../components/Destination';
import { Wrap } from './styles';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components/Fonts/fonts';
import loadingImage from '../../assets/Ball.gif';
import axios from 'axios';
import TasteModal from '../../components/Modals/tasteModal';
import { useRecoilValue } from 'recoil';
import { email } from '../../store/userInfo';

function Home() {
  const navigator = useNavigate();
  const [recommendList, setRecommendList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userEmail = useRecoilValue(email);

  // 취향정보가 없는 유저의 경우 홈화면 접근 시 모달창 띄우기
  const [tasteModal, setTasteModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/get-userInfo', {
          email: userEmail,
        });
        setUserInfo(response.data[0]);
        if (
          response.data[0].object === null ||
          response.data[0].style === null ||
          response.data[0].prefer_age === null ||
          response.data[0].prefer_gender === null
        ) {
          setTasteModal(true);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    return;
  }, [userEmail]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `http://3.38.84.113:5000/dm/recommend?email=${userEmail}`,
          { withCredentials: true },
        );

        const cityList = response.data.result;
        const cityInfoList = await axios.post('/api/get-image', {
          cityList: cityList,
        });

        const newRecommendList = cityInfoList.data.map((dest) => ({
          name: dest.name,
          imgUrl: dest.imgUrl,
          contents: dest.contents,
        }));

        setRecommendList(newRecommendList);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [userEmail]);

  const handleClickDestination = (event) => {
    event.preventDefault();
    const id = event.currentTarget.querySelector('div').innerText;
    navigator(`/detail/${id}`);
  };

  if (isLoading) {
    return (
      <>
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
      </>
    );
  }

  return (
    <div>
      <Wrap>
        <Title margin={'20px 0'}>추천하는 여행지 & 비슷한 사용자</Title>
        {recommendList.map((city) => (
          <Destination
            onClick={handleClickDestination}
            key={city.name}
            title={city.name}
            imgUrl={`data:image/jpeg;base64,${city.imgUrl}`}
            contents={city.contents}
          />
        ))}
      </Wrap>
      <Footer />
      {tasteModal ? <TasteModal setTasteModal={setTasteModal} /> : null}
    </div>
  );
}
export default Home;
