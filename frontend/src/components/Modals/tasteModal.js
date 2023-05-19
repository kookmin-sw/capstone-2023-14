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
          <SubTitle line={'1.5em'}>추천을 위한 취향 정보가 없습니다.</SubTitle>
          <SubTitle line={'1.5em'}>
            취향 정보를 먼저 저장하시겠습니까 ?
          </SubTitle>
          <div>
            <button onClick={() => navigator('/setting/taste')}>
              취향정보 설정하기
            </button>
            <button onClick={() => props.setTasteModal(false)}>
              나중에 설정하기
            </button>
          </div>
        </TasteWrap>
      </div>
    </Wrap>
  );
};

export default TasteModal;
