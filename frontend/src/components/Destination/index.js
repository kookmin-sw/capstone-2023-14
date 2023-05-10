import React from 'react';
import * as styled from './styles';

function Destination(props) {
  return (
    <styled.Container onClick={props.onClick}>
      <styled.destinationImg src={props.imgUrl} alt={props.title} />
      <styled.destinationTitle>{props.title}</styled.destinationTitle>
      <styled.destinationBottom>{props.contents}</styled.destinationBottom>
    </styled.Container>
  );
}
export default Destination;
