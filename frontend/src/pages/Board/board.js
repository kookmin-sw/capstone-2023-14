import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import React, { useEffect, useState } from 'react';
import { Block, DetailInfo, SearchWrap, Wrap, WriterInfo } from './styles';
import { Normal, Small, SubTitle } from '../../components/Fonts/fonts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Board() {
  const navigator = useNavigate();
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/get-boardList');

        const appendAgeList = response.data.map((post) => ({
          ...post,
          age: post.birth ? calculateAge(post.birth) : '??',
        }));
        setBoardList(appendAgeList);
      } catch (e) {
        console.log(e);
      }
    };
    const formatDateString = (dateString) => {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);

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

  // 검색어 저장 변수
  const [searchWord, setSearchWord] = useState('');

  // user가 검색한 조건에 맞는 게시글 필터링
  const FilterContents = boardList
    .filter((data) => {
      // 검색한 값이 작성자, 게시글 내용, MBTI과 일치하는 경우 해당 데이터 필터링하여 리턴
      if (
        data.writer.toString().toLowerCase().includes(searchWord) ||
        data.content.toString().toLowerCase().includes(searchWord) ||
        data.mbti.toString().toLowerCase().includes(searchWord) ||
        data.writer.toString().toUpperCase().includes(searchWord) ||
        data.content.toString().toUpperCase().includes(searchWord) ||
        data.mbti.toString().toUpperCase().includes(searchWord)
      ) {
        return data;
      }
    })
    .map((post, idx) => {
      return (
        <Block
          key={post.board_id}
          onClick={() => navigator(`/board/${post.board_id}`, { state: post })}
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
      );
    });

  return (
    <div>
      <Header title={'board'} />
      <Wrap>
        <SearchWrap>
          <input
            type={'text'}
            placeholder={
              '검색어를 입력하세요. 실시간으로 게시글을 확인 할 수 있습니다. :)'
            }
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </SearchWrap>
        {/* 검색어가 없을경우 전체 데이터 보여주기, 입력 값이 있을경우 해당하는 데이터 보여주기 */}
        {FilterContents.length === 0 ? (
          <>
            <Normal color={'#7c7c7c'}>
              검색하신 조건에 맞는 게시글이 없어요 :(
            </Normal>
            <Normal color={'#7c7c7c'}> 다른 검색어로 다시 시도해주세요.</Normal>
          </>
        ) : searchWord !== '' ? (
          FilterContents
        ) : (
          boardList.map((post) => (
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
          ))
        )}
      </Wrap>
      <Footer onClick={() => navigator('./upload')} />
    </div>
  );
}

export default Board;
