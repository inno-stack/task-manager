import { useState } from "react";
import {
  Check,
  Trash2,
  CreditCard as Edit2,
  X,
  Calendar,
  Tag,
  AlertCircle,
} from "lucide-react";
import type { Todo, Priority } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updates: Partial<Todo>) => void;
}

const priorityColors = {
  low: "bg-emerald-100 text-emerald-700 border-emerald-300",
  medium: "bg-amber-100 text-amber-700 border-amber-300",
  high: "bg-rose-100 text-rose-700 border-rose-300",
};

const priorityIcons = {
  low: "○",
  medium: "◐",
  high: "●",
};

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  onUpdate,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editPriority, setEditPriority] = useState<Priority>(
    todo.priority || "medium"
  );
  const [editCategory, setEditCategory] = useState(todo.category || "");
  const [editDueDate, setEditDueDate] = useState(todo.due_date || "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // 👈 delete modal state

  const handleSave = () => {
    if (!editTitle.trim()) return;

    // ✅ ensure correct ID is used and consistent updates
    onUpdate(todo.id, {
      title: editTitle,
      priority: editPriority,
      category: editCategory,
      due_date: editDueDate || null,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditPriority(todo.priority || "medium");
    setEditCategory(todo.category || "");
    setEditDueDate(todo.due_date || "");
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true); // 👈 open modal
  };

  const confirmDelete = () => {
    onDelete(todo.id); // ✅ perform delete
    setShowDeleteConfirm(false); // close modal
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue =
    todo.due_date && new Date(todo.due_date) < new Date() && !todo.completed;

  // 🧠 Render the delete modal only if true
  if (showDeleteConfirm) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
        <p className="text-slate-700 font-medium mb-4">
          Are you sure you want to delete this todo?
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={cancelDelete}
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-200 flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Sure
          </button>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 transition-all duration-300 hover:shadow-md">
        <div className="space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Task title"
            autoFocus
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Priority)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <input
              type="text"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Category"
            />
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md group ${
        todo.completed ? "border-slate-200 opacity-75" : "border-slate-200"
      }`}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <button
            onClick={() => onToggle(todo.id, !todo.completed)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-1 ${
              todo.completed
                ? "bg-blue-600 border-blue-600"
                : "border-slate-300 hover:border-blue-600 hover:bg-blue-50"
            }`}
          >
            {todo.completed && <Check className="w-4 h-4 text-white" />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3
                className={`text-lg font-semibold text-slate-800 break-words transition-all duration-200 ${
                  todo.completed ? "line-through text-slate-500" : ""
                }`}
              >
                {todo.title}
              </h3>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-all duration-200"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${
                  priorityColors[todo.priority || "medium"]
                }`}
              >
                <span className="text-base leading-none">
                  {priorityIcons[todo.priority || "medium"]}
                </span>
                {(todo.priority || "medium").charAt(0).toUpperCase() +
                  (todo.priority || "medium").slice(1)}
              </span>

              {todo.category && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  <Tag className="w-3 h-3" />
                  {todo.category}
                </span>
              )}

              {todo.due_date && (
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${
                    isOverdue
                      ? "bg-rose-100 text-rose-700 border-rose-300"
                      : "bg-blue-100 text-blue-700 border-blue-300"
                  }`}
                >
                  {isOverdue ? (
                    <AlertCircle className="w-3 h-3" />
                  ) : (
                    <Calendar className="w-3 h-3" />
                  )}
                  {formatDate(todo.due_date)}
                  {isOverdue && " (Overdue)"}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
