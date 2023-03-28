import React from 'react';
import { FullColor } from './styles';

const FullButton = (props) => {
  return <FullColor onClick={props.onClick}>{props.btnName}</FullColor>;
};

export default FullButton;
