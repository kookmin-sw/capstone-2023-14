import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/header';
import {
  Comment,
  CommentsWrap,
  DetailInfo,
  Textarea,
  Wrap,
  WriterInfo,
} from './styles';
import { Small, SubTitle } from '../../components/Fonts/fonts';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { email } from '../../store/userInfo';

function BoardContent() {
  const props = useLocation();
  const [post, setPost] = useState({});
  const [feedComments, setFeedComments] = useState([]);
  const userEmail = useRecoilValue(email);

  const [chat, setChat] = useState({
    board_id: -1,
    email: userEmail,
    content: '',
  });

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.post('/api/get-replyList', {
        board_id: props.state.board_id,
      });
      setFeedComments(response.data);
    } catch (e) {
      console.log(e);
    }
  }, [props.state.board_id]);

  useEffect(() => {
    setPost({ ...props.state });
    setChat((chat) => ({ ...chat, board_id: props.state.board_id }));
    fetchComments();
  }, [props.state, fetchComments]);

  const sendChatText = useCallback(async () => {
    if (chat.content === '') return;

    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const chatToBeSent = {
      ...chat,
      upload_time: now,
      update_time: now,
    };

    try {
      await axios.post('/api/reply-write', chatToBeSent);
      setChat((chat) => ({ ...chat, content: '' }));
      fetchComments();
    } catch (e) {
      console.log(e);
    }
  }, [chat, fetchComments]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.nativeEvent.isComposing) return;
      if (e.key === 'Enter' && e.shiftKey) return;
      if (e.key === 'Enter' && !e.shiftKey) {
        sendChatText();
        e.preventDefault();
      }
    },
    [sendChatText],
  );

  const handleOnChange = useCallback((e) => {
    setChat((chat) => ({ ...chat, content: e.target.value }));
  }, []);

  return (
    <div>
      <Header title={'board-content'} />
      <Wrap>
        <WriterInfo>
          {post.profile ? (
            <img src={`data:image/jpeg;base64,${post.profile}`} alt="" />
          ) : (
            <img
              src={'https://cdn-icons-png.flaticon.com/256/44/44463.png'}
              alt=""
            />
          )}
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
        <CommentsWrap>
          {feedComments.map((comment) => (
            <div key={comment.reply_id}>
              {comment.profile ? (
                <img
                  src={`data:image/jpeg;base64,${comment.profile}`}
                  alt={''}
                />
              ) : (
                <img
                  src={'https://cdn-icons-png.flaticon.com/256/44/44463.png'}
                  alt=""
                />
              )}
              <div>
                <span>{comment.name} </span>
                <div>{comment.content}</div>
              </div>
            </div>
          ))}
        </CommentsWrap>
      </Wrap>
      <Comment>
        <div>
          <input
            type="text"
            placeholder="댓글을 남겨보세요."
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
            name={'comment'}
            value={chat.content}
          />
          <button onClick={sendChatText}>전송</button>
        </div>
      </Comment>
    </div>
  );
}

export default BoardContent;
