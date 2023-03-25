import React from 'react';
import { StrokeColor } from './styles';

const StrokeButton = (props) => {
  return <StrokeColor onClick={props.onClick}>{props.btnName}</StrokeColor>;
};

export default StrokeButton;
