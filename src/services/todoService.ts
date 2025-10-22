import { supabase } from "../supabaseClient";
import type { Todo, TodoFormData } from "../types/todo";

export const todoService = {
 async getAllTodos() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.id) // ✅ Only get todos for this logged-in user
    .order("id", { ascending: false });

  if (error) throw error;
  return data;
},


  // Create todo
  async createTodo(todoData: TodoFormData) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("todos")
      .insert([
        {
          ...todoData,
          user_id: user.id,
          due_date: todoData.due_date || null, // ✅ Convert empty string to null
        },
      ])

      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update todo
  async updateTodo(id: number, updates: Partial<Todo>): Promise<Todo> {
    const { data, error } = await supabase
      .from("todos")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteTodo(id: number): Promise<void> {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) throw error;
  },

  async toggleComplete(id: number, completed: boolean): Promise<Todo> {
    const { data, error } = await supabase
      .from("todos")
      .update({ completed })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
