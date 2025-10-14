import { Search, Filter } from "lucide-react";
import type { FilterType, SortType } from "../types/todo";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterType: FilterType;
  onFilterChange: (type: FilterType) => void;
  sortType: SortType;
  onSortChange: (type: SortType) => void;
  categoryFilter: string;
  onCategoryFilterChange: (category: string) => void;
  availableCategories: string[];
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  filterType,
  onFilterChange,
  sortType,
  onSortChange,
  categoryFilter,
  onCategoryFilterChange,
  availableCategories,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <select
            value={filterType}
            onChange={(e) => onFilterChange(e.target.value as FilterType)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={sortType}
            onChange={(e) => onSortChange(e.target.value as SortType)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">By Priority</option>
            <option value="dueDate">By Due Date</option>
          </select>

          {availableCategories.length > 0 && (
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
            >
              <option value="">All Categories</option>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}
