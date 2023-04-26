import { StyledTypography } from './styled';

type TypographyProps = {
  text: string;
  fontSize?: number;
  isBold?: boolean;
};

export const Typography: React.VFC<TypographyProps> = ({
  text,
  fontSize,
  isBold,
}) => {
  return (
    <StyledTypography fontSize={fontSize} isBold={isBold}>
      {text}
    </StyledTypography>
  );
};
