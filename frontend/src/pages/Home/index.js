import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer/footer';
import Destination from '../../components/Destination';
import { Wrap } from './styles';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components/Fonts/fonts';
import axios from 'axios';

function Home() {
  const navigator = useNavigate();
  const [recommendList, setRecommendList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = {
        result: ['보라카이', '도쿄', '방콕'],
      };
      const cityList = Object.keys(response);
      const newRecommendList = response[cityList].map((city) => ({
        title: city,
        imgUrl: '',
        companion: '',
      }));
      setRecommendList(newRecommendList);

      const updateImage = await Promise.all(
        newRecommendList.map(async (destination) => {
          const response = await axios.post(
            'http://localhost:5001/api/recommend',
            {
              city: destination.title,
            },
          );
          return { ...destination, imgUrl: response.data };
        }),
      );
      setRecommendList(updateImage);
    };

    fetchData();
  }, []);

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
