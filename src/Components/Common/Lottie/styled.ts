import styled, { css } from 'styled-components';

export type LottieSizeProps = 'small' | 'medium' | 'large';

export type LottieProps = {
  size?: LottieSizeProps;
};

const lottieSizeChanger = (size?: LottieSizeProps) => {
  switch (size) {
    case 'small':
      return css`
        height: 120px;
      `;
    case 'medium':
      return css`
        height: 150px;
      `;
    case 'large':
      return css`
        height: 300px;
      `;
    default:
      return css`
        height: 170px;
      `;
  }
};

export const StyledLottie = styled.div<LottieProps>`
  ${({ size }) => {
    return lottieSizeChanger(size);
  }}
  :hover {
    cursor: pointer;
  }
`;
