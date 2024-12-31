/*eslint-disable*/
import { Button, Input, Modal, Pagination, Table } from 'antd';
import { Wraper } from './styled';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { ContractAddresses } from '@/config/addresses';
import { poolABI } from '@/modules/abis/Pool';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { WithdrawWrapper } from '../User/styled';

const RolePage = () => {
  const chainId = useChainId();
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [inputs, setInputs] = useState<any>(['']);
  const { data: walletClient } = useWalletClient();
  const [list, setList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {}, [searchVal]);

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

  const searchClick = async (e: any) => {
    const regex = /^[1-9]\d*$/;
    if (e && !regex.test(e)) {
      toast.warn('Please Enter a valid Pool ID !', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    setPageIndex(1);
    setSearchVal(e);
  };

  const columns: ColumnsType = [
    {
      title: 'Pool ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Type',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'TVL(USD)',
      dataIndex: 'tvl',
      key: 'tvl',
      width: 100,
    },
  ];

  return (
    <Wraper>
      <div className="top">
        <Input.Search
          allowClear
          placeholder="Pool ID"
          onSearch={searchClick}
          style={{ width: '120px' }}
        />
        <Button
          onClick={() => {
            if (!address) {
              toast.warn('请先链接钱包 !', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 300,
              });
              return;
            }
            setVisible(true);
          }}
          className="btn"
        >
          添加
        </Button>
      </div>
      <div className="tableList">
        <Table
          className="dashboard_table"
          columns={columns}
          dataSource={list}
          locale={{ emptyText: 'No Data' }}
          scroll={{ x: 1045 }}
          rowKey={(record: any) => {
            return record.tokenId;
          }}
          pagination={false}
          bordered={false}
        />
        {list.length > 0 && (
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <Pagination
              current={pageIndex}
              onChange={e => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setPageIndex(e);
                setList([]);
              }}
              total={0}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
      <Modal
        open={visible}
        closeIcon={false}
        centered
        okText="确认"
        cancelText="取消"
        onOk={addUser}
        maskClosable={false}
        onCancel={() => {
          setVisible(false);
          setInputs(['']);
        }}
      >
        <WithdrawWrapper>
          <div className="content">
            {inputs.map((input: any, index: number) => (
              <div key={index} className="item">
                <Input
                  value={input}
                  onChange={e => handleInputChange(index, e.target.value)}
                  placeholder="用户地址"
                />
                <Button onClick={handleAddInput} disabled={!input}>
                  添加
                </Button>
                <Button onClick={() => handleRemoveInput(index)} disabled={inputs.length === 1}>
                  移除
                </Button>
              </div>
            ))}
          </div>
        </WithdrawWrapper>
      </Modal>
    </Wraper>
  );
};

export default RolePage;
