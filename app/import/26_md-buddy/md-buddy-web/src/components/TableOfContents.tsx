import React, { useMemo } from 'react';

interface TableOfContentsProps {
  content: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const tocItems = useMemo(() => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const items: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      
      items.push({ id, text, level });
    }

    return items;
  }, [content]);

  const handleClick = (id: string) => {
    // プレビューエリア内の該当見出しまでスクロール
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (tocItems.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <p className="text-sm">見出しがありません</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          目次
        </h3>
      </div>
      <nav className="p-4">
        <ul className="space-y-1">
          {tocItems.map((item, index) => (
            <li
              key={`${item.id}-${index}`}
              style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
            >
              <button
                onClick={() => handleClick(item.id)}
                className={`
                  block w-full text-left py-1.5 px-2 rounded text-sm
                  hover:bg-gray-100 transition-colors
                  ${item.level === 1 ? 'font-semibold text-gray-900' : 
                    item.level === 2 ? 'font-medium text-gray-800' : 
                    'text-gray-600'}
                `}
              >
                <span className="flex items-start gap-2">
                  <span className="text-gray-400 text-xs mt-0.5">
                    {'#'.repeat(item.level)}
                  </span>
                  <span className="flex-1">{item.text}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};