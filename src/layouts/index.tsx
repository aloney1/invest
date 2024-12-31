/*eslint-disable*/
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Global } from '@emotion/react';
import { useChainId } from 'wagmi';
import { HttpLink } from '@apollo/client';
import styled from '@emotion/styled';
import { useStore } from '@/store/store';
import { CHAIN_ID_KEY } from '@/config/constants.ts';
import { apolloClient } from '@/modules/graphql/apollo';
import { GRAPHQL_BASE_URL, SEP_GRAPHQL_BASE_URL } from '@/config';
import IndexHeader from './IndexHeader';
import { PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Menu as AntdMenu, MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'users',
    label: '用户管理',
    icon: <UserOutlined />,
    children: [
      { key: '/users/user_list', label: '用户列表' },
      { key: '/users/role_list', label: '角色列表' },
    ],
  },
  { key: '/round', icon: <PieChartOutlined />, label: '轮次管理' },
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  .bottom {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .ant-menu-root {
      width: 200px;
      height: calc(100vh - 64px);
    }
  }
`;

const LayoutContent = styled.div`
  height: calc(100vh - 64px);
  flex: 1;
`;

const Layout = () => {
  const chainID = useChainId();
  const refresh = useStore(state => state.refresh);
  const updateRefresh = useStore(state => state.updateRefresh);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(CHAIN_ID_KEY, chainID.toString());
    apolloClient.setLink(
      new HttpLink({
        uri: chainID === 42161 ? GRAPHQL_BASE_URL : SEP_GRAPHQL_BASE_URL,
      })
    );

    updateRefresh();
  }, [chainID, updateRefresh]);

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key);
  };

  return (
    <Wrapper>
      <IndexHeader />
      <div className="bottom">
        <AntdMenu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
        <LayoutContent>
          <Outlet key={`refresh_${refresh}`} />
        </LayoutContent>
      </div>
      <Global
        styles={{
          body: {
            margin: 0,
          },
        }}
      />
    </Wrapper>
  );
};

export default Layout;
