import { StyledTypography } from './styled';

type TypographyProps = {
  text: string;
  fontSize?: number;
  isBold?: boolean;
  isError?: boolean;
};

export const Typography: React.VFC<TypographyProps> = ({
  text,
  fontSize,
  isBold,
  isError,
}) => {
  return (
    <StyledTypography fontSize={fontSize} isBold={isBold} isError={isError}>
      {text}
    </StyledTypography>
  );
};
