import styled from 'styled-components';

interface TypographyProps extends React.HTMLProps<HTMLParagraphElement> {
  fontSize?: number;
  isBold?: boolean;
  isError?: boolean;
  isCorrect?: boolean;
}

export const StyledTypography = styled.p<TypographyProps>`
  font-family: 'Franklin Gothic Medium', Arial, sans-serif;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '16')}px;
  font-weight: ${(props) => (props.isBold ? 'bold' : 'normal')};
  color: ${(props) =>
    props.isError ? 'red' : props.isCorrect ? 'green' : '#000'};
`;
