import { Button, Input } from 'antd';
import { Wraper } from './styled';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { ContractAddresses } from '@/config/addresses';
import { poolABI } from '@/modules/abis/Pool';
import { toast } from 'react-toastify';
import { useState } from 'react';

const MarketPage = () => {
  const chainId = useChainId();
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [inputs, setInputs] = useState<any>(['']);
  const { data: walletClient } = useWalletClient();
  const addUser = async () => {
    if (inputs.length === 0) {
      toast.warn('请输入有效地址!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 300,
      });

      return;
    }
    try {
      if (walletClient) {
        console.log('inputs', inputs);
        const { request } = await publicClient.simulateContract({
          account: address,
          address: ContractAddresses[chainId].pool,
          abi: poolABI,
          functionName: 'addUser',
          args: [inputs],
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
  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };
  const handleAddInput = () => {
    setInputs([...inputs, '']);
  };

  const handleRemoveInput = (index: any) => {
    const newInputs = inputs.filter((_: any, i: number) => i !== index);
    setInputs(newInputs);
  };

  return (
    <Wraper>
      <div className="content">
        {inputs.map((input: any, index: number) => (
          <div key={index} className="item">
            <Input
              value={input}
              onChange={e => handleInputChange(index, e.target.value)}
              placeholder="请输入用户地址"
            />
            <Button onClick={handleAddInput} disabled={!input}>
              添加
            </Button>
            <Button onClick={() => handleRemoveInput(index)} disabled={inputs.length === 1}>
              移除
            </Button>
          </div>
        ))}

        {address ? (
          <Button onClick={addUser} className="btn">
            添加用户
          </Button>
        ) : (
          <ConnectButton showBalance={false} label="链接钱包" />
        )}
      </div>
    </Wraper>
  );
};

export default MarketPage;
