import React from 'react';
import 'slick-carousel/slick/slick.css';
import './slick-theme.css';
import Slider from 'react-slick';
import { Thumbnail } from './styles';

function ImgSlider(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
          <Thumbnail src={props.Img1} alt="사진1" />
        </div>
        <div>
          <Thumbnail src={props.Img2} alt="사진2" />
        </div>
        <div>
          <Thumbnail src={props.Img3} alt="사진3" />
        </div>
      </Slider>
    </div>
  );
}

export default ImgSlider;
