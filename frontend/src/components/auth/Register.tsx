import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../services/api';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      await authApi.register(values.username, values.email, values.password);
      message.success('注册成功！请登录');
      navigate('/login');
    } catch (error) {
      message.error('注册失败，请稍后重试！');
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
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱！' },
              { type: 'email', message: '请输入有效的邮箱地址！' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="邮箱"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码！' },
              { min: 6, message: '密码长度至少6位！' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码！' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致！'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="确认密码"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              注册
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Button type="link" onClick={() => navigate('/login')}>
              已有账号？立即登录
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register; 