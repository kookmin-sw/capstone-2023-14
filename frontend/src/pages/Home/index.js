import React from 'react';
import Footer from '../../components/Footer/footer';
import Destination from '../../components/Destination';
import { Wrap } from './styles';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components/Fonts/fonts';
import { useState } from 'react';
import axios from 'axios';

function Home() {
  const navigator = useNavigate();
  const handleClickDestination = (event) => {
    event.preventDefault();
    const id = event.currentTarget.querySelector('span').innerText; // 나라명
    navigator(`/detail/${id}`);
  };

  const [destination, setDestination] = useState({
    title: '방콕',
    imgUrl: '',
    companion: '김지홍',
  });

  axios
    .post('http://localhost:5001/api/recommend', { city: destination.title })
    .then((res) => {
      setDestination({
        ...destination,
        imgUrl: res.data,
      });
    });

  return (
    <div>
      <Wrap>
        <Title margin={'20px 0'}>추천하는 여행지 & 비슷한 사용자</Title>
        <Destination
          onClick={handleClickDestination}
          key={destination.title}
          title={destination.title}
          imgUrl={`data:image/jpeg;base64,${destination.imgUrl}`}
          companion={destination.companion}
        />
      </Wrap>
      <Footer />
    </div>
  );
}
export default Home;
