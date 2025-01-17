import React from 'react';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authApi } from '../../services/api';
import { setCredentials } from '../../store/slices/authSlice';

const { Title } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const data = await authApi.login(values.email, values.password);
      dispatch(setCredentials(data));
      message.success('登录成功！');
      navigate('/dashboard');
    } catch (error) {
      message.error('登录失败，请检查邮箱和密码！');
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
          <Title level={2} style={{ margin: 0, color: '#1890ff' }}>欢迎回来</Title>
          <Typography.Text type="secondary">请登录您的账号</Typography.Text>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱！' },
              { type: 'email', message: '请输入有效的邮箱地址！' },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
              placeholder="邮箱"
              style={{ borderRadius: '6px', height: '45px' }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#1890ff' }} />}
              placeholder="密码"
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
              登录
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Button 
              type="link" 
              onClick={() => navigate('/register')}
              style={{ fontSize: '14px' }}
            >
              还没有账号？立即注册
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login; 