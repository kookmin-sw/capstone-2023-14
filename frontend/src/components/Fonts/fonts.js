import styled from 'styled-components';

const DefaultFontStyle = styled.div`
  margin: ${(props) => (props.margin ? props.margin : null)};
  padding: ${(props) => (props.padding ? props.padding : null)};
  font-weight: ${(props) => (props.weight ? props.weight : null)};
  text-align: ${(props) => (props.align ? props.align : null)};
  cursor: ${(props) => (props.cursor ? props.cursor : null)};
`;

export const Title = styled(DefaultFontStyle)`
  font-size: 18px;
  font-weight: 700;
`;

export const SubTitle = styled(DefaultFontStyle)`
  font-size: 16px;
  font-weight: 700;
`;

export const Normal = styled(DefaultFontStyle)`
  font-size: 16px;
`;

export const Small = styled(DefaultFontStyle)`
  font-size: 12px;
`;
