/**
 * Health API Service
 */
import { apiClient, PaginatedResponse } from './client';

export interface HealthEntry {
  id: string;
  user_id: string;
  date: string;
  water: number;  // glasses of water
  steps: number;
  calories?: number;
  meals: string[];
  meal_types: string[];
  cycle?: string;  // Moon phase: new, waxing, full, waning
  period_day?: number;
  bath: boolean;
  face_wash: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateHealthEntryRequest {
  date: string;
  water?: number;
  steps?: number;
  calories?: number;
  meals?: string[];
  meal_types?: string[];
  cycle?: string;
  period_day?: number;
  bath?: boolean;
  face_wash?: boolean;
  notes?: string;
}

export interface UpdateHealthEntryRequest {
  water?: number;
  steps?: number;
  calories?: number;
  meals?: string[];
  meal_types?: string[];
  cycle?: string;
  period_day?: number;
  bath?: boolean;
  face_wash?: boolean;
  notes?: string;
}

export interface HealthStats {
  period: string;
  avg_water: number;
  avg_steps: number;
  avg_calories?: number;
  total_days: number;
  streak: number;
}

export const healthApi = {
  /**
   * Get health entries with pagination
   */
  getEntries: async (params?: {
    date?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<HealthEntry>> => {
    const response = await apiClient.get<PaginatedResponse<HealthEntry>>('/health/entries', {
      params,
    });
    return response.data;
  },

  /**
   * Get health entry by ID
   */
  getEntry: async (id: string): Promise<HealthEntry> => {
    const response = await apiClient.get<HealthEntry>(`/health/entries/${id}`);
    return response.data;
  },

  /**
   * Create health entry
   */
  createEntry: async (data: CreateHealthEntryRequest): Promise<HealthEntry> => {
    const response = await apiClient.post<HealthEntry>('/health/entries', data);
    return response.data;
  },

  /**
   * Update health entry
   */
  updateEntry: async (id: string, data: UpdateHealthEntryRequest): Promise<HealthEntry> => {
    const response = await apiClient.put<HealthEntry>(`/health/entries/${id}`, data);
    return response.data;
  },

  /**
   * Delete health entry
   */
  deleteEntry: async (id: string): Promise<void> => {
    await apiClient.delete(`/health/entries/${id}`);
  },

  /**
   * Get health statistics
   */
  getStats: async (params: { start_date: string; end_date: string }): Promise<HealthStats> => {
    const response = await apiClient.get<HealthStats>('/health/stats', { params });
    return response.data;
  },
};
