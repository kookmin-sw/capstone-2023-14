import styled from 'styled-components';

const DefaultSetting = styled.div`
  border-radius: 30px;
  padding: 10px;
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  @media screen and (max-width: 400px) {
    padding: 8px;
    font-size: 18px;
  }
`;

export const FullColor = styled(DefaultSetting)`
  background: #ef4e3e;
  color: #ffffff;
  margin-bottom: 12px;
`;

export const StrokeColor = styled(DefaultSetting)`
  border: 2px solid #ef4e3e;
  color: #000000;
`;
