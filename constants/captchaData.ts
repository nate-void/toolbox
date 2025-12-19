
import { CaptchaChallenge } from '../types';

export const CAPTCHA_CHALLENGES: CaptchaChallenge[] = [
  {
    id: '1',
    topic: { 'zh-CN': '大山', 'en-US': 'Mountains' },
    instruction: { 'zh-CN': '选择所有包含山峰的图片', 'en-US': 'Select all images containing mountain peaks' },
    images: [
      { id: '1-1', url: 'https://picsum.photos/seed/mt1/300/300', isCorrect: true },
      { id: '1-2', url: 'https://picsum.photos/seed/city1/300/300', isCorrect: false },
      { id: '1-3', url: 'https://picsum.photos/seed/mt2/300/300', isCorrect: true },
      { id: '1-4', url: 'https://picsum.photos/seed/car1/300/300', isCorrect: false },
      { id: '1-5', url: 'https://picsum.photos/seed/mt3/300/300', isCorrect: true },
      { id: '1-6', url: 'https://picsum.photos/seed/beach1/300/300', isCorrect: false },
      { id: '1-7', url: 'https://picsum.photos/seed/mt4/300/300', isCorrect: true },
      { id: '1-8', url: 'https://picsum.photos/seed/forest1/300/300', isCorrect: false },
      { id: '1-9', url: 'https://picsum.photos/seed/city2/300/300', isCorrect: false },
    ]
  },
  {
    id: '2',
    topic: { 'zh-CN': '鲜花', 'en-US': 'Flowers' },
    instruction: { 'zh-CN': '选择所有正在盛开的花朵', 'en-US': 'Select all images showing blooming flowers' },
    images: [
      { id: '2-1', url: 'https://picsum.photos/seed/f1/300/300', isCorrect: true },
      { id: '2-2', url: 'https://picsum.photos/seed/f2/300/300', isCorrect: true },
      { id: '2-3', url: 'https://picsum.photos/seed/f3/300/300', isCorrect: true },
      { id: '2-4', url: 'https://picsum.photos/seed/d1/300/300', isCorrect: false },
      { id: '2-5', url: 'https://picsum.photos/seed/f4/300/300', isCorrect: true },
      { id: '2-6', url: 'https://picsum.photos/seed/d2/300/300', isCorrect: false },
      { id: '2-7', url: 'https://picsum.photos/seed/f5/300/300', isCorrect: true },
      { id: '2-8', url: 'https://picsum.photos/seed/d3/300/300', isCorrect: false },
      { id: '2-9', url: 'https://picsum.photos/seed/d4/300/300', isCorrect: false },
    ]
  }
];
