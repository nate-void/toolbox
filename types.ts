
export type Theme = 'light' | 'dark';
export type Language = 'en' | 'zh';

export interface CaptchaAttempt {
  id: string;
  timestamp: number;
  success: boolean;
  timeTaken: number;
}

export interface ToolDefinition {
  id: string;
  name: string;
  path: string;
  icon: any;
  version: string;
  color: string;
  description: string;
  lastUpdated?: string;
  actionLabel?: string;
}

export interface AnimationConfig {
  enabled: boolean;
  staggerDelay: number;
  duration: number;
  type: 'spring' | 'tween';
}

export interface AppConfig {
  name: string;
  version: string;
  githubUrl: string;
  apiBaseUrl: string;
  tools: ToolDefinition[];
  animation: AnimationConfig;
}

export interface TranslationStrings {
  home: string;
  captcha: string;
  settings: string;
  about: string;
  passRate: string;
  history: string;
  startChallenge: string;
  welcome: string;
  description: string;
  success: string;
  failed: string;
  verify: string;
  cancel: string;
  selectTarget: string;
  notifications: string;
  markRead: string;
  noNotifications: string;
  searchPlaceholder: string;
  collectionHeader: string;
  launchApp: string;
  comingSoon: string;
  comingSoonDesc: string;
  captchaName: string;
  captchaDesc: string;
  howItWorks: string;
  howItWorksDesc: string;
  analytics: string;
  analyticsDesc: string;
  basedOnAttempts: string;
  noRecords: string;
  noToolsFound: string;
}

export interface ToolManifest {
  [toolId: string]: {
    latestVersion: string;
    criticalUpdate: boolean;
  };
}
