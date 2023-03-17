import React from 'react';
import { StrokeColor } from './styles';

function StrokeButton(props) {
  return <StrokeColor onClick={props.onClick}>{props.btnName}</StrokeColor>;
}

export default StrokeButton;
