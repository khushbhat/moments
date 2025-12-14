/**
 * Custom hooks for College API
 */
import { useState, useEffect } from 'react';
import { collegeApi, CollegeTask, CreateCollegeTaskRequest, UpdateCollegeTaskRequest } from '@/api';

export const useCollegeTasks = (params?: { status?: string; page?: number; limit?: number }) => {
  const [data, setData] = useState<CollegeTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, total_pages: 0 });

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await collegeApi.getTasks(params);
      setData(response.data);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        total_pages: response.total_pages,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch college tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [params?.status, params?.page, params?.limit]);

  const createTask = async (data: CreateCollegeTaskRequest) => {
    try {
      const newTask = await collegeApi.createTask(data);
      setData((prev) => [newTask, ...prev]);
      return newTask;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create college task');
    }
  };

  const updateTask = async (id: string, data: UpdateCollegeTaskRequest) => {
    try {
      const updatedTask = await collegeApi.updateTask(id, data);
      setData((prev) => prev.map((task) => (task.id === id ? updatedTask : task)));
      return updatedTask;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update college task');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await collegeApi.deleteTask(id);
      setData((prev) => prev.filter((task) => task.id !== id));
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete college task');
    }
  };

  return { data, loading, error, pagination, refetch: fetchTasks, createTask, updateTask, deleteTask };
};
