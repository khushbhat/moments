/**
 * Custom hooks for Daily Summary API
 */
import { useState, useEffect } from 'react';
import { dailyApi, DailySummary } from '@/api';

export const useDailySummary = (date?: string) => {
  const [data, setData] = useState<DailySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const summary = await dailyApi.getSummary(date);
      setData(summary);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch daily summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [date]);

  return { data, loading, error, refetch: fetchSummary };
};
