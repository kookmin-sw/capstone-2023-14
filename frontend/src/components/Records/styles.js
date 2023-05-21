import styled from 'styled-components';

export const RecordWrap = styled.div`
  display: flex;
  padding: 14px 16px;
  gap: 12px;
  border: 1px solid #ebebeb;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin-bottom: 16px;
  cursor: pointer;
  position: relative;

  :hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    transition: all 0.5s ease;
  }

  img {
    width: 18px;
  }

  > img {
    width: 64px;
    height: 64px;
  }

  > div:last-child {
    position: absolute;
    right: 20px;
  }
`;
