import { Button, Input } from 'antd';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { ContractAddresses } from '@/config/addresses';
import { poolABI } from '@/modules/abis/Pool';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Wrapper } from './index.styled';
import Header from '@/layouts/Header';
import { tokenABI } from '@/modules/abis/Token';

const IndexPage = () => {
  const chainId = useChainId();
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [input, setInput] = useState<any>('');
  const { data: walletClient } = useWalletClient();

  const handleApprove = async () => {
    if (address && walletClient) {
      const res: any = await publicClient.readContract({
        address: ContractAddresses[chainId].pool,
        abi: poolABI,
        functionName: 'price',
      });
      console.log(res);
      const { request } = await publicClient.simulateContract({
        account: address,
        address: ContractAddresses[chainId].usdt,
        abi: tokenABI,
        functionName: 'approve',
        args: [ContractAddresses[chainId].pool, res],
      });
      const txid = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: txid });
    }
  };

  const Invest = async () => {
    if (!input) {
      toast.warn('请输入有效地址!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 300,
      });
      return;
    }
    try {
      if (walletClient) {
        await handleApprove();
        console.log('inputs', input);
        const { request } = await publicClient.simulateContract({
          account: address,
          address: ContractAddresses[chainId].pool,
          abi: poolABI,
          functionName: 'invest',
          args: [input],
        });
        const txid = await walletClient.writeContract(request);
        await publicClient.waitForTransactionReceipt({ hash: txid });
        toast.success('操作成功 !', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 300,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (value: any) => {
    setInput(value);
  };

  return (
    <Wrapper>
      <Header />
      <div className="main">
        <div className="content">
          <Input
            value={input}
            onChange={e => handleInputChange(e.target.value)}
            placeholder="邀请人地址"
          />

          {address ? (
            <Button onClick={Invest} className="btn">
              投资
            </Button>
          ) : (
            <ConnectButton showBalance={false} label="链接钱包" />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default IndexPage;
