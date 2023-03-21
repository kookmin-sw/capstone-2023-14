import React from 'react';
import * as styled from './styles';

function Destination(props) {
  return (
    <styled.Container onClick={props.onClick}>
      <styled.destinationImg src={props.imgUrl} alt={props.title} />
      <styled.destinationTitle>{props.title}</styled.destinationTitle>
      <styled.destinationBottom>
        <span>함께하면 좋은 '{props.companion}' 외 몇 명 </span>
      </styled.destinationBottom>
    </styled.Container>
  );
}
export default Destination;
