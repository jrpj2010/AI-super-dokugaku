import React from 'react';
import Link from 'next/link';
import { MainLayout } from './components/layout/MainLayout';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { COLOR_SCHEME } from './lib/api/config';
import { allNavItems } from './lib/navigation';

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-4xl mt-8 mb-16 text-center">
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ 
              fontFamily: 'Noto Serif JP, serif',
              color: COLOR_SCHEME.PRIMARY,
              letterSpacing: '0.05em',
            }}
          >
            VibeCoding 統合プラットフォーム
          </h1>
          <p 
            className="text-xl mb-8"
            style={{ 
              fontFamily: 'Noto Serif JP, serif',
              color: COLOR_SCHEME.PRIMARY,
              letterSpacing: '0.03em',
            }}
          >
            AIを活用した統合ビジネスツール
          </p>
          <p className="text-base mb-8" style={{ color: COLOR_SCHEME.PRIMARY }}>
            議事録スライド生成、音声合成、画像生成など、ビジネスに必要なAIツールを統合したプラットフォームです。
          </p>
        </div>

        <div className="w-full max-w-6xl mb-16">
          <h2 
            className="text-2xl font-bold mb-8 text-center"
            style={{ 
              fontFamily: 'Noto Serif JP, serif',
              color: COLOR_SCHEME.PRIMARY,
              letterSpacing: '0.05em',
            }}
          >
            提供サービス一覧
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allNavItems.filter(item => item.href !== '/').map((item, index) => {
              const accentColors = [COLOR_SCHEME.ACCENT_1, COLOR_SCHEME.ACCENT_2, COLOR_SCHEME.ACCENT_3];
              const accentColor = accentColors[index % 3];
              
              return (
                <Card key={item.href} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle
                        style={{ 
                          color: accentColor,
                          fontFamily: 'Noto Serif JP, serif',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {item.title}
                      </CardTitle>
                      {item.status === 'coming-soon' && (
                        <span 
                          className="text-xs px-2 py-1 rounded"
                          style={{ 
                            backgroundColor: COLOR_SCHEME.PRIMARY,
                            color: 'white',
                          }}
                        >
                          準備中
                        </span>
                      )}
                      {item.status === 'beta' && (
                        <span 
                          className="text-xs px-2 py-1 rounded"
                          style={{ 
                            backgroundColor: COLOR_SCHEME.ACCENT_1,
                            color: 'white',
                          }}
                        >
                          β版
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed mb-4"
                      style={{ 
                        color: COLOR_SCHEME.PRIMARY,
                        letterSpacing: '0.03em',
                      }}
                    >
                      {item.description}
                    </p>
                    {item.status === 'active' ? (
                      <Link href={item.href}>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full"
                          style={{ 
                            borderColor: accentColor,
                            color: accentColor,
                          }}
                        >
                          利用する
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                        disabled
                        style={{ 
                          borderColor: '#ccc',
                          color: '#999',
                        }}
                      >
                        準備中
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-16">
          <Card>
            <CardHeader>
              <CardTitle
                style={{ 
                  color: COLOR_SCHEME.ACCENT_1,
                  fontFamily: 'Noto Serif JP, serif',
                  letterSpacing: '0.05em',
                }}
              >
                統合プラットフォーム
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed"
                style={{ 
                  color: COLOR_SCHEME.PRIMARY,
                  letterSpacing: '0.03em',
                }}
              >
                すべてのツールが一つのプラットフォームに統合され、シームレスに利用できます。データの共有やツール間の連携もスムーズです。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle
                style={{ 
                  color: COLOR_SCHEME.ACCENT_2,
                  fontFamily: 'Noto Serif JP, serif',
                  letterSpacing: '0.05em',
                }}
              >
                非エンジニア向け設計
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed"
                style={{ 
                  color: COLOR_SCHEME.PRIMARY,
                  letterSpacing: '0.03em',
                }}
              >
                専門知識不要で誰でも簡単に使えるUI設計。各機能には詳細な使い方ガイドとサポートが用意されています。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle
                style={{ 
                  color: COLOR_SCHEME.ACCENT_3,
                  fontFamily: 'Noto Serif JP, serif',
                  letterSpacing: '0.05em',
                }}
              >
                継続的なアップデート
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed"
                style={{ 
                  color: COLOR_SCHEME.PRIMARY,
                  letterSpacing: '0.03em',
                }}
              >
                新しい機能を随時追加。現在準備中の機能も順次リリース予定です。フィードバックを元に改善を続けています。
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 w-full max-w-4xl">
          <h2 
            className="text-2xl font-bold mb-4 text-center"
            style={{ 
              fontFamily: 'Noto Serif JP, serif',
              color: COLOR_SCHEME.PRIMARY,
              letterSpacing: '0.05em',
            }}
          >
            使い方ガイド
          </h2>
          <div className="rounded-lg p-6"
            style={{ 
              backgroundColor: COLOR_SCHEME.SECONDARY,
              border: `1px solid ${COLOR_SCHEME.PRIMARY}`,
            }}
          >
            <ol className="list-decimal pl-5 space-y-4"
              style={{ 
                color: COLOR_SCHEME.PRIMARY,
                letterSpacing: '0.03em',
              }}
            >
              <li>上部のナビゲーションメニューから、使いたい機能を選択します。</li>
              <li>各機能のページでは、わかりやすい説明と使い方ガイドが表示されます。</li>
              <li>必要な情報を入力し、実行ボタンをクリックするだけで結果が得られます。</li>
              <li>生成されたコンテンツはダウンロードして自由に活用できます。</li>
              <li>困ったときは、各ページのヘルプセクションを参照してください。</li>
            </ol>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}