import styled from '@emotion/styled';

export const StyledGameWrap = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`;

export const StyledHeaderWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

export const StyledPlayerParagraph = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 10px;
`;

export const StyledCommentsWrap = styled.div`
  height: calc(100vh - 300px);
  width: 200px;
  border: solid 1px #000;
  border-radius: 10px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: scroll;
`;
