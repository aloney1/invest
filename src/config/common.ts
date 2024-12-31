import { MenuListType } from './data';

export const decimalsToUnix = (decimals?: number) => {
  switch (decimals) {
    case 3:
      return 'kwei';
    case 6:
      return 'mwei';
    case 9:
      return 'gwei';
    case 12:
      return 'microether';
    case 18:
      return 'ether';
    default:
      return 'ether';
  }
};

export const MenuListInit: MenuListType[] = [
  {
    key: 'users',
    index: 0,
    name: '用户管理',
    url: '/users',
  },
  {
    key: 'user_list',
    index: 1,
    name: '用户列表',
    url: '/users/user_list',
  },
  {
    key: 'role_list',
    index: 2,
    name: '角色列表',
    url: '/users/role_list',
  },
  {
    key: 'round',
    index: 3,
    name: '轮次管理',
    url: '/round',
  },
];
