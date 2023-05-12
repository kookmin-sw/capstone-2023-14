import React from 'react';

import { Wrap } from './styles';
import { useNavigate } from 'react-router-dom';

const TasteModal = () => {
  const navigator = useNavigate();
  return (
    <Wrap padding>
      <div>
        <div>추천을 위한 취향 정보가 없습니다.</div>
        <div> 취향 정보를 먼저 저장하시겠습니까 ?</div>
        <div>
          <button onClick={() => navigator('/taste')}>취향정보 설정하기</button>
          <button>나중에 설정하기</button>
        </div>
      </div>
    </Wrap>
  );
};

export default TasteModal;
