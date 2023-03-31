import styled from 'styled-components';

const DefaultFontStyle = styled.div`
  margin: ${(props) => (props.margin ? props.margin : null)};
  padding: ${(props) => (props.padding ? props.padding : null)};
  font-size: ${(props) => (props.size ? props.size : null)};
  font-weight: ${(props) => (props.weight ? props.weight : null)};
  text-align: ${(props) => (props.align ? props.align : null)};
  cursor: ${(props) => (props.cursor ? props.cursor : null)};
  color: ${(props) => (props.color ? props.color : null)};
`;

export const Title = styled(DefaultFontStyle)`
  font-size: ${(props) => (props.size ? props.size : '18px')};
  font-weight: 700;
`;

export const SubTitle = styled(DefaultFontStyle)`
  font-size: 16px;
  font-weight: 700;
`;

export const SmallTitle = styled(DefaultFontStyle)`
  font-size: 14px;
  font-weight: 700;
`;

export const Normal = styled(DefaultFontStyle)`
  font-size: 16px;
`;

export const Small = styled(DefaultFontStyle)`
  font-size: 12px;
`;
