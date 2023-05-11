import React from 'react';
import Header from '../../components/Header/header';
import { DetailInfo, Textarea, Wrap, WriterInfo } from './styles';
import { Small, SubTitle } from '../../components/Fonts/fonts';
import { useNavigate } from 'react-router-dom';

function BoardUpload() {
  const navigator = useNavigate();

  const uploadContent = () => {
    alert('게시글이 작성되었습니다.\n게시판으로 이동합니다.');
    navigator('/board');
  };

  return (
    <div>
      <Header title={'board-upload'} onClick={uploadContent} />
      <Wrap>
        <WriterInfo>
          <img src={''} />
          <div>
            <SubTitle margin={'0 0 2px'}>username</SubTitle>
            <DetailInfo>
              <Small color={'#7c7c7c'}>age세</Small>
              <Small color={'#7c7c7c'}>gender</Small>
              <Small color={'#EF4E3E'}>mbti</Small>
            </DetailInfo>
          </div>
        </WriterInfo>
        <Textarea
          placeholder={
            '이런 글은 작성하실 수 없어요.\n' +
            '타인의 권리를 침해하거나 불쾌감을 주는 글 \n' +
            '범죄, 불법 행위 등 법령을 위반하는 글 \n' +
            '광고/홍보 목적의 글 \n' +
            '정치/사회에 대한 의견 및 가치관을 드러내는 글 '
          }
        />
      </Wrap>
    </div>
  );
}

export default BoardUpload;