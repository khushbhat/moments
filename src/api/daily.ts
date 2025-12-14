/**
 * Daily Summary API Service
 */
import { apiClient } from './client';
import { HealthEntry } from './health';
import { CollegeTask } from './college';
import { JournalEntry } from './journal';

export interface DailySummary {
  date: string;
  user_id: string;
  health?: HealthEntry;
  college_tasks: CollegeTask[];
  journal_entries: JournalEntry[];
  total_expenses: number;
  water_intake: number;
  steps: number;
  tasks_completed: number;
  tasks_pending: number;
}

export const dailyApi = {
  /**
   * Get daily summary for a specific date
   */
  getSummary: async (date?: string): Promise<DailySummary> => {
    const response = await apiClient.get<DailySummary>('/daily/summary', {
      params: date ? { date } : undefined,
    });
    return response.data;
  },

  /**
   * Send daily summary email
   */
  sendEmail: async (data?: { date?: string; recipient_email?: string }): Promise<void> => {
    await apiClient.post('/daily/email', data);
  },
};
