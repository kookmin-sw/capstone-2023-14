import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import { RateWrap, TodayWrap, Wrap } from './styles';
import { Normal, Title } from '../../components/Fonts/fonts';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { rate } from '../../store/userInfo';

function Info() {
  // 오늘 날짜
  const now = new Date(Date.now()).toDateString();

  //한국 수출입은행에 api 요청
  const request = `/site/program/financial/exchangeJSON?authkey=${process.env.REACT_APP_API_AUTHKEY}&data=AP01`;

  //한국 수출입은행의 open api를 활용한 환율 정보 받아오기
  // const [allRate, setAllRate] = useRecoilState(rate); // Exchange rate by country
  //
  // useEffect(() => {
  //   if (allRate.length === 0) {
  //     const getExchageRate = async () => {
  //       await axios
  //         .get(request)
  //         .then((response) => {
  //           if (response.data[0].result === 4) {
  //             alert(
  //               'api의 일일 제한횟수 마감으로 데이터를 반환할 수 없습니다.',
  //             );
  //             return;
  //           }
  //           setAllRate(response.data);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     };
  //     getExchageRate();
  //   }
  // });

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
              {/*{allRate.map((i, idx) => (*/}
              {/*  <tr align="center" bgcolor="white" key={idx}>*/}
              {/*    <td>*/}
              {/*      {i.cur_nm}({i.cur_unit})*/}
              {/*    </td>*/}
              {/*    <td>{i.ttb}</td>*/}
              {/*    <td>{i.tts}</td>*/}
              {/*  </tr>*/}
              {/*))}*/}
            </tbody>
          </table>
        </RateWrap>
      </Wrap>
      <Footer />
    </div>
  );
}
export default Info;
