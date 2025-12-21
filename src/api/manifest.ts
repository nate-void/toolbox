
import { apiClient } from './client';
import { ToolManifest } from '../../types';

/**
 * Manifest Service
 * Responsible for checking the latest available versions of tools
 */
export const manifestApi = {
  /**
   * Fetches the central manifest for all tools
   * Simulates an API call to a version registry
   */
  getLatestManifest: async (): Promise<ToolManifest> => {
    // In a real app: return apiClient.get<ToolManifest>('/registry/manifest');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          'captcha': { latestVersion: 'v1.0.5', criticalUpdate: false },
          'theme': { latestVersion: 'v2.1.0', criticalUpdate: false },
        });
      }, 500);
    });
  }
};
