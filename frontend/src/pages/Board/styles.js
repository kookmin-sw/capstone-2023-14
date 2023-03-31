import styled from 'styled-components';

export const Wrap = styled.div`
  padding: 20px 24px 60px;

  @media screen and (max-width: 400px) {
    padding: 0 20px;
  }
`;

export const Block = styled.div`
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  padding: 24px 20px;
  margin-bottom: 12px;
  cursor: pointer;

  :hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    transition: all 0.5s ease;
  }
`;

export const WriterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;

  > img {
    width: 36px;
    height: 36px;
    border-radius: 70%;
  }
`;

export const DetailInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
