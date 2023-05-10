import { StyledTypography } from './styled';

type TypographyProps = {
  text: string;
  fontSize?: number;
  isBold?: boolean;
  isError?: boolean;
  isCorrect?: boolean;
};

export const Typography: React.VFC<TypographyProps> = ({
  text,
  fontSize,
  isBold,
  isError,
  isCorrect,
}) => {
  return (
    <StyledTypography
      fontSize={fontSize}
      isBold={isBold}
      isError={isError}
      isCorrect={isCorrect}
    >
      {text}
    </StyledTypography>
  );
};
