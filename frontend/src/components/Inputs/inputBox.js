import React from 'react';
import { InputWrap } from './styles';

function InputBox(props) {
  return (
    <InputWrap>
      <div>{props.title}</div>
      <input
        name={props.name}
        onClick={props.onClick}
        type={props.type || 'text'}
        placeholder={props.title + '을 입력해주세요 '}
        onChange={props.onChange}
        value={props.value}
      />
    </InputWrap>
  );
}
export default InputBox;
