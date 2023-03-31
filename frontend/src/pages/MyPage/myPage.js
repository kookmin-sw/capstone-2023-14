import React from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import { ImgWrap, RowAlign, Wrap } from './styles';
import { Title } from '../../components/Fonts/fonts';

function MyPage() {
  return (
    <div>
      <Header title={'mypage'} />
      <Wrap>
        <ImgWrap>
          <img src={''} />
          <img src={process.env.PUBLIC_URL + '/images/Common/camera.svg'} />
        </ImgWrap>
        <RowAlign>
          <Title>여행횟수</Title>
          <div>총 6회</div>
        </RowAlign>
        <RowAlign>
          <Title>여행경비</Title>
          <div>총 4,250,800원</div>
        </RowAlign>
        <div>
          <Title margin={'0 0 12px'}>나의 여행 스타일</Title>
          <div>
            <RowAlign>
              <div>스타일</div>
              <span>계획적</span>
            </RowAlign>
            <RowAlign>
              <div>목적</div>
              <span>쇼핑</span>
              <span>관광</span>
              <span>문화</span>
            </RowAlign>
          </div>
        </div>
        <div>
          <Title margin={'0 0 12px'}>선호하는 동행자 스타일</Title>
          <div>
            <RowAlign>
              <div>연령대</div>
              <span>상관없음</span>
            </RowAlign>
            <RowAlign>
              <div>성별</div>
              <span>동성</span>
              <span>혼성</span>
            </RowAlign>
          </div>
        </div>
      </Wrap>
      <Footer />
    </div>
  );
}
export default MyPage;
