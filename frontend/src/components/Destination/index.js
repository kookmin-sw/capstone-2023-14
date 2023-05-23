import React from 'react';
import * as styled from './styles';
import { Normal, Title } from '../Fonts/fonts';

function Destination(props) {
  return (
    <styled.Container onClick={props.onClick}>
      <styled.destinationImg src={props.imgUrl} alt={props.title} />
      <styled.destinationTitle>
        <Title size={'32px'}>{props.title}</Title>
      </styled.destinationTitle>
      <styled.destinationBottom>
        <Normal color={'#ffffff'} size={'12px'}>
          {props.contents}
        </Normal>
      </styled.destinationBottom>
    </styled.Container>
  );
}
export default Destination;
