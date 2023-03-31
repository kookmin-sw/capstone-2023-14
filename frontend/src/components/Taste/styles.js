import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  ${(props) =>
    props.title
      ? 'align-items: flex-end; margin: 20px 0;'
      : 'flex-wrap: wrap; gap: 8px 12px; margin-bottom: 20px;'};

  > span {
    padding: 2px 16px;
    border: 1.5px solid #7c7c7c;
    border-radius: 24px;
  }
`;
export const ButtonWrap = styled.div`
  ${(props) =>
    props.setting ? 'position: absolute; bottom: 0; width: 100%;' : null}
`;
