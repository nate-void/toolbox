
import { AppConfig } from '../../types';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';

export const appConfig: AppConfig = {
  name: 'Toolbox',
  version: 'v0.1.0',
  githubUrl: 'https://github.com/nate-void/toolbox',
  apiBaseUrl: 'https://api.example.com/v1',
  animation: {
    enabled: true,
    staggerDelay: 0.1,
    duration: 0.4,
    type: 'spring'
  },
  tools: [
    { 
      id: 'captcha', 
      name: '九宫格验证码', 
      path: '/captcha', 
      icon: ShieldRoundedIcon, // Changed from GridView to Shield for consistency
      version: 'v0.1.0', 
      color: 'bg-indigo-500', 
      description: '旨在通过自动化代理的 3x3 图像选择验证工具。',
      actionLabel: ''
    }
  ]
};
