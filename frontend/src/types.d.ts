declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

interface Window {
  // 如果需要添加全局的 window 属性
}

// Redux 状态类型
interface RootState {
  auth: {
    user: {
      id?: string;
      username?: string;
      email?: string;
    } | null;
    token: string | null;
    isAuthenticated: boolean;
  };
} 