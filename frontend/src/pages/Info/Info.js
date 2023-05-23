import React, { useEffect } from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import { RateWrap, TodayWrap, Wrap } from './styles';
import { Normal, Small, Title } from '../../components/Fonts/fonts';

import { useRecoilState } from 'recoil';
import { rate } from '../../store/userInfo';

function Info() {
  // 오늘 날짜
  const now = new Date(Date.now()).toDateString();

  //한국 수출입은행에 api 요청
  const request = `/site/program/financial/exchangeJSON?authkey=${process.env.REACT_APP_API_AUTHKEY}&data=AP01`;

  //한국 수출입은행의 open api를 활용한 환율 정보 받아오기
  const [allRate, setAllRate] = useRecoilState(rate); // Exchange rate by country

  useEffect(() => {
    if (allRate.length === 0) {
      setAllRate([
        {
          result: 1,
          cur_unit: 'AED',
          ttb: '358.88',
          tts: '366.13',
          deal_bas_r: '362.51',
          bkpr: '362',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '362',
          kftc_deal_bas_r: '362.51',
          cur_nm: '아랍에미리트 디르함',
        },
        {
          result: 1,
          cur_unit: 'AUD',
          ttb: '876.79',
          tts: '894.5',
          deal_bas_r: '885.65',
          bkpr: '885',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '885',
          kftc_deal_bas_r: '885.65',
          cur_nm: '호주 달러',
        },
        {
          result: 1,
          cur_unit: 'BHD',
          ttb: '3,495.44',
          tts: '3,566.05',
          deal_bas_r: '3,530.75',
          bkpr: '3,530',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '3,530',
          kftc_deal_bas_r: '3,530.75',
          cur_nm: '바레인 디나르',
        },
        {
          result: 1,
          cur_unit: 'BND',
          ttb: '980.16',
          tts: '999.97',
          deal_bas_r: '990.07',
          bkpr: '990',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '990',
          kftc_deal_bas_r: '990.07',
          cur_nm: '브루나이 달러',
        },
        {
          result: 1,
          cur_unit: 'CAD',
          ttb: '976.75',
          tts: '996.48',
          deal_bas_r: '986.62',
          bkpr: '986',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '986',
          kftc_deal_bas_r: '986.62',
          cur_nm: '캐나다 달러',
        },
        {
          result: 1,
          cur_unit: 'CHF',
          ttb: '1,467.01',
          tts: '1,496.64',
          deal_bas_r: '1,481.83',
          bkpr: '1,481',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '1,481',
          kftc_deal_bas_r: '1,481.83',
          cur_nm: '스위스 프랑',
        },
        {
          result: 1,
          cur_unit: 'CNH',
          ttb: '186.77',
          tts: '190.54',
          deal_bas_r: '188.66',
          bkpr: '188',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '188',
          kftc_deal_bas_r: '188.66',
          cur_nm: '위안화',
        },
        {
          result: 1,
          cur_unit: 'DKK',
          ttb: '191.48',
          tts: '195.35',
          deal_bas_r: '193.42',
          bkpr: '193',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '193',
          kftc_deal_bas_r: '193.42',
          cur_nm: '덴마아크 크로네',
        },
        {
          result: 1,
          cur_unit: 'EUR',
          ttb: '1,426.28',
          tts: '1,455.09',
          deal_bas_r: '1,440.69',
          bkpr: '1,440',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '1,440',
          kftc_deal_bas_r: '1,440.69',
          cur_nm: '유로',
        },
        {
          result: 1,
          cur_unit: 'GBP',
          ttb: '1,641.89',
          tts: '1,675.06',
          deal_bas_r: '1,658.48',
          bkpr: '1,658',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '1,658',
          kftc_deal_bas_r: '1,658.48',
          cur_nm: '영국 파운드',
        },
        {
          result: 1,
          cur_unit: 'HKD',
          ttb: '168.57',
          tts: '171.98',
          deal_bas_r: '170.28',
          bkpr: '170',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '170',
          kftc_deal_bas_r: '170.28',
          cur_nm: '홍콩 달러',
        },
        {
          result: 1,
          cur_unit: 'IDR(100)',
          ttb: '8.83',
          tts: '9',
          deal_bas_r: '8.92',
          bkpr: '8',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '8',
          kftc_deal_bas_r: '8.92',
          cur_nm: '인도네시아 루피아',
        },
        {
          result: 1,
          cur_unit: 'JPY(100)',
          ttb: '957.66',
          tts: '977.01',
          deal_bas_r: '967.34',
          bkpr: '967',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '967',
          kftc_deal_bas_r: '967.34',
          cur_nm: '일본 옌',
        },
        {
          result: 1,
          cur_unit: 'KRW',
          ttb: '0',
          tts: '0',
          deal_bas_r: '1',
          bkpr: '1',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '1',
          kftc_deal_bas_r: '1',
          cur_nm: '한국 원',
        },
        {
          result: 1,
          cur_unit: 'KWD',
          ttb: '4,289.99',
          tts: '4,376.66',
          deal_bas_r: '4,333.33',
          bkpr: '4,333',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '4,333',
          kftc_deal_bas_r: '4,333.33',
          cur_nm: '쿠웨이트 디나르',
        },
        {
          result: 1,
          cur_unit: 'MYR',
          ttb: '290.37',
          tts: '296.24',
          deal_bas_r: '293.31',
          bkpr: '293',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '293',
          kftc_deal_bas_r: '293.31',
          cur_nm: '말레이지아 링기트',
        },
        {
          result: 1,
          cur_unit: 'NOK',
          ttb: '121.13',
          tts: '123.58',
          deal_bas_r: '122.36',
          bkpr: '122',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '122',
          kftc_deal_bas_r: '122.36',
          cur_nm: '노르웨이 크로네',
        },
        {
          result: 1,
          cur_unit: 'NZD',
          ttb: '827.1',
          tts: '843.81',
          deal_bas_r: '835.46',
          bkpr: '835',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '835',
          kftc_deal_bas_r: '835.46',
          cur_nm: '뉴질랜드 달러',
        },
        {
          result: 1,
          cur_unit: 'SAR',
          ttb: '351.44',
          tts: '358.53',
          deal_bas_r: '354.99',
          bkpr: '354',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '354',
          kftc_deal_bas_r: '354.99',
          cur_nm: '사우디 리얄',
        },
        {
          result: 1,
          cur_unit: 'SEK',
          ttb: '125.43',
          tts: '127.96',
          deal_bas_r: '126.7',
          bkpr: '126',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '126',
          kftc_deal_bas_r: '126.7',
          cur_nm: '스웨덴 크로나',
        },
        {
          result: 1,
          cur_unit: 'SGD',
          ttb: '980.16',
          tts: '999.97',
          deal_bas_r: '990.07',
          bkpr: '990',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '990',
          kftc_deal_bas_r: '990.07',
          cur_nm: '싱가포르 달러',
        },
        {
          result: 1,
          cur_unit: 'THB',
          ttb: '38.4',
          tts: '39.17',
          deal_bas_r: '38.79',
          bkpr: '38',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '38',
          kftc_deal_bas_r: '38.79',
          cur_nm: '태국 바트',
        },
        {
          result: 1,
          cur_unit: 'USD',
          ttb: '1,317.88',
          tts: '1,344.51',
          deal_bas_r: '1,331.2',
          bkpr: '1,331',
          yy_efee_r: '0',
          ten_dd_efee_r: '0',
          kftc_bkpr: '1,331',
          kftc_deal_bas_r: '1,331.2',
          cur_nm: '미국 달러',
        },
      ]);
    }
  });

  return (
    <div>
      <Header title={'exchange-rate'} />
      <Wrap>
        <TodayWrap>
          <div>
            <Normal>오늘</Normal>
            <Title margin={'8px 0'}>{now}</Title>
          </div>
        </TodayWrap>
        <RateWrap>
          <table border="1" width="100%">
            <thead>
              <tr align="center" bgcolor="white">
                <th>국가/통화명(통화코드)</th>
                <th>전신환(송금) 받을때</th>
                <th>전신환(송금) 보낼때</th>
              </tr>
            </thead>
            <tbody>
              {allRate.map((i, idx) => (
                <tr align="center" bgcolor="white" key={idx}>
                  <td>
                    {i.cur_nm}({i.cur_unit})
                  </td>
                  <td>{i.ttb}</td>
                  <td>{i.tts}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Small color={'#7c7c7c'} margin={'4px 0'}>
            출처: 한국 수출입은행 현재환율 API
          </Small>
        </RateWrap>
      </Wrap>
      <Footer />
    </div>
  );
}
export default Info;
