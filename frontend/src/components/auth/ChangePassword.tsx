import React from 'react';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authApi } from '../../services/api';
import { logout } from '../../store/slices/authSlice';

const { Title } = Typography;

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values: {
    oldPassword: string;
    newPassword: string;
  }) => {
    try {
      await authApi.changePassword(values.oldPassword, values.newPassword);
      message.success('密码修改成功！请重新登录');
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      message.error('密码修改失败，请检查原密码是否正确！');
    }
  };

  return (
    <div style={{ 
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
      padding: '20px',
      overflow: 'hidden'
    }}>
      <Card 
        style={{ 
          width: '100%',
          maxWidth: 400,
          borderRadius: '15px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          background: 'rgba(255, 255, 255, 0.95)'
        }}
        bordered={false}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Title level={2} style={{ margin: 0, color: '#1890ff' }}>修改密码</Title>
          <Typography.Text type="secondary">请输入您的新密码</Typography.Text>
        </div>

        <Form
          form={form}
          name="changePassword"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="oldPassword"
            rules={[{ required: true, message: '请输入原密码！' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#1890ff' }} />}
              placeholder="原密码"
              style={{ borderRadius: '6px', height: '45px' }}
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: '请输入新密码！' },
              { min: 6, message: '密码长度至少6位！' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#1890ff' }} />}
              placeholder="新密码"
              style={{ borderRadius: '6px', height: '45px' }}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: '请确认新密码！' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致！'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#1890ff' }} />}
              placeholder="确认新密码"
              style={{ borderRadius: '6px', height: '45px' }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: '12px' }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              block
              style={{ 
                height: '45px', 
                borderRadius: '6px',
                fontSize: '16px',
                background: 'linear-gradient(to right, #1890ff, #36cfc9)'
              }}
            >
              确认修改
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Button 
              type="link" 
              onClick={() => navigate('/dashboard')}
              style={{ fontSize: '14px' }}
            >
              返回仪表板
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePassword; 