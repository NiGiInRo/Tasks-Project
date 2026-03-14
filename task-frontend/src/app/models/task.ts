export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: 'pending' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface TasksResponse {
  message: string;
  data: Task[];
}

export interface TaskResponse {
  message: string;
  data: Task;
}

export interface TaskFormPayload {
  title: string;
  description?: string;
  status?: 'pending' | 'completed';
}