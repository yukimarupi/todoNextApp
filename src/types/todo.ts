export interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string; // ISO 8601形式の日付
    updatedAt: string; // ISO 8601形式の日付
  }
