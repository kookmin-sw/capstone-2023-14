import styled from 'styled-components';

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > div {
    font-weight: 600;
    font-size: 16px;
    color: #141414;
    margin-bottom: 10px;
  }

  > input {
    border: 2px solid #e0e0e0;
    border-radius: 30px;
    font-weight: 400;
    ${(props) =>
      props.small
        ? 'font-size: 14px; padding: 8px 12px;'
        : 'font-size: 18px; padding: 12px 15px;'}

    :hover,
    :focus-visible {
      border: ${(props) => (props.disabled ? null : '2px solid #ef4e3e')};
      outline: none;
      transition: 0.2s ease;
    }
  }
`;
