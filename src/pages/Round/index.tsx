/*eslint-disable*/
import { Button, Input } from 'antd';
import { Wraper } from './styled';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { ContractAddresses } from '@/config/addresses';
import { poolABI } from '@/modules/abis/Pool';
import { toast } from 'react-toastify';
import { useState } from 'react';

const RoundPage = () => {
  const chainId = useChainId();
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const { data: walletClient } = useWalletClient();
  const addUser = async () => {
    const args1 = [BigInt(input1.trim())];
    if (!args1) {
      toast.warn('请输入Role C3 IDs!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 300,
      });
      return;
    }
    const args2 = [BigInt(input2.trim())];
    if (!args1) {
      toast.warn('请输入Role C2 IDs!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 300,
      });
      return;
    }
    const args3 = [BigInt(input3.trim())];
    if (!args1) {
      toast.warn('请输入Role C1 IDs!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 300,
      });
      return;
    }

    const args4 = input4
      .split(',')
      .slice(0, 4)
      .map(num => BigInt(num.trim()));

    if (args4.length !== 3) {
      toast.warn('Role B IDs (comma separated) 必须有 3 个元素!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 300,
      });
      return;
    }

    const args5 = input5
      .split(',')
      .slice(0, 9)
      .map(num => BigInt(num.trim()));

    if (args5.length !== 9) {
      toast.warn('Role A IDs (comma separated) 必须有 9 个元素!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 300,
      });
      return;
    }

    try {
      if (walletClient) {
        const { request } = await publicClient.simulateContract({
          account: address,
          address: ContractAddresses[chainId].pool,
          abi: poolABI,
          functionName: 'startNewRound',
          args: [args1, args2, args3, args4, args5],
        });
        const txid = await walletClient.writeContract(request);
        await publicClient.waitForTransactionReceipt({ hash: txid });
        toast.success('操作成功 !', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 300,
        });
      }
    } catch (error) {
      console.log('Error:', error);
      toast.warn('操作失败!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 300,
      });
    }
  };
  const handleInputChange = (index: any, value: any) => {
    if (index === '1') {
      setInput1(value);
    } else if (index === '2') {
      setInput2(value);
    } else if (index === '3') {
      setInput3(value);
    } else if (index === '4') {
      setInput4(value);
    } else if (index === '5') {
      setInput5(value);
    }
  };

  return (
    <Wraper>
      <div className="content">
        <Input
          value={input1}
          onChange={e => handleInputChange('1', e.target.value)}
          placeholder="C3角色ID"
        />
        <Input
          value={input2}
          onChange={e => handleInputChange('2', e.target.value)}
          placeholder="C2角色IDs"
        />
        <Input
          value={input3}
          onChange={e => handleInputChange('3', e.target.value)}
          placeholder="C1角色ID"
        />
        <Input
          value={input4}
          onChange={e => handleInputChange('4', e.target.value)}
          placeholder="B角色ID数组(需3个ID,例如: 1,2,3)"
        />
        <Input
          value={input5}
          onChange={e => handleInputChange('5', e.target.value)}
          placeholder="A角色ID数组(需9个ID,例如: 1,2,3...)"
        />

        {address ? (
          <Button onClick={addUser} className="btn">
            开启新一轮
          </Button>
        ) : (
          <ConnectButton showBalance={false} label="链接钱包" />
        )}
      </div>
    </Wraper>
  );
};

export default RoundPage;
