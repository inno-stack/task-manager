import { useState } from "react";
import { Plus, X } from "lucide-react";
import type { Priority, TodoFormData } from "../types/todo";

interface TodoFormProps {
  onAdd: (todo: TodoFormData) => void;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      priority,
      category: category.trim(),
      due_date: dueDate,
    });

    setTitle("");
    setPriority("medium");
    setCategory("");
    setDueDate("");
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTitle("");
    setPriority("medium");
    setCategory("");
    setDueDate("");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
      >
        <Plus className="w-5 h-5" />
        <span className="font-semibold">Add New Task</span>
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
    >
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title *"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
            autoFocus
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Work, Personal"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}
