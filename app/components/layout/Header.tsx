import React from 'react';
import Link from 'next/link';
import { COLOR_SCHEME } from '../../lib/api/config';
import { activeNavItems } from '../../lib/navigation';

export function Header() {
  return (
    <header className="border-b"
      style={{
        backgroundColor: COLOR_SCHEME.SECONDARY,
        borderColor: COLOR_SCHEME.PRIMARY,
      }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span
                className="text-2xl font-bold tracking-wider"
                style={{
                  color: COLOR_SCHEME.PRIMARY,
                  letterSpacing: '0.05em',
                  fontFamily: 'Noto Serif JP, serif',
                }}
              >
                VibeCoding
              </span>
            </Link>
            <div
              className="ml-2 px-2 py-1 text-xs rounded"
              style={{
                backgroundColor: COLOR_SCHEME.ACCENT_1,
                color: 'white',
              }}
            >
              統合版
            </div>
          </div>
          <nav>
            <ul className="flex gap-4 items-center">
              {activeNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:underline transition-colors"
                    style={{
                      color: COLOR_SCHEME.PRIMARY,
                      letterSpacing: '0.03em',
                    }}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/projects"
                  className="text-sm hover:underline transition-colors"
                  style={{
                    color: COLOR_SCHEME.PRIMARY,
                    letterSpacing: '0.03em',
                  }}
                >
                  プロジェクト一覧
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
} 