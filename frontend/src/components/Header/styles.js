import styled from 'styled-components';

export const Wrap = styled.div`
  position: sticky;
  width: 100%;
  max-width: 480px;
  top: 0;
  z-index: 11;
  background-color: #ffffff;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f1f1f5;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;

  > img:first-child {
    cursor: pointer;
    position: absolute;
    left: 20px;
  }

  > img:last-child {
    cursor: pointer;
    position: absolute;
    right: 20px;
  }
`;
