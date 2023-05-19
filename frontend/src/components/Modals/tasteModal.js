import React from 'react';

import { TasteWrap, Wrap } from './styles';
import { useNavigate } from 'react-router-dom';
import { SubTitle } from '../Fonts/fonts';

const TasteModal = (props) => {
  const navigator = useNavigate();
  return (
    <Wrap padding>
      <div>
        <TasteWrap>
          <SubTitle line={'1.5em'}>
            추천을 위한 취향 정보가 완성되지 않았어요 :(
          </SubTitle>
          <SubTitle line={'1.5em'}>취향 정보를 먼저 저장해주세요.</SubTitle>
          <div>
            <button onClick={() => navigator('/setting/taste')}>
              지금 저장할래요 !
            </button>
            <button onClick={() => props.setTasteModal(false)}>
              나중에 설정할래요..
            </button>
          </div>
        </TasteWrap>
      </div>
    </Wrap>
  );
};

export default TasteModal;
