'use client';

import React, { useState, useRef } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { COLOR_SCHEME } from '../lib/api/config';
import { Slider } from '../components/ui/slider';

export default function TTSPage() {
  const [text, setText] = useState('');
  const [voiceId, setVoiceId] = useState('ja-JP-Nanami-Neural');
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const voices = [
    { id: 'ja-JP-Nanami-Neural', name: '七海（女性・標準）', gender: 'female' },
    { id: 'ja-JP-Keita-Neural', name: '慶太（男性・標準）', gender: 'male' },
    { id: 'ja-JP-Aoi-Neural', name: 'あおい（女性・明るい）', gender: 'female' },
    { id: 'ja-JP-Daichi-Neural', name: '大地（男性・落ち着いた）', gender: 'male' },
    { id: 'ja-JP-Mayu-Neural', name: 'まゆ（女性・やさしい）', gender: 'female' },
    { id: 'ja-JP-Naoki-Neural', name: '直樹（男性・プロフェッショナル）', gender: 'male' },
    { id: 'ja-JP-Shiori-Neural', name: 'しおり（女性・かわいい）', gender: 'female' },
  ];

  const handleGenerate = async () => {
    if (!text.trim()) {
      alert('テキストを入力してください。');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voiceId,
          speed,
          pitch,
          volume,
        }),
      });

      if (!response.ok) {
        throw new Error('音声生成に失敗しました。');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error('エラー:', error);
      alert('音声生成中にエラーが発生しました。');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = `speech_${Date.now()}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

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
            TTS（テキスト音声合成）
          </h1>
          <p style={{ color: COLOR_SCHEME.PRIMARY }}>
            テキストを自然な音声に変換します。プレゼンテーション、動画ナレーション、音声コンテンツの作成などに活用できます。
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle style={{ color: COLOR_SCHEME.ACCENT_1 }}>
                テキスト入力
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="text">読み上げるテキスト</Label>
                  <Textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="ここに読み上げたいテキストを入力してください..."
                    rows={6}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    最大5000文字まで入力できます。
                  </p>
                </div>
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
              <div className="space-y-6">
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

                <div>
                  <Label htmlFor="speed">読み上げ速度: {speed.toFixed(1)}x</Label>
                  <Slider
                    id="speed"
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    value={[speed]}
                    onValueChange={(value) => setSpeed(value[0])}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    0.5x（ゆっくり）〜 2.0x（速い）
                  </p>
                </div>

                <div>
                  <Label htmlFor="pitch">音程: {pitch.toFixed(1)}</Label>
                  <Slider
                    id="pitch"
                    min={0.5}
                    max={1.5}
                    step={0.1}
                    value={[pitch]}
                    onValueChange={(value) => setPitch(value[0])}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    0.5（低い）〜 1.5（高い）
                  </p>
                </div>

                <div>
                  <Label htmlFor="volume">音量: {Math.round(volume * 100)}%</Label>
                  <Slider
                    id="volume"
                    min={0.1}
                    max={1.0}
                    step={0.1}
                    value={[volume]}
                    onValueChange={(value) => setVolume(value[0])}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 mb-8">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !text.trim()}
            variant="accent1"
            size="lg"
          >
            {isGenerating ? '生成中...' : '音声を生成'}
          </Button>
        </div>

        {audioUrl && (
          <Card>
            <CardHeader>
              <CardTitle style={{ color: COLOR_SCHEME.ACCENT_3 }}>
                生成された音声
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <audio
                  ref={audioRef}
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
            <ol className="list-decimal pl-5 space-y-3"
              style={{ 
                color: COLOR_SCHEME.PRIMARY,
                letterSpacing: '0.03em',
              }}
            >
              <li>
                <strong>テキストを入力</strong>
                <p className="mt-1 text-sm">読み上げたいテキストを入力エリアに貼り付けるか、直接入力します。</p>
              </li>
              <li>
                <strong>音声を選択</strong>
                <p className="mt-1 text-sm">7種類の日本語音声から、用途に合った音声を選択します。</p>
              </li>
              <li>
                <strong>詳細設定を調整</strong>
                <p className="mt-1 text-sm">必要に応じて、読み上げ速度、音程、音量を調整します。</p>
              </li>
              <li>
                <strong>音声を生成</strong>
                <p className="mt-1 text-sm">「音声を生成」ボタンをクリックして、音声ファイルを作成します。</p>
              </li>
              <li>
                <strong>確認とダウンロード</strong>
                <p className="mt-1 text-sm">生成された音声を再生して確認し、問題なければダウンロードします。</p>
              </li>
            </ol>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4" style={{ color: COLOR_SCHEME.PRIMARY }}>
            よくある質問
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded" style={{ backgroundColor: COLOR_SCHEME.SECONDARY }}>
              <h4 className="font-semibold mb-2">Q: 一度に何文字まで変換できますか？</h4>
              <p className="text-sm">A: 最大5000文字まで一度に変換できます。それ以上の場合は、テキストを分割してご利用ください。</p>
            </div>
            <div className="p-4 rounded" style={{ backgroundColor: COLOR_SCHEME.SECONDARY }}>
              <h4 className="font-semibold mb-2">Q: 生成された音声の形式は？</h4>
              <p className="text-sm">A: MP3形式で生成されます。ほとんどのデバイスやアプリケーションで再生可能です。</p>
            </div>
            <div className="p-4 rounded" style={{ backgroundColor: COLOR_SCHEME.SECONDARY }}>
              <h4 className="font-semibold mb-2">Q: 商用利用は可能ですか？</h4>
              <p className="text-sm">A: はい、生成された音声は商用・非商用を問わず自由にご利用いただけます。</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}