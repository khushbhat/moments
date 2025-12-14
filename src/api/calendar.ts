/**
 * Calendar API Service
 */
import { apiClient, PaginatedResponse } from './client';

export interface CalendarEvent {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  all_day: boolean;
  category?: string;
  color?: string;
  location?: string;
  reminder_minutes?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateEventRequest {
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  all_day?: boolean;
  category?: string;
  color?: string;
  location?: string;
  reminder_minutes?: number;
}

export interface UpdateEventRequest {
  title?: string;
  description?: string;
  start_time?: string;
  end_time?: string;
  all_day?: boolean;
  category?: string;
  color?: string;
  location?: string;
  reminder_minutes?: number;
}

export const calendarApi = {
  /**
   * Get calendar events with pagination
   */
  getEvents: async (params?: {
    start_date?: string;
    end_date?: string;
    view?: 'month' | 'day' | 'hour';
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<CalendarEvent>> => {
    const response = await apiClient.get<PaginatedResponse<CalendarEvent>>('/calendar/events', {
      params,
    });
    return response.data;
  },

  /**
   * Get event by ID
   */
  getEvent: async (id: string): Promise<CalendarEvent> => {
    const response = await apiClient.get<CalendarEvent>(`/calendar/events/${id}`);
    return response.data;
  },

  /**
   * Create calendar event
   */
  createEvent: async (data: CreateEventRequest): Promise<CalendarEvent> => {
    const response = await apiClient.post<CalendarEvent>('/calendar/events', data);
    return response.data;
  },

  /**
   * Update calendar event
   */
  updateEvent: async (id: string, data: UpdateEventRequest): Promise<CalendarEvent> => {
    const response = await apiClient.put<CalendarEvent>(`/calendar/events/${id}`, data);
    return response.data;
  },

  /**
   * Delete calendar event
   */
  deleteEvent: async (id: string): Promise<void> => {
    await apiClient.delete(`/calendar/events/${id}`);
  },
};
