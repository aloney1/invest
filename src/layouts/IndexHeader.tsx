import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wrapper } from './IndexHeader.styled';
import { useLocation } from 'react-router-dom';
import { MenuListInit } from '@/config/common';

const IndexHeader = () => {
  const location = useLocation();
  console.log(location);
  const currentMenu = MenuListInit.find(item => item.url === location.pathname);
  console.log(currentMenu);
  return (
    <Wrapper>
      <div className="title">管理系统</div>
      <div className="right">
        <div>{currentMenu?.name ? currentMenu?.name : ''}</div>
        <ConnectButton showBalance={false} label="链接钱包" />
      </div>
    </Wrapper>
  );
};

export default IndexHeader;
