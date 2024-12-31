/*eslint-disable*/
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wrapper } from './Header.styled';

const Header = () => {
  return (
    <Wrapper>
      <ConnectButton showBalance={false} label="链接钱包" />
    </Wrapper>
  );
};

export default Header;
