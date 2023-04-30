import React, { useEffect } from 'react';
import Footer from '../../components/Footer/footer';
import Destination from '../../components/Destination';
import { Wrap } from './styles';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components/Fonts/fonts';
import { useState } from 'react';
import axios from 'axios';

function Home() {
  const navigator = useNavigate();
  const [recommendList, setRecommendList] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      // 추천 받은 여행지. JSON 형태
      const response = {
        city1: '보라카이',
        city2: '도쿄',
        city3: '방콕',
      };
      const cityList = Object.keys(response);
      cityList.forEach((city) => {
        addRecommendList(response[city]);
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getImage = () => {
      recommendList.forEach(async (destination) => {
        const response = await axios.post(
          'http://localhost:5001/api/recommend',
          {
            city: destination.title,
          },
        );
        updateRecommendList(destination.title, response.data);
      });
    };
    getImage();
  }, [recommendList]);

  const addRecommendList = (destination) => {
    setRecommendList((prevList) => [
      ...prevList,
      {
        title: destination,
        imgUrl: '',
        companion: '',
      },
    ]);
  };

  const updateRecommendList = (destination, url) => {
    setRecommendList(
      recommendList.map((item) =>
        item.title === destination ? { ...item, imgUrl: url } : item,
      ),
    );
  };

  const handleClickDestination = (event) => {
    event.preventDefault();
    const id = event.currentTarget.querySelector('span').innerText; // 나라명
    navigator(`/detail/${id}`);
  };

  return (
    <div>
      <Wrap>
        <Title margin={'20px 0'}>추천하는 여행지 & 비슷한 사용자</Title>
        {recommendList.map((destination) => (
          <Destination
            onClick={handleClickDestination}
            key={destination.title}
            title={destination.title}
            imgUrl={`data:image/jpeg;base64,${destination.imgUrl}`}
            companion={destination.companion}
          />
        ))}
      </Wrap>
      <Footer />
    </div>
  );
}
export default Home;
