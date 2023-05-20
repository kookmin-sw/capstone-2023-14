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
    font-family: 'SEBANG-Gothic', serif;
    ${(props) =>
      props.small
        ? 'font-size: 12px; padding: 8px 12px;'
        : 'font-size: 16px; padding: 12px 15px;'}

    @media screen and (max-width: 400px) {
      ${(props) => (props.small ? null : 'padding: 8px 12px;')}
    }

    :hover,
    :focus-visible {
      border: ${(props) => (props.disabled ? null : '2px solid #ef4e3e')};
      outline: none;
      transition: 0.2s ease;
    }
  }

  > span {
    margin: 4px 0;
    color: #7c7c7c;
  }
`;
