
import { appConfig } from '../config/appConfig';

/**
 * Modern API Client Wrapper
 * Handles authentication, base URL, and error interceptors
 */
export const apiClient = {
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${appConfig.apiBaseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, { ...options, headers });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(error.message || `Request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[API Error]:', error);
      throw error;
    }
  },

  // Use apiClient.request instead of this.request to resolve typing issues with generic parameters in object literals
  get<T>(endpoint: string) {
    return apiClient.request<T>(endpoint, { method: 'GET' });
  },

  // Use apiClient.request instead of this.request to resolve typing issues with generic parameters in object literals
  post<T>(endpoint: string, body: any) {
    return apiClient.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
};
