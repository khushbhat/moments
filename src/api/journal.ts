/**
 * Journal API Service
 */
import { apiClient, PaginatedResponse } from './client';

export interface JournalEntry {
  id: string;
  user_id: string;
  title: string;
  content: string;
  date: string;
  cover_image?: string;
  images: string[];
  mood?: string;
  tags: string[];
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateJournalEntryRequest {
  title: string;
  content: string;
  date?: string;
  cover_image?: string;
  images?: string[];
  mood?: string;
  tags?: string[];
  is_private?: boolean;
}

export interface UpdateJournalEntryRequest {
  title?: string;
  content?: string;
  cover_image?: string;
  images?: string[];
  mood?: string;
  tags?: string[];
  is_private?: boolean;
}

export const journalApi = {
  /**
   * Get journal entries with pagination
   */
  getEntries: async (params?: {
    start_date?: string;
    end_date?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<JournalEntry>> => {
    const response = await apiClient.get<PaginatedResponse<JournalEntry>>('/journal/entries', {
      params,
    });
    return response.data;
  },

  /**
   * Get journal entry by ID
   */
  getEntry: async (id: string): Promise<JournalEntry> => {
    const response = await apiClient.get<JournalEntry>(`/journal/entries/${id}`);
    return response.data;
  },

  /**
   * Create journal entry
   */
  createEntry: async (data: CreateJournalEntryRequest): Promise<JournalEntry> => {
    const response = await apiClient.post<JournalEntry>('/journal/entries', data);
    return response.data;
  },

  /**
   * Update journal entry
   */
  updateEntry: async (id: string, data: UpdateJournalEntryRequest): Promise<JournalEntry> => {
    const response = await apiClient.put<JournalEntry>(`/journal/entries/${id}`, data);
    return response.data;
  },

  /**
   * Delete journal entry
   */
  deleteEntry: async (id: string): Promise<void> => {
    await apiClient.delete(`/journal/entries/${id}`);
  },
};
