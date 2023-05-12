import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/header';
import { Comment, DetailInfo, Textarea, Wrap, WriterInfo } from './styles';
import { Small, SubTitle } from '../../components/Fonts/fonts';
import axios from 'axios';

function BoardContent() {
  const props = useLocation();
  const [post, setPost] = useState({});
  const [feedComments, setFeedComments] = useState([]);

  useEffect(() => {
    const showPost = () => {
      setPost({ ...props.state });
    };
    const fetchComment = async () => {
      try {
        const response = await axios.post(
          'http://localhost:5001/api/get-replyList',
          {
            board_id: props.state.board_id,
          },
        );
        setFeedComments(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    showPost();
    fetchComment();
  }, []);

  // 전체 채팅을 담는 배열
  // 유저가 입력한 채팅 내용 저장
  const [chat, setChat] = useState({
    userName: 'user',
    comment: '',
  });
  // 메세지 전송
  const SendChatText = () => {
    if (chat.comment === '') return;
    const AllComment = [...feedComments];
    AllComment.push(chat);
    setChat({ userName: 'user', comment: '' });
    setFeedComments(AllComment);
  };

  // 키보드 키 입력 이벤트
  const HandleKeyDown = (e) => {
    // isComposing 이 true 이면 글자 조합 중이므로 동작 막기
    if (e.nativeEvent.isComposing) return;

    // shift + enter 개행
    if (e.key === 'Enter' && e.shiftKey) return;

    // enter 입력
    if (e.key === 'Enter' && !e.shiftKey) {
      SendChatText();
      e.preventDefault();
    }
  };
  // 입력값 변화 시 저장
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setChat({
      ...chat,
      [name]: value,
    });
  };
  return (
    <div>
      <Header title={'board-content'} />
      <Wrap>
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
        <Textarea value={post.content} disabled />
        <div>
          {feedComments.map((comment) => {
            return (
              <div key={comment.reply_id}>
                <span>{comment.replyer}: </span>
                <span>{comment.content}</span>
              </div>
            );
          })}
        </div>
      </Wrap>
      <Comment>
        <div>
          <input
            type="text"
            placeholder="댓글을 남겨보세요."
            onChange={handleOnChange}
            onKeyDown={HandleKeyDown}
            name={'comment'}
            value={chat.comment}
          />
          <button onClick={SendChatText}>전송</button>
        </div>
      </Comment>
    </div>
  );
}

export default BoardContent;
