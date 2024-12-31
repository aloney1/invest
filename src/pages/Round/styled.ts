import styled from '@emotion/styled';

export const Wraper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .tips {
    font-size: 14px;
    color: #9da4b2;
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
