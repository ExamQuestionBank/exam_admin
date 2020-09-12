import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message,Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { getSingleTests,deleteSingleTests } from './service';
import CreateUpdateSlide from './components/CreateUpdateSlide';



/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  let result = false
  try {
    const ids = selectedRows.map((row) => row.id)
    const res = await deleteSingleTests(ids);
    if (res.status !== 'error') {
      hide();
      message.success('删除成功，即将刷新');
      result =  true;
    }
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
  }
  return result
};


const TableList: React.FC<{}> = () => {
  const [slideVisible,setCreateUpdateSlideVisible] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '试题编号',
      dataIndex: 'id',
    },
    {
      title: '校对状态',
      dataIndex: 'checked',
      render: tag => (
        tag === 1 ? <Tag color="success">通过</Tag>:<Tag color="warning">待定</Tag>
      ),
    },
    {
      title: '试题板块',
      dataIndex: 'section',
    },
    {
      title: '考试科目',
      dataIndex: 'subject',
    },
    {
      title: '试题出处',
      dataIndex: 'testFrom',
    },
    {
      title: '出题年份',
      dataIndex: 'testYear',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setCurrentRecord(record)
              setCreateUpdateSlideVisible(true);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a onClick={async () => {
            const res = await handleRemove([record]);
            if (res){
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          } }>删除</a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => {
            setCurrentRecord({})
            setCreateUpdateSlideVisible(true);
          }}>
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      const res = await handleRemove(selectedRows);
                      if (res) {
                        action.reload();
                      }
                    }
                  }}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={() => (false)}
        request={(params, sorter, filter) => getSingleTests({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{}}
      />
      {currentRecord && <CreateUpdateSlide
        visible={slideVisible}
        onClose={(update:boolean) => {
          setCreateUpdateSlideVisible(false)
          setCurrentRecord(null)
          if (actionRef.current) {
            if (update) {
             actionRef.current.reload();
            }
          }
        }}
        record={currentRecord}
      />}
    </PageHeaderWrapper>
  );
};

export default TableList;
