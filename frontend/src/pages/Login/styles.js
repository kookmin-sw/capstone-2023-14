import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  gap: ${(props) => (props.gap ? props.gap : null)};
  justify-content: ${(props) => (props.justify ? props.justify : null)};
  margin: ${(props) => (props.margin ? props.margin : null)};
`;

export const Wrap = styled.div`
  position: relative;
  height: 100vh;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div:first-child {
    width: 100%;
    text-align: center;
    margin-bottom: 60px;
  }

  > div > img {
    width: 200px;
    height: 200px;
  }

  @media screen and (max-width: 400px) {
    padding: 0 20px;
  }
`;

export const BlockWrap = styled.div`
  > div:first-child {
    margin-bottom: 12px;
  }
`;
export const ButtonWrap = styled(BlockWrap)``;
