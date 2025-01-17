import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, MONGODB_URI } from './config';
import authRoutes from './routes/auth.routes';

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/auth', authRoutes);

// 数据库连接
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('数据库连接成功');
    // 启动服务器
    app.listen(PORT, () => {
      console.log(`服务器运行在 http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('数据库连接失败:', error);
    process.exit(1);
  }); 