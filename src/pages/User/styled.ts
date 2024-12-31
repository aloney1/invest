import styled from '@emotion/styled';

export const Wraper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;

  .top {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .btn {
    background: #faf2ef;
    margin-left: 10px;
  }
`;

export const WithdrawWrapper = styled.div`
  .content {
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
`;
