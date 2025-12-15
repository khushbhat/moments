/**
 * Custom hooks for Calendar API
 */
import { useState, useEffect } from 'react';
import { calendarApi, CalendarEvent, CreateEventRequest, UpdateEventRequest } from '@/api';

export const useCalendarEvents = (params?: {
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
}) => {
  const [data, setData] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, total_pages: 0 });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await calendarApi.getEvents(params);
      setData(response.data);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        total_pages: response.total_pages,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch calendar events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [params?.start_date, params?.end_date, params?.page, params?.limit]);

  const createEvent = async (data: CreateEventRequest) => {
    try {
      const newEvent = await calendarApi.createEvent(data);
      setData((prev) => [newEvent, ...prev]);
      return newEvent;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create calendar event');
    }
  };

  const updateEvent = async (id: string, data: UpdateEventRequest) => {
    try {
      const updatedEvent = await calendarApi.updateEvent(id, data);
      setData((prev) => prev.map((event) => (event.id === id ? updatedEvent : event)));
      return updatedEvent;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update calendar event');
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await calendarApi.deleteEvent(id);
      setData((prev) => prev.filter((event) => event.id !== id));
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete calendar event');
    }
  };

  return { data, loading, error, pagination, refetch: fetchEvents, createEvent, updateEvent, deleteEvent };
};
