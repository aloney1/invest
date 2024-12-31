import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  font-family: PoetsenOne;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  .title {
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.88);
  }

  .right {
    flex: 1;
    color: rgb(51, 54, 57);
    padding: 0 20px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: rgb(198, 198, 198) 1px 1px 6px;
  }
`;
