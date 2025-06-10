import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

interface PaginationProps {
  onPageChange: (token?: string) => void; // Pass token for next/prev page
  isLoading: boolean;
  currentPageToken?: string; // Not directly used for display but can indicate state
  prevPageToken?: string;
  nextPageToken?: string;
  totalResults?: number; // For display purposes
  resultsPerPage?: number; // For display purposes
  // For displaying "Page X of Y" we might need to calculate current page number
  // if the API gives totalResults and resultsPerPage.
  // Or, simply show "Previous / Next" if page numbers are hard to determine.
}

const Pagination: React.FC<PaginationProps> = ({ 
  onPageChange, 
  isLoading, 
  prevPageToken, 
  nextPageToken,
  // totalResults, 
  // resultsPerPage 
}) => {
  const hasPrev = !!prevPageToken;
  const hasNext = !!nextPageToken;

  if (!hasPrev && !hasNext) {
    return null; // No pagination needed if neither token exists
  }
  
  // Simple Previous/Next display without page numbers, as YouTube API is token-based
  return (
    <nav className="flex items-center justify-between mt-8" aria-label="Pagination">
      <button
        onClick={() => onPageChange(prevPageToken)}
        disabled={!hasPrev || isLoading}
        className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        <ChevronLeftIcon className="w-5 h-5 mr-1" />
        前へ (Previous)
      </button>
      
      {/* 
        Displaying page numbers with token-based pagination is complex.
        We could estimate if totalResults and resultsPerPage are available,
        but it's not always accurate or provided.
        <span className="text-sm text-gray-400">
          Page X of Y (token based)
        </span> 
      */}

      <button
        onClick={() => onPageChange(nextPageToken)}
        disabled={!hasNext || isLoading}
        className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        次へ (Next)
        <ChevronRightIcon className="w-5 h-5 ml-1" />
      </button>
    </nav>
  );
};

export default Pagination;