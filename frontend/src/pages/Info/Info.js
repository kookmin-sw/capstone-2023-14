import React from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import { RateWrap, TodayWrap, Wrap } from './styles';
import { Title } from '../../components/Fonts/fonts';

function Info() {
  // Exchange rate by country
  const ExchangeRate = [
    {
      country: '미국',
      code: 'USD',
      rate: '0.75',
      symbol: '$',
    },
    {
      country: '일본',
      code: 'JPY',
      rate: '100.78',
      symbol: '¥',
    },
    {
      country: '중국',
      code: 'CNY',
      rate: '5.19',
      symbol: '¥',
    },
    {
      country: '유럽',
      code: 'EUR',
      rate: '0.69',
      symbol: '€',
    },
  ];
  return (
    <div>
      <Header title={'exchange-rate'} />
      <Wrap>
        <TodayWrap>
          <div>
            <div>대한민국(KRW)</div>
            <Title margin={'8px 0'}>1,000원</Title>
          </div>
          <div>
            <div>오늘</div>
            <Title margin={'8px 0'}>2023.05.12</Title>
          </div>
        </TodayWrap>
        <RateWrap>
          {ExchangeRate.map((i, key) => (
            <div key={key}>
              <div>
                {i.country}({i.code})
              </div>
              <div>
                {i.rate} {i.symbol}
              </div>
            </div>
          ))}
        </RateWrap>
      </Wrap>
      <Footer />
    </div>
  );
}
export default Info;
