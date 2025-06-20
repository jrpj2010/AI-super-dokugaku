'use client'

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="例: 子供と楽しめる日帰りお出かけ、東京近郊の温泉旅行"
        className="flex-1"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading || !query.trim()}>
        <Search className="w-4 h-4 mr-2" />
        検索
      </Button>
    </form>
  );
}