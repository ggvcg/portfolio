import React, { useState } from 'react';
import { Layout, Menu, Button, Typography, Modal, Form, Input, message, Card, Tag, Space, Avatar, Statistic, Row, Col, Divider } from 'antd';
import {
  UserOutlined,
  ProjectOutlined,
  DeleteOutlined,
  LockOutlined,
  ChromeOutlined,
  PlayCircleOutlined,
  MailOutlined,
  CodeOutlined,
  StarOutlined,
  ForkOutlined,
  DownloadOutlined,
  FileOutlined,
  BranchesOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store';
import { authApi } from '../services/api';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const projects = [
  {
    id: 1,
    name: 'VIP视频解析工具',
    description: '一个功能强大的VIP视频解析工具，支持主流视频网站的VIP视频在线解析和播放。',
    features: [
      '支持多个主流视频网站',
      '多个解析线路，智能切换',
      '历史记录管理',
      '智能缓存机制',
      '自动更新功能'
    ],
    technologies: ['Python', 'Tkinter', '多线程'],
    icon: <PlayCircleOutlined style={{ fontSize: '24px' }} />,
    stats: {
      files: 15,
      commits: 28,
      downloads: 0
    },
    downloadUrl: '/downloads/vip-video-parser-v1.0.0.exe',
    lastUpdate: '2024-01-16'
  },
  {
    id: 2,
    name: '轻量级浏览器',
    description: '基于Python开发的简洁、高效的轻量级浏览器，专注于提供流畅的网页浏览体验。',
    features: [
      '多标签页支持',
      '书签管理',
      '历史记录',
      '地址栏搜索',
      '性能优化'
    ],
    technologies: ['Python', '浏览器内核', '缓存系统'],
    icon: <ChromeOutlined style={{ fontSize: '24px' }} />,
    stats: {
      files: 12,
      commits: 20,
      downloads: 0
    },
    downloadUrl: '/downloads/light-browser-v1.0.0.exe',
    lastUpdate: '2024-01-15'
  }
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('1');
  const [form] = Form.useForm();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteAccount = async (values: { password: string }) => {
    try {
      await authApi.deleteAccount(values.password);
      message.success('账号已成功注销');
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      message.error('注销失败，请检查密码是否正确');
    }
  };

  const renderContent = () => {
    if (selectedMenu === '1') {
      return (
        <div>
          <Card bordered={false} className="user-info-card">
            <Row gutter={24} align="middle">
              <Col>
                <Avatar size={100} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
              </Col>
              <Col flex="1">
                <Title level={3} style={{ marginBottom: 8 }}>欢迎回来，{user?.username}！</Title>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">
                    <MailOutlined style={{ marginRight: 8 }} />
                    {user?.email}
                  </Text>
                  <Text type="secondary">
                    <CodeOutlined style={{ marginRight: 8 }} />
                    开发者
                  </Text>
                </Space>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={8}>
                <Statistic title="项目数量" value={2} prefix={<ProjectOutlined />} />
              </Col>
              <Col span={8}>
                <Statistic title="获得星标" value={217} prefix={<StarOutlined />} />
              </Col>
              <Col span={8}>
                <Statistic title="项目被Fork" value={77} prefix={<ForkOutlined />} />
              </Col>
            </Row>
          </Card>
        </div>
      );
    } else {
      return (
        <div>
          <div style={{ marginBottom: 24 }}>
            <Title level={3}>我的项目</Title>
            <Text type="secondary">展示我的开源项目和个人作品</Text>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
            {projects.map(project => (
              <Card
                key={project.id}
                hoverable
                className="project-card"
                cover={
                  <div style={{ 
                    height: 160, 
                    background: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {React.cloneElement(project.icon, { style: { fontSize: '48px', color: '#fff' } })}
                  </div>
                }
              >
                <Card.Meta
                  title={<Space>{project.name}</Space>}
                  description={project.description}
                />
                <Divider />
                <div style={{ marginBottom: '16px' }}>
                  <Title level={5}>主要功能：</Title>
                  <ul style={{ paddingLeft: '20px' }}>
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div>
                    {project.technologies.map((tech, index) => (
                      <Tag key={index} color="blue" style={{ margin: '4px' }}>
                        {tech}
                      </Tag>
                    ))}
                  </div>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Statistic 
                        title="文件数量" 
                        value={project.stats.files} 
                        prefix={<FileOutlined />}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic 
                        title="提交次数" 
                        value={project.stats.commits} 
                        prefix={<BranchesOutlined />}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic 
                        title="下载次数" 
                        value={project.stats.downloads} 
                        prefix={<DownloadOutlined />}
                      />
                    </Col>
                  </Row>
                  <Button 
                    type="primary" 
                    icon={<DownloadOutlined />} 
                    block
                    onClick={() => window.location.href = project.downloadUrl}
                  >
                    下载安装包
                  </Button>
                  <div style={{ textAlign: 'right' }}>
                    <Text type="secondary">最后更新：{project.lastUpdate}</Text>
                  </div>
                </Space>
              </Card>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        padding: '0 24px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        background: 'linear-gradient(120deg, #1890ff 0%, #36cfc9 100%)'
      }}>
        <Title level={4} style={{ color: 'white', margin: 0 }}>
          个人项目展示
        </Title>
        <Space>
          <Button type="link" onClick={() => navigate('/change-password')} style={{ color: 'white' }}>
            修改密码
          </Button>
          <Button type="link" onClick={showDeleteModal} style={{ color: 'white' }}>
            注销账号
          </Button>
          <Button type="link" onClick={handleLogout} style={{ color: 'white' }}>
            退出登录
          </Button>
        </Space>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            selectedKeys={[selectedMenu]}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: '个人信息'
              },
              {
                key: '2',
                icon: <ProjectOutlined />,
                label: '我的项目'
              }
            ]}
            onClick={({ key }) => setSelectedMenu(key)}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              overflowY: 'auto'
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>

      <Modal
        title={
          <Space style={{ color: '#ff4d4f' }}>
            <DeleteOutlined />
            注销账号
          </Space>
        }
        open={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleDeleteAccount} layout="vertical">
          <div style={{ 
            marginBottom: '20px', 
            padding: '12px',
            background: '#fff2f0',
            border: '1px solid #ffccc7',
            borderRadius: '4px',
            color: '#ff4d4f'
          }}>
            警告：账号注销后将无法恢复，请谨慎操作！
          </div>
          <Form.Item
            name="password"
            label="请输入密码确认"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入您的密码"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" danger htmlType="submit" block>
              确认注销账号
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Dashboard;