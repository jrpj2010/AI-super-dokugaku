'use client';

import React, { useState, useRef } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { COLOR_SCHEME } from '../lib/api/config';
import { Progress } from '../components/ui/progress';

interface SubtitleEntry {
  index: number;
  startTime: string;
  endTime: string;
  text: string;
}

export default function SRTPage() {
  const [srtContent, setSrtContent] = useState('');
  const [voiceId, setVoiceId] = useState('ja-JP-Nanami-Neural');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [parsedSubtitles, setParsedSubtitles] = useState<SubtitleEntry[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const voices = [
    { id: 'ja-JP-Nanami-Neural', name: '七海（女性・標準）', gender: 'female' },
    { id: 'ja-JP-Keita-Neural', name: '慶太（男性・標準）', gender: 'male' },
    { id: 'ja-JP-Aoi-Neural', name: 'あおい（女性・明るい）', gender: 'female' },
    { id: 'ja-JP-Daichi-Neural', name: '大地（男性・落ち着いた）', gender: 'male' },
    { id: 'ja-JP-Mayu-Neural', name: 'まゆ（女性・やさしい）', gender: 'female' },
    { id: 'ja-JP-Naoki-Neural', name: '直樹（男性・プロフェッショナル）', gender: 'male' },
    { id: 'ja-JP-Shiori-Neural', name: 'しおり（女性・かわいい）', gender: 'female' },
  ];

  const parseSRT = (content: string): SubtitleEntry[] => {
    const entries: SubtitleEntry[] = [];
    const blocks = content.trim().split(/\n\n+/);
    
    for (const block of blocks) {
      const lines = block.trim().split('\n');
      if (lines.length >= 3) {
        const index = parseInt(lines[0]);
        const timeParts = lines[1].split(' --> ');
        if (timeParts.length === 2) {
          entries.push({
            index,
            startTime: timeParts[0].trim(),
            endTime: timeParts[1].trim(),
            text: lines.slice(2).join(' '),
          });
        }
      }
    }
    
    return entries;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setSrtContent(content);
        const subtitles = parseSRT(content);
        setParsedSubtitles(subtitles);
      };
      reader.readAsText(file);
    }
  };

  const handleSRTChange = (value: string) => {
    setSrtContent(value);
    const subtitles = parseSRT(value);
    setParsedSubtitles(subtitles);
  };

  const handleGenerate = async () => {
    if (parsedSubtitles.length === 0) {
      alert('有効なSRT形式の字幕を入力してください。');
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    
    try {
      const response = await fetch('/api/srt-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subtitles: parsedSubtitles,
          voiceId,
        }),
      });

      if (!response.ok) {
        throw new Error('音声生成に失敗しました。');
      }

      // プログレス更新のシミュレーション
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 500);

      const blob = await response.blob();
      clearInterval(progressInterval);
      setProgress(100);
      
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error('エラー:', error);
      alert('音声生成中にエラーが発生しました。');
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = `srt_speech_${Date.now()}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const sampleSRT = `1
00:00:00,000 --> 00:00:05,000
こんにちは、VibeCodingへようこそ。

2
00:00:05,500 --> 00:00:10,000
このツールでは、SRT字幕ファイルから音声を生成できます。

3
00:00:10,500 --> 00:00:15,000
動画制作やプレゼンテーションにご活用ください。`;

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 
            className="text-3xl font-bold mb-4"
            style={{ 
              fontFamily: 'Noto Serif JP, serif',
              color: COLOR_SCHEME.PRIMARY,
              letterSpacing: '0.05em',
            }}
          >
            SRT音声変換
          </h1>
          <p style={{ color: COLOR_SCHEME.PRIMARY }}>
            SRT形式の字幕ファイルから、タイミングを保持した音声ファイルを生成します。動画のナレーション作成に最適です。
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle style={{ color: COLOR_SCHEME.ACCENT_1 }}>
                SRT字幕入力
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>SRTファイルをアップロード</Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".srt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="mt-2 w-full"
                  >
                    ファイルを選択
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute right-2 top-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSRTChange(sampleSRT)}
                    >
                      サンプルを使用
                    </Button>
                  </div>
                  <Label htmlFor="srt">または直接入力</Label>
                  <Textarea
                    id="srt"
                    value={srtContent}
                    onChange={(e) => handleSRTChange(e.target.value)}
                    placeholder="SRT形式の字幕をここに貼り付けてください..."
                    rows={10}
                    className="mt-2 font-mono text-sm"
                  />
                </div>

                {parsedSubtitles.length > 0 && (
                  <div className="p-3 rounded" style={{ backgroundColor: COLOR_SCHEME.SECONDARY }}>
                    <p className="text-sm">
                      {parsedSubtitles.length}個の字幕エントリが検出されました。
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ color: COLOR_SCHEME.ACCENT_2 }}>
                音声設定
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="voice">音声の種類</Label>
                <select
                  id="voice"
                  value={voiceId}
                  onChange={(e) => setVoiceId(e.target.value)}
                  className="w-full mt-2 p-2 border rounded"
                  style={{ borderColor: COLOR_SCHEME.PRIMARY }}
                >
                  {voices.map((voice) => (
                    <option key={voice.id} value={voice.id}>
                      {voice.name}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {parsedSubtitles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle style={{ color: COLOR_SCHEME.ACCENT_3 }}>
                  字幕プレビュー
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {parsedSubtitles.slice(0, 5).map((subtitle) => (
                    <div
                      key={subtitle.index}
                      className="p-2 rounded text-sm"
                      style={{ backgroundColor: COLOR_SCHEME.SECONDARY }}
                    >
                      <div className="font-mono text-xs mb-1" style={{ color: COLOR_SCHEME.ACCENT_1 }}>
                        {subtitle.startTime} → {subtitle.endTime}
                      </div>
                      <div>{subtitle.text}</div>
                    </div>
                  ))}
                  {parsedSubtitles.length > 5 && (
                    <p className="text-sm text-gray-500 text-center">
                      ...他 {parsedSubtitles.length - 5} 件
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex gap-4 mb-8">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || parsedSubtitles.length === 0}
            variant="accent1"
            size="lg"
          >
            {isGenerating ? '生成中...' : '音声を生成'}
          </Button>
        </div>

        {isGenerating && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>処理中...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            </CardContent>
          </Card>
        )}

        {audioUrl && !isGenerating && (
          <Card>
            <CardHeader>
              <CardTitle style={{ color: COLOR_SCHEME.ACCENT_3 }}>
                生成された音声
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <audio
                  src={audioUrl}
                  controls
                  className="w-full"
                />
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="w-full"
                >
                  音声ファイルをダウンロード
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-12">
          <h2 
            className="text-2xl font-bold mb-4"
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
            <h3 className="font-bold mb-3">SRT形式とは？</h3>
            <p className="mb-4 text-sm">
              SRT（SubRip Text）は、動画の字幕で最も一般的な形式です。各字幕には番号、表示時間、テキストが含まれます。
            </p>
            
            <h3 className="font-bold mb-3">SRTファイルの例：</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm font-mono mb-4">
{`1
00:00:00,000 --> 00:00:05,000
最初の字幕テキスト

2
00:00:05,500 --> 00:00:10,000
次の字幕テキスト`}
            </pre>

            <h3 className="font-bold mb-3">使用手順：</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>SRTファイルをアップロードするか、テキストエリアに直接貼り付けます。</li>
              <li>音声の種類を選択します。</li>
              <li>「音声を生成」ボタンをクリックします。</li>
              <li>生成された音声は、字幕のタイミングに合わせて読み上げられます。</li>
              <li>動画編集ソフトで音声と動画を合成してご利用ください。</li>
            </ol>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4" style={{ color: COLOR_SCHEME.PRIMARY }}>
            よくある質問
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded" style={{ backgroundColor: COLOR_SCHEME.SECONDARY }}>
              <h4 className="font-semibold mb-2">Q: どのような動画編集ソフトで使用できますか？</h4>
              <p className="text-sm">A: Adobe Premiere Pro、Final Cut Pro、DaVinci Resolve、iMovieなど、MP3形式に対応したすべての動画編集ソフトで使用できます。</p>
            </div>
            <div className="p-4 rounded" style={{ backgroundColor: COLOR_SCHEME.SECONDARY }}>
              <h4 className="font-semibold mb-2">Q: 字幕のタイミングは正確ですか？</h4>
              <p className="text-sm">A: SRTファイルで指定されたタイミング通りに音声が生成されます。ただし、読み上げ速度によって若干の調整が必要な場合があります。</p>
            </div>
            <div className="p-4 rounded" style={{ backgroundColor: COLOR_SCHEME.SECONDARY }}>
              <h4 className="font-semibold mb-2">Q: 複数の話者を使い分けることはできますか？</h4>
              <p className="text-sm">A: 現在は単一の音声での生成となりますが、将来的に複数話者対応を予定しています。</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}