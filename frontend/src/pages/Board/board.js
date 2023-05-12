import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import React, { useEffect, useState } from 'react';
import { Block, DetailInfo, Wrap, WriterInfo } from './styles';
import { Small, SubTitle } from '../../components/Fonts/fonts';
import { useNavigate } from 'react-router-dom';
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

        const appendAgeList = response.data.map((post) => ({
          ...post,
          age: calculateAge(post.birth),
        }));
        setBoardList(appendAgeList);
      } catch (e) {
        console.log(e);
      }
    };
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

    fetchData();
  }, []);

  return (
    <div>
      <Header title={'board'} />
      <Wrap>
        <div>필터 및 검색</div>
        {boardList.map((post) => (
          <Block
            key={post.board_id}
            onClick={() =>
              navigator(`/board/${post.board_id}`, { state: post })
            }
          >
            <WriterInfo>
              <img src={''} alt="" />
              <div>
                <SubTitle margin={'0 0 2px'}>{post.writer}</SubTitle>
                <DetailInfo>
                  <Small color={'#7c7c7c'}>{post.age}세</Small>
                  <Small color={'#7c7c7c'}>{post.gender}</Small>
                  <Small color={'#EF4E3E'}>{post.mbti}</Small>
                </DetailInfo>
              </div>
            </WriterInfo>
            <div>{post.content}</div>
          </Block>
        ))}
      </Wrap>
      <Footer onClick={() => navigator('./upload')} />
    </div>
  );
}

export default Board;
