import React from 'react';
import Taste from '../../components/Taste/taste';
import { TasteWrap, Wrap } from './styles';
import Header from '../../components/Header/header';

function TasteSetting() {
  return (
    <TasteWrap>
      <Header title={'취향설정'} />
      <Wrap taste>
        <Taste setting />
      </Wrap>
    </TasteWrap>
  );
}
export default TasteSetting;
