import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { JWT_SECRET } from '../config';
import { AuthRequest } from '../middleware/auth.middleware';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // 检查用户是否已存在
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: '用户名或邮箱已被注册' });
    }

    // 创建新用户
    const user = new User({ username, email, password });
    await user.save();

    // 生成 token
    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 查找用户
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }

    // 验证密码
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }

    // 生成 token
    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user?.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    // 验证旧密码
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(401).json({ message: '原密码错误' });
    }

    // 更新密码
    user.password = newPassword;
    await user.save();

    res.json({ message: '密码修改成功' });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

export const getUserInfo = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

export const deleteAccount = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    // 验证密码
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: '密码错误' });
    }

    // 删除用户
    await User.findByIdAndDelete(userId);
    res.json({ message: '账号已成功注销' });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
}; 