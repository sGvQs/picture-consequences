import lottie from 'lottie-web';
import React from 'react';
import { StyledLottie, LottieSizeProps } from './styled';

type LottieProps = {
  path: string;
  onClick: () => void;
  size?: LottieSizeProps;
};

export const Lottie: React.FC<LottieProps> = ({ path, size, onClick }) => {
  const [containerEl, setContainerEl] = React.useState<HTMLDivElement | null>();

  React.useMemo(() => {
    if (!containerEl) {
      return null;
    }

    return lottie.loadAnimation({
      container: containerEl, // アニメーションを追加する要素
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: path,
    });
  }, [containerEl]);

  const handleRef = React.useCallback(
    (el: React.SetStateAction<HTMLDivElement | null | undefined>) => {
      if (el) {
        setContainerEl(el);
      }
    },
    [setContainerEl]
  );

  return (
    <>
      <StyledLottie
        onClick={onClick}
        ref={handleRef}
        size={size}
      ></StyledLottie>
    </>
  );
};
