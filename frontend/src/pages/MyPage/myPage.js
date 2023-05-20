import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import { ImgWrap, RowAlign, Wrap } from './styles';
import { Normal, Title } from '../../components/Fonts/fonts';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { email } from '../../store/userInfo';
import { useNavigate } from 'react-router-dom';

function MyPage() {
  const userEmail = useRecoilValue(email);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigator = useNavigate();
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
        object: result.object ? result.object.split(',') : [],
        prefer_age: result.prefer_age ? result.prefer_age.split(',') : [],
        style: result.style ? result.style.split(',') : [],
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
          <Normal>총 {userInfo.totalCount}회</Normal>
        </RowAlign>
        <RowAlign>
          <Title>여행경비</Title>
          <Normal>총 {userInfo.totalCost ? userInfo.totalCost : 0}원</Normal>
        </RowAlign>
        <div>
          <Title margin={'0 0 12px'}>나의 여행 스타일</Title>
          <div>
            <RowAlign cursor={userInfo.style.length === 0}>
              <Normal>스타일</Normal>
              <div>
                {userInfo.style.length !== 0 ? (
                  userInfo.style.map((tag) => <Normal key={tag}>{tag}</Normal>)
                ) : (
                  <Normal onClick={() => navigator('/setting/taste')}>
                    취향을 설정해보세요 :)
                  </Normal>
                )}
              </div>
            </RowAlign>
            <RowAlign cursor={userInfo.object.length === 0}>
              <Normal>목적</Normal>
              <div>
                {userInfo.object.length !== 0 ? (
                  userInfo.object.map((tag) => <Normal key={tag}>{tag}</Normal>)
                ) : (
                  <Normal onClick={() => navigator('/setting/taste')}>
                    취향을 설정해보세요 :)
                  </Normal>
                )}
              </div>
            </RowAlign>
          </div>
        </div>
        <div>
          <Title margin={'0 0 12px'}>선호하는 동행자 스타일</Title>
          <div>
            <RowAlign cursor={userInfo.prefer_age.length === 0}>
              <Normal>연령대</Normal>
              <div>
                {userInfo.prefer_age.length !== 0 ? (
                  userInfo.prefer_age.map((tag) => (
                    <Normal key={tag}>{tag}</Normal>
                  ))
                ) : (
                  <Normal onClick={() => navigator('/setting/taste')}>
                    취향을 설정해보세요 :)
                  </Normal>
                )}
              </div>
            </RowAlign>
            <RowAlign cursor={!userInfo.prefer_gender}>
              <Normal>성별</Normal>
              <div>
                {userInfo.prefer_gender ? (
                  <Normal>{userInfo.prefer_gender}</Normal>
                ) : (
                  <Normal onClick={() => navigator('/setting/taste')}>
                    취향을 설정해보세요 :)
                  </Normal>
                )}
              </div>
            </RowAlign>
          </div>
        </div>
      </Wrap>
      <Footer />
    </div>
  );
}
export default MyPage;
