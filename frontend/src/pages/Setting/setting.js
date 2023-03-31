import React from 'react';
import Header from '../../components/Header/header';
import { SmallTitle } from '../../components/Fonts/fonts';
import Item from '../../components/Setting/item';
import { ItemWrap, Wrap } from './styles';
import { useNavigate } from 'react-router-dom';

function Setting() {
  const navigator = useNavigate();

  const ItemList = [
    {
      img: '/images/Setting/tasteIcon.svg',
      text: '취향 설정',
      icon: 'icon',
      type: 'personal',
      navi: '/taste',
    },
    {
      img: '/images/Setting/changePW.svg',
      text: '비밀번호 변경하기',
      icon: 'icon',
      type: 'personal',
      navi: null,
    },
    {
      img: '/images/Setting/notiIcon.svg',
      text: '알림 설정',
      icon: 'switch',
      type: 'app',
      navi: null,
    },
    {
      img: '/images/Setting/contextIcon.svg',
      text: '개인정보 이용약관',
      icon: 'icon',
      type: 'info',
      navi: null,
    },
    {
      img: '/images/Setting/contextIcon.svg',
      text: '서비스 이용방침',
      icon: 'icon',
      type: 'info',
      navi: null,
    },
    {
      img: '/images/Setting/version.svg',
      text: '버전 정보',
      icon: 'none',
      type: 'info',
      navi: null,
    },
    {
      img: '/images/Setting/logout.svg',
      text: '로그아웃',
      icon: 'none',
      type: 'info',
      navi: null,
    },
  ];

  return (
    <Wrap>
      <Header title={'Setting'} />
      <div>
        <ItemWrap>
          <SmallTitle padding={'12px 20px'}>개인정보</SmallTitle>
          {ItemList.map((item) =>
            item.type === 'personal' ? (
              <Item
                img={item.img}
                text={item.text}
                key={item.text}
                icon={item.icon}
                onClick={() => navigator(item.navi)}
              />
            ) : null,
          )}
        </ItemWrap>
        <ItemWrap>
          <SmallTitle padding={'12px 20px'}>앱</SmallTitle>
          {ItemList.map((item) =>
            item.type === 'app' ? (
              <Item
                img={item.img}
                text={item.text}
                key={item.text}
                icon={item.icon}
              />
            ) : null,
          )}
        </ItemWrap>
        <ItemWrap>
          <SmallTitle padding={'12px 20px'}>정보</SmallTitle>
          {ItemList.map((item) =>
            item.type === 'info' ? (
              <Item
                img={item.img}
                text={item.text}
                key={item.text}
                icon={item.icon}
              />
            ) : null,
          )}
        </ItemWrap>
      </div>
    </Wrap>
  );
}
export default Setting;
