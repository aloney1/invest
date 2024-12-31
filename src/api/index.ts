import request from '../utils/request';

export function getAllTvl() {
  return request({
    url: '/ito/sum/tvl',
    method: 'get',
  });
}
