import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';


export default (): React.ReactNode => (
  <PageHeaderWrapper>
    <Card>
      <h1 style={{
        textAlign: 'center',
        marginTop: 150,
        marginBottom: 150,
        fontSize: '60px',
      }}>Welcome 试题君</h1>
    </Card>
  </PageHeaderWrapper>
);
