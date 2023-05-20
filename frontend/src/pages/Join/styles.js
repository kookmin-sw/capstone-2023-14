import styled from 'styled-components';

export const Wrap = styled.div`
  position: relative;
  padding: 20px 24px 60px;

  > input {
    display: none;
  }

  @media screen and (max-width: 400px) {
    padding: 20px 20px 40px;
  }
`;

export const ImgWrap = styled.div`
  position: relative;
  text-align: center;

  > label {
    display: inline-flex;
    position: relative;
  }

  img {
    object-fit: cover;
    cursor: pointer;

    :first-child {
      width: 120px;
      height: 120px;
      border-radius: 70%;
      border: 2px solid #d9d9d9;
      box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
    }
    :last-child {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
`;

export const BlockWrap = styled.div`
  margin-bottom: 40px;
  > div:not(:last-child) {
    margin-bottom: 12px;
  }
`;
export const GenderWrap = styled.div`
  display: flex;
  gap: 12px;
`;

export const TermsWrap = styled.div`
  border-top: 2px solid #e0e0e0;
  padding-top: 20px;
  margin-bottom: 60px;

  > div {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    :first-child {
      margin-bottom: 16px;
    }
    :nth-child(2) {
      margin-bottom: 4px;
    }
  }
`;

export const GenderButton = styled.div`
  flex: 1 1 50%;
  text-align: center;
  border: ${(props) =>
    props.checked ? '2px solid #ef4e3e' : '2px solid #e0e0e0'};
  border-radius: 30px;
  padding: 12px 15px;
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
  font-family: 'SEBANG-Gothic', serif;
`;

export const InfoWrap = styled.div`
  input {
    text-align: center;
    background-color: #ffffff;
    width: -webkit-fill-available;
    border: 2px solid #e0e0e0;
    border-radius: 30px;
    padding: 12px 15px;
    font-weight: 400;
    font-size: 16px;
    padding: 12px 15px;
    font-family: 'SEBANG-Gothic', serif;

    :hover,
    :focus-visible {
      border: 2px solid #ef4e3e;
      outline: none;
      transition: 0.5s ease;
    }
  }
`;

export const Row = styled.div`
  font-family: 'SEBANG-Gothic', serif;
  display: flex;
  gap: ${(props) => (props.gap ? props.gap : null)};
  justify-content: ${(props) => (props.justify ? props.justify : null)};
  margin: ${(props) => (props.margin ? props.margin : null)};
`;
