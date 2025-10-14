export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  priority?: Priority;
  category?: string;
  due_date?: string | null;
}

export interface TodoFormData {
  title: string;
  completed?: boolean;
  priority?: Priority;
  category?: string;
  due_date?: string;
}

export type FilterType = "all" | "active" | "completed";
export type SortType = "newest" | "oldest" | "priority" | "dueDate";
