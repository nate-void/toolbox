
import React from 'react';

export type Language = 'zh-CN' | 'en-US';

export interface LocalizedString {
  'zh-CN': string;
  'en-US': string;
}

export interface CaptchaImage {
  id: string;
  url: string;
  isCorrect: boolean;
}

export interface CaptchaChallenge {
  id: string;
  topic: LocalizedString;
  instruction: LocalizedString;
  images: CaptchaImage[];
}

export type Theme = 'light' | 'dark';

export interface Tool {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  icon: React.ReactNode;
  path: string;
}
