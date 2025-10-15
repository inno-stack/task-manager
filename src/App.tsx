import { useState, useEffect, useMemo } from "react";
import { CheckSquare, Loader2 } from "lucide-react";
import type { Todo, TodoFormData, FilterType, SortType } from "./types/todo";
import { todoService } from "./services/todoService";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";
import { FilterBar } from "./components/FilterBar";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [sortType, setSortType] = useState<SortType>("newest");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error loading todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData: TodoFormData) => {
    try {
      const newTodo = await todoService.createTodo(todoData);
      setTodos([newTodo, ...todos]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleToggleTodo = async (id: number, completed: boolean) => {
    try {
      const updated = await todoService.toggleComplete(id, completed);
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const handleUpdateTodo = async (id: number, updates: Partial<Todo>) => {
    try {
      const updated = await todoService.updateTodo(id, updates);
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

    const availableCategories = useMemo(() => {
      const categories = todos
        .map((t) => t.category)
        .filter((c): c is string => Boolean(c && c.trim() !== ""));
      return Array.from(new Set(categories)).sort();
    }, [todos]);


  const filteredAndSortedTodos = useMemo(() => {
    let filtered = todos;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((t) => t.title.toLowerCase().includes(query));
    }

    if (filterType === "active") {
      filtered = filtered.filter((t) => !t.completed);
    } else if (filterType === "completed") {
      filtered = filtered.filter((t) => t.completed);
    }

    if (categoryFilter) {
      filtered = filtered.filter((t) => t.category === categoryFilter);
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortType) {
        case "oldest":
          return a.id - b.id;
        case "priority": {
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          const aPriority = a.priority || "medium";
          const bPriority = b.priority || "medium";
          return priorityOrder[aPriority] - priorityOrder[bPriority];
        }
        case "dueDate": {
          if (!a.due_date && !b.due_date) return 0;
          if (!a.due_date) return 1;
          if (!b.due_date) return -1;
          return (
            new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
          );
        }
        case "newest":
        default:
          return b.id - a.id;
      }
    });

    return sorted;
  }, [todos, searchQuery, filterType, sortType, categoryFilter]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-800">
                Task Manager
              </h1>
              <p className="text-slate-600 mt-1">
                Stay organized and productive
              </p>
            </div>
          </div>

          <div className="flex gap-4 text-sm mt-6">
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-slate-200 flex-1">
              <div className="text-slate-500 text-xs font-medium uppercase tracking-wide">
                Total
              </div>
              <div className="text-2xl font-bold text-slate-800 mt-1">
                {stats.total}
              </div>
            </div>
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-slate-200 flex-1">
              <div className="text-slate-500 text-xs font-medium uppercase tracking-wide">
                Active
              </div>
              <div className="text-2xl font-bold text-blue-600 mt-1">
                {stats.active}
              </div>
            </div>
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-slate-200 flex-1">
              <div className="text-slate-500 text-xs font-medium uppercase tracking-wide">
                Done
              </div>
              <div className="text-2xl font-bold text-emerald-600 mt-1">
                {stats.completed}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <TodoForm onAdd={handleAddTodo} />

          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterType={filterType}
            onFilterChange={setFilterType}
            sortType={sortType}
            onSortChange={setSortType}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            availableCategories={availableCategories}
          />

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : filteredAndSortedTodos.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <CheckSquare className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-1">
                {searchQuery || categoryFilter
                  ? "No tasks found"
                  : "No tasks yet"}
              </h3>
              <p className="text-slate-500">
                {searchQuery || categoryFilter
                  ? "Try adjusting your filters"
                  : "Create your first task to get started"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAndSortedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onUpdate={handleUpdateTodo}
                />
              ))}
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-sm text-slate-500">
          <p>
            Built with React, TypeScript, Tailwind CSS & JSONPlaceholder API
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
