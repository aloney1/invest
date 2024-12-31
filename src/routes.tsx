import { Navigate, type RouteObject } from 'react-router-dom';
import Layout from './layouts';
import IndexPage from './pages/Index/index.tsx';
import UserPage from './pages/User/index.tsx';
import SeniorPage from './pages/Senior/index.tsx';
import RoundPage from './pages/Round/index.tsx';
import RolePage from './pages/Roles/index.tsx';

const routes: RouteObject[] = [
  {
    path: '/invest',
    element: <IndexPage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/invest" />,
      },
      {
        path: '/users',
        element: <Navigate to="/users/user_list" />,
      },
      {
        path: '/users/user_list',
        element: <UserPage />,
      },
      {
        path: '/users/role_list',
        element: <RolePage />,
      },
      {
        path: '/senior',
        element: <SeniorPage />,
      },
      {
        path: '/round',
        element: <RoundPage />,
      },
    ],
  },
];

export default routes;
