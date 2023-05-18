import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import { ImgWrap, RowAlign, Wrap } from './styles';
import { Title } from '../../components/Fonts/fonts';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { email } from '../../store/userInfo';

function MyPage() {
  const userEmail = useRecoilValue(email);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.post('/api/get-userInfo', {
        email: userEmail,
      });

      const result = response.data[0];

      const formatNumberWithCommas = (number) => {
        return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      };

      setUserInfo({
        ...result,
        totalCost: formatNumberWithCommas(result.totalCost),
        object: result.object
          ? result.object.split(',')
          : ['취향을 설정해보세요 :)'],
        prefer_age: result.prefer_age
          ? result.prefer_age.split(',')
          : ['취향을 설정해보세요 :)'],
        style: result.style
          ? result.style.split(',')
          : ['취향을 설정해보세요 :)'],
      });

      setIsLoading(false);
    };

    fetchData();
  }, [userEmail]);

  if (isLoading) return <></>;

  return (
    <div>
      <Header title={'mypage'} />
      <Wrap>
        <ImgWrap>
          <img src={''} alt="" />
          <img
            src={process.env.PUBLIC_URL + '/images/Common/camera.svg'}
            alt=""
          />
        </ImgWrap>
        <RowAlign>
          <Title>여행횟수</Title>
          <div>총 {userInfo.totalCount}회</div>
        </RowAlign>
        <RowAlign>
          <Title>여행경비</Title>
          <div>총 {userInfo.totalCost ? userInfo.totalCost : 0}원</div>
        </RowAlign>
        <div>
          <Title margin={'0 0 12px'}>나의 여행 스타일</Title>
          <div>
            <RowAlign>
              <div>스타일</div>
              {userInfo.style.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </RowAlign>
            <RowAlign>
              <div>목적</div>
              {userInfo.object.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </RowAlign>
          </div>
        </div>
        <div>
          <Title margin={'0 0 12px'}>선호하는 동행자 스타일</Title>
          <div>
            <RowAlign>
              <div>연령대</div>
              {userInfo.prefer_age.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </RowAlign>
            <RowAlign>
              <div>성별</div>
              <span>
                {userInfo.prefer_gender
                  ? userInfo.prefer_gender
                  : '취향을 설정해보세요 :)'}
              </span>
            </RowAlign>
          </div>
        </div>
      </Wrap>
      <Footer />
    </div>
  );
}
export default MyPage;
