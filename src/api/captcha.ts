
import { apiClient } from './client';
import { CaptchaAttempt } from '../../types';

/**
 * Captcha API Service
 */
export const captchaApi = {
  /**
   * Fetch a new challenge from the backend
   */
  getChallenge: () => {
    return apiClient.get<{ challengeId: string; images: string[] }>('/captcha/challenge');
  },

  /**
   * Log an attempt to the server for analytics
   */
  logAttempt: (attempt: CaptchaAttempt) => {
    return apiClient.post('/captcha/log', attempt);
  },

  /**
   * Get global pass rates
   */
  getStats: () => {
    return apiClient.get<{ passRate: number }>('/captcha/stats');
  }
};
