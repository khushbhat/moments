/**
 * College API Service
 */
import { apiClient, PaginatedResponse } from './client';

export interface CollegeTask {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  type: string;
  status: string;
  due_date?: string;
  priority?: string;
  subject?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface CreateCollegeTaskRequest {
  title: string;
  description?: string;
  type: string;
  status?: string;
  due_date?: string;
  priority?: string;
  subject?: string;
  tags?: string[];
}

export interface UpdateCollegeTaskRequest {
  title?: string;
  description?: string;
  type?: string;
  status?: string;
  due_date?: string;
  priority?: string;
  subject?: string;
  tags?: string[];
}

export const collegeApi = {
  /**
   * Get college tasks with pagination
   */
  getTasks: async (params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<CollegeTask>> => {
    const response = await apiClient.get<PaginatedResponse<CollegeTask>>('/college/tasks', {
      params,
    });
    return response.data;
  },

  /**
   * Get task by ID
   */
  getTask: async (id: string): Promise<CollegeTask> => {
    const response = await apiClient.get<CollegeTask>(`/college/tasks/${id}`);
    return response.data;
  },

  /**
   * Create college task
   */
  createTask: async (data: CreateCollegeTaskRequest): Promise<CollegeTask> => {
    const response = await apiClient.post<CollegeTask>('/college/tasks', data);
    return response.data;
  },

  /**
   * Update college task
   */
  updateTask: async (id: string, data: UpdateCollegeTaskRequest): Promise<CollegeTask> => {
    const response = await apiClient.put<CollegeTask>(`/college/tasks/${id}`, data);
    return response.data;
  },

  /**
   * Delete college task
   */
  deleteTask: async (id: string): Promise<void> => {
    await apiClient.delete(`/college/tasks/${id}`);
  },
};
