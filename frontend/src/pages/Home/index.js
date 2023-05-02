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
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [userEmail, setUserEmail] = useState('test');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const response = await axios.get(
        `http://3.38.84.113:5000/dm/recommend?email=${userEmail}`,
        { withCredentials: true },
      );

      const cityList = response.data.result;

      const cityInfoList = await axios.post(
        'http://localhost:5001/api/get-image',
        {
          cityList: cityList,
        },
      );

      const newRecommendList = cityInfoList.data.map((dest) => ({
        title: dest.name,
        imgUrl: dest.imgUrl,
        companion: '',
      }));

      setRecommendList(newRecommendList);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleClickDestination = (event) => {
    event.preventDefault();
    const id = event.currentTarget.querySelector('span').innerText; // 나라명
    navigator(`/detail/${id}`);
  };

  if (isLoading) {
    return (
      <>
        <h2>Loading...</h2>
        <div
          style={{
            border: '1px solid gray',
            width: '100%',
            height: '20px',
            borderRadius: '30px',
          }}
        >
          <div
            style={{
              backgroundColor: '#ef4e3e',
              width: `${progress}%`,
              height: '100%',
              borderRadius: '30px',
            }}
          />
        </div>
      </>
    );
  }

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
