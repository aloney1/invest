import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  background: rgb(121, 198, 224);
  .main {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    width: 300px;
    border: 3px solid black;
    border-radius: 1rem;
    padding: 20px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    background: white;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
  }

  .btn {
    background: #faf2ef;
  }
`;
