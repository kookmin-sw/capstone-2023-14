import React from 'react';
import { FullColor } from './styles';

function FullButton(props) {
  return <FullColor onClick={props.onClick}>{props.btnName}</FullColor>;
}

export default FullButton;
