import styled from 'styled-components';

export const Wrap = styled.div`
  margin: 0 auto;
  position: relative;
  padding: 0 24px;

  @media screen and (max-width: 400px) {
    padding: 0 20px;
  }
`;
export const Title = styled.h2`
  margin-bottom: 4px;
`;
export const List = styled.ul`
  list-style: none;
  padding-left: 0;
  ${
    '' /* box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px; */
  }
  border-radius: 10px;
  padding: 10px;
`;

export const Item = styled.li`
  display: flex;
  padding: 10px;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  border-radius: 10px;
  overflow-y: auto;

  > div {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 70%;
    overflow: hidden;
    margin-right: 10px;
  }

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  > span {
    padding-left: 5px;
    color: #bdbebd;
  }
`;
