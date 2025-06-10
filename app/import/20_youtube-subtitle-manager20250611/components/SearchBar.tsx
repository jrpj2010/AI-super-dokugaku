
import React, { useState } from 'react';
import { SearchIcon, FilterIcon, ChevronDownIcon } from './icons';
import { DATE_RANGE_OPTIONS, VIDEO_LENGTH_OPTIONS, SORT_ORDER_OPTIONS } from '../constants';
import { SearchFilters } from '../types';

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  isLoading: boolean;
  initialQuery?: string;
  initialFilters?: SearchFilters;
  disabled?: boolean; // New prop
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  isLoading, 
  initialQuery = '', 
  initialFilters = { dateRange: 'any', videoLength: 'any', sortBy: 'relevance' },
  disabled = false
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !disabled) {
      onSearch(query.trim(), filters);
    }
  };

  const handleFilterChange = (filterName: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  return (
    <div className={`bg-gray-800 p-4 rounded-lg shadow-lg mb-6 ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-grow w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={disabled ? "APIキーを設定してください (Set API Key in Settings)" : "キーワードまたはYouTube URLを入力 (Enter keyword or YouTube URL)"}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-700/70"
            aria-label="Search YouTube"
            disabled={disabled}
          />
          <div className="absolute top-0 left-0 pl-3 flex items-center h-full pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <button
          type="button"
          onClick={() => !disabled && setShowFilters(!showFilters)}
          className="p-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md transition-colors flex items-center justify-center sm:w-auto w-full disabled:opacity-50"
          aria-label="Toggle search filters"
          aria-expanded={showFilters}
          disabled={disabled}
        >
          <FilterIcon className="w-5 h-5" />
          <span className="ml-2 hidden sm:inline">フィルター (Filters)</span>
        </button>
        <button
          type="submit"
          disabled={isLoading || !query.trim() || disabled}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto font-semibold"
        >
          {isLoading ? '検索中... (Searching...)' : '検索 (Search)'}
        </button>
      </form>
      {showFilters && !disabled && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-750 rounded-md border border-gray-700">
          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-300 mb-1">日付範囲 (Date Range)</label>
            <select
              id="dateRange"
              name="dateRange"
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:ring-1 focus:ring-blue-500"
            >
              {DATE_RANGE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="videoLength" className="block text-sm font-medium text-gray-300 mb-1">動画の長さ (Video Length)</label>
            <select
              id="videoLength"
              name="videoLength"
              value={filters.videoLength}
              onChange={(e) => handleFilterChange('videoLength', e.target.value)}
              className="w-full p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:ring-1 focus:ring-blue-500"
            >
              {VIDEO_LENGTH_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-300 mb-1">並び順 (Sort By)</label>
            <select
              id="sortBy"
              name="sortBy"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:ring-1 focus:ring-blue-500"
            >
              {SORT_ORDER_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;