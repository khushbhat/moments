/**
 * Custom hooks for Journal API
 */
import { useState, useEffect } from 'react';
import { journalApi, JournalEntry, CreateJournalEntryRequest, UpdateJournalEntryRequest } from '@/api';

export const useJournalEntries = (params?: {
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
}) => {
  const [data, setData] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, total_pages: 0 });

  const fetchEntries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await journalApi.getEntries(params);
      setData(response.data);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        total_pages: response.total_pages,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch journal entries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [params?.start_date, params?.end_date, params?.page, params?.limit]);

  const createEntry = async (data: CreateJournalEntryRequest) => {
    try {
      const newEntry = await journalApi.createEntry(data);
      setData((prev) => [newEntry, ...prev]);
      return newEntry;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create journal entry');
    }
  };

  const updateEntry = async (id: string, data: UpdateJournalEntryRequest) => {
    try {
      const updatedEntry = await journalApi.updateEntry(id, data);
      setData((prev) => prev.map((entry) => (entry.id === id ? updatedEntry : entry)));
      return updatedEntry;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update journal entry');
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      await journalApi.deleteEntry(id);
      setData((prev) => prev.filter((entry) => entry.id !== id));
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete journal entry');
    }
  };

  return { data, loading, error, pagination, refetch: fetchEntries, createEntry, updateEntry, deleteEntry };
};
