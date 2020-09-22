import React, { useState, useEffect } from 'react';
import { Table, Button, Message, Dialog, Field, Input, Box, Icon } from '@alifd/next';
import styles from './index.module.scss';
import { getRepo, deleteRepo, editRepo, addRepo, Repo } from '@/apis/lambda';
import { useRequest } from 'ice';

export default function Home() {
  const { data, loading, request } = useRequest(() => getRepo());
  const [dialogVisible, setDialogVisible] = useState(false);
  const [action, setAction] = useState<'add' | 'edit'>('add');
  const [currentRepo, setCurrentRepo] = useState<Partial<Repo>>({});

  useEffect(() => {
    request();
  }, []);

  const handleAdd = async (repo: Repo) => {
    const { method } = await addRepo(repo);
    await request();
    Message.success(`新增 ${repo.name} 成功，HTTP Method: ${method}`);
  };

  const handleDelete = async (id: number, name: string) => {
    const { method } = await deleteRepo(id);
    await request();
    Message.success(`删除 ${name} 成功，HTTP Method: ${method}`);
  };

  const handleEdit = async (repo: Repo) => {
    const { method } = await editRepo(repo);
    await request();
    Message.success(`更新 ${repo.name} 成功，HTTP Method: ${method}`);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setCurrentRepo({});
  };

  const field = Field.useField();
  const { init, getValues } = field;

  return (
    <div className={styles.container}>
      <Box margin={[0, 0, 16, 0]} direction="row" justify="space-between" align="center">
        <span className={styles.title}>Midway Hooks CRUD Example</span>
        <Button
          type="primary"
          onClick={() => {
            setAction('add');
            setDialogVisible(true);
          }}
        >
          <Icon type="add" />
          新增
        </Button>
      </Box>
      <Table loading={loading} dataSource={data?.dataSource}>
        <Table.Column title="ID" dataIndex="id" />
        <Table.Column title="名称" dataIndex="name" />
        <Table.Column title="描述" dataIndex="description" />
        <Table.Column
          title="操作"
          cell={(value, index, record: Repo) => (
            <Box direction="row" spacing={12} justify="center" align="center">
              <Button
                type="primary"
                onClick={() => {
                  setAction('edit');
                  setCurrentRepo(record);
                  setDialogVisible(true);
                }}
              >
                <Icon type="edit" />
                修改
              </Button>
              <Button onClick={() => handleDelete(record.id, record.name)}>
                <Icon type="ashbin" />
                删除
              </Button>
            </Box>
          )}
        />
      </Table>

      <Dialog
        title={action === 'add' ? '新增内容' : '修改内容'}
        visible={dialogVisible}
        onOk={async () => {
          const values: Repo = getValues();
          const repo: Repo = {
            id: currentRepo.id,
            ...values
          };

          const func = action === 'add' ? handleAdd : handleEdit;
          await func(repo);
          closeDialog();
        }}
        onCancel={closeDialog}
        onClose={closeDialog}
      >
        <Box spacing={16} style={{ width: 500 }}>
          <Input {...init('name', { initValue: currentRepo.name })} label="名称" style={{ width: 500 }} />
          <Input {...init('description', { initValue: currentRepo.description })} label="描述" style={{ width: 500 }} />
        </Box>
      </Dialog>
    </div>
  );
}
