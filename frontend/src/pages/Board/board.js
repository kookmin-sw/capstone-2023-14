import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import { Block, DetailInfo, Wrap, WriterInfo } from './styles';
import { Small, SubTitle } from '../../components/Fonts/fonts';
import { useNavigate } from 'react-router-dom';
import { FloatingButton } from '../Record/styles';
import axios from 'axios';

function Board() {
  const navigator = useNavigate();
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5001/api/get-boardList',
        );
        setBoardList(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const formatDateString = (dateString) => {
    var year = dateString.substring(0, 4);
    var month = dateString.substring(4, 6);
    var day = dateString.substring(6, 8);

    return `${year}-${month}-${day}`;
  };

  const calculateAge = (birth) => {
    const birthDate = new Date(formatDateString(birth));
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear() + 1;

    return age;
  };

  return (
    <div>
      <Header title={'board'} />
      <Wrap>
        <div>필터 및 검색</div>
        {boardList.map((post) => (
          <Block
            key={post.board_id}
            onClick={() => navigator(`/board/${post.board_id}`)}
          >
            <WriterInfo>
              <img src={''} alt="" />
              <div>
                <SubTitle margin={'0 0 2px'}>{post.writer}</SubTitle>
                <DetailInfo>
                  <Small color={'#7c7c7c'}>{calculateAge(post.birth)}세</Small>
                  <Small color={'#7c7c7c'}>{post.gender}</Small>
                  <Small color={'#EF4E3E'}>{post.mbti}</Small>
                </DetailInfo>
              </div>
            </WriterInfo>
            <div>{post.content}</div>
          </Block>
        ))}
        <FloatingButton onClick={() => navigator('./upload')}>+</FloatingButton>
      </Wrap>
      <Footer />
    </div>
  );
}

export default Board;
