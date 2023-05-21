import React from 'react';
import { InputWrap } from './styles';
import { SubTitle } from '../Fonts/fonts';

const InputBox = (props) => {
  return (
    <InputWrap small={props.small} disabled={props.disabled}>
      <SubTitle>{props.title}</SubTitle>
      <input
        name={props.name}
        onClick={props.onClick}
        type={props.type || 'text'}
        placeholder={props.disabled ? null : props.title + '을 입력해주세요 '}
        onChange={props.onChange}
        value={props.value}
        disabled={props.disabled}
      />
      {props.addSpan ? <span>{props.addSpan}</span> : null}
    </InputWrap>
  );
};
export default InputBox;
