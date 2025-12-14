/**
 * Custom hooks for Health API
 */
import { useState, useEffect } from 'react';
import { healthApi, HealthEntry, CreateHealthEntryRequest, UpdateHealthEntryRequest, HealthStats } from '@/api';

export const useHealthEntries = (params?: { date?: string; page?: number; limit?: number }) => {
  const [data, setData] = useState<HealthEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, total_pages: 0 });

  const fetchEntries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await healthApi.getEntries(params);
      setData(response.data);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        total_pages: response.total_pages,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch health entries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [params?.date, params?.page, params?.limit]);

  const createEntry = async (data: CreateHealthEntryRequest) => {
    try {
      const newEntry = await healthApi.createEntry(data);
      setData((prev) => [newEntry, ...prev]);
      return newEntry;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create health entry');
    }
  };

  const updateEntry = async (id: string, data: UpdateHealthEntryRequest) => {
    try {
      const updatedEntry = await healthApi.updateEntry(id, data);
      setData((prev) => prev.map((entry) => (entry.id === id ? updatedEntry : entry)));
      return updatedEntry;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update health entry');
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      await healthApi.deleteEntry(id);
      setData((prev) => prev.filter((entry) => entry.id !== id));
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete health entry');
    }
  };

  return { data, loading, error, pagination, refetch: fetchEntries, createEntry, updateEntry, deleteEntry };
};

export const useHealthStats = (startDate: string, endDate: string) => {
  const [data, setData] = useState<HealthStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const stats = await healthApi.getStats({ start_date: startDate, end_date: endDate });
        setData(stats);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch health statistics');
      } finally {
        setLoading(false);
      }
    };

    if (startDate && endDate) {
      fetchStats();
    }
  }, [startDate, endDate]);

  return { data, loading, error };
};
