import React from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import { useParams } from 'react-router-dom';

function Detail() {
  const params = useParams();
  const destination = params.id; // ex) "도쿄 / 이집트 / 영국"

  return (
    <div>
      <Header />
      {destination}
      <Footer />
    </div>
  );
}

export default Detail;
