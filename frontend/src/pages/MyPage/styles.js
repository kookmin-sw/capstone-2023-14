import styled from 'styled-components';

export const Wrap = styled.div`
  margin: 0 auto;
  position: relative;
  padding: 0 24px 60px;

  @media screen and (max-width: 400px) {
    padding: 0 20px;
  }
  > div {
    margin-bottom: 20px;
  }
`;

export const ImgWrap = styled.div`
  width: fit-content;
  position: relative;
  text-align: center;
  margin: auto;
  padding: 20px 0;

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
      bottom: 20px;
      right: 0;
    }
  }
`;

export const RowAlign = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  > div:first-child {
    flex: 0 1 110px;
  }

  span {
    padding: 2px 16px;
    border: 1.5px solid #7c7c7c;
    border-radius: 24px;
    margin-right: 8px;
  }
`;
