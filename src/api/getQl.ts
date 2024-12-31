import request from '@/utils/requestApi';
/*eslint-disable*/
export const getQlData = (data: any) =>
  request({
    url: '',
    method: 'post',
    data: {
      operationName: 'MyQuery',
      variables: null,
      query: data,
    },
  });
