import axios from "axios";
import type { Todo, TodoFormData } from "../types/todo";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const todoService = {
  async getAllTodos(): Promise<Todo[]> {
    const response = await axios.get<Todo[]>(API_URL);
    return response.data.slice(0, 10).map((todo) => ({
      ...todo,
      priority: "medium" as const,
      category: "General",
      due_date: null,
    }));
  },

  async createTodo(todoData: TodoFormData): Promise<Todo> {
    const response = await axios.post<Todo>(API_URL, {
      title: todoData.title,
      completed: todoData.completed || false,
      userId: 1,
    });

    return {
      ...response.data,
      priority: todoData.priority || "medium",
      category: todoData.category || "General",
      due_date: todoData.due_date || null,
    };
  },

  async updateTodo(id: number, updates: Partial<Todo>): Promise<Todo> {
    const response = await axios.put<Todo>(`${API_URL}/${id}`, updates);
    return response.data;
  },

  async deleteTodo(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },

  async toggleComplete(id: number, completed: boolean): Promise<Todo> {
    return this.updateTodo(id, { completed });
  },
};
