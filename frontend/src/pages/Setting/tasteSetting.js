import React, { useState } from 'react';
import Taste from '../../components/Taste/taste';
import { AddOptionModal, TasteWrap, Wrap } from './styles';
import Header from '../../components/Header/header';

function TasteSetting() {
  const [addOptionModal, setAddOptionModal] = useState(false);

  const AddOption = (e) => {
    const tag = e.target.tagName;
    if (tag === 'LABEL') {
      console.log(e.target.children);
    } else if (tag === 'INPUT') {
      console.log(e.target.value);
    }
  };

  return (
    <TasteWrap>
      <Header title={'taste'} onClick={() => setAddOptionModal(true)} />
      <Wrap taste>
        <Taste setting />
      </Wrap>
      {addOptionModal ? (
        <AddOptionModal>
          <div>
            <div>
              <div>type</div>
              <div>
                <label onClick={AddOption}>
                  <input type={'radio'} name={'addOption'} value={'style'} />
                  스타일
                </label>
                <label htmlFor={'addOption'} onClick={AddOption}>
                  <input type={'radio'} name={'addOption'} value={'object'} />
                  목적
                </label>
              </div>
              <input type={'text'} />
            </div>
            <div>
              <button>추가</button>
              <button onClick={() => setAddOptionModal(false)}>취소</button>
            </div>
          </div>
        </AddOptionModal>
      ) : null}
    </TasteWrap>
  );
}
export default TasteSetting;
