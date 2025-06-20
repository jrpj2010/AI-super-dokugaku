'use client'

import { useState } from 'react';
import { Share2, Download, Link2, Mail, FileText, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface PlanExporterProps {
  timeline: {
    saturday: any[];
    sunday: any[];
  };
}

export function PlanExporter({ timeline }: PlanExporterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generatePlanText = () => {
    const lines: string[] = ['🗓️ 週末プラン\n'];
    
    // 土曜日
    lines.push('【土曜日】');
    timeline.saturday.forEach(item => {
      lines.push(`${item.time} ${item.emoji} ${item.title}`);
      lines.push(`   📍 ${item.details.location}`);
      if (item.details.hotpepperData?.urls?.pc) {
        lines.push(`   🔗 ${item.details.hotpepperData.urls.pc}`);
      }
      lines.push('');
    });
    
    // 日曜日
    lines.push('\n【日曜日】');
    timeline.sunday.forEach(item => {
      lines.push(`${item.time} ${item.emoji} ${item.title}`);
      lines.push(`   📍 ${item.details.location}`);
      if (item.details.hotpepperData?.urls?.pc) {
        lines.push(`   🔗 ${item.details.hotpepperData.urls.pc}`);
      }
      lines.push('');
    });
    
    return lines.join('\n');
  };

  const generateICalendar = () => {
    const events: string[] = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Weekend Planner//EN'];
    
    // 今週末の日付を計算
    const today = new Date();
    const saturday = new Date(today);
    const dayOfWeek = today.getDay();
    const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;
    saturday.setDate(today.getDate() + daysUntilSaturday);
    
    const sunday = new Date(saturday);
    sunday.setDate(saturday.getDate() + 1);
    
    // イベント追加
    [...timeline.saturday.map(item => ({ ...item, date: saturday })),
     ...timeline.sunday.map(item => ({ ...item, date: sunday }))].forEach((item, index) => {
      const [hours, minutes] = item.time.split(':').map(Number);
      const startTime = new Date(item.date);
      startTime.setHours(hours, minutes, 0, 0);
      
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 2); // 2時間のイベント
      
      events.push('BEGIN:VEVENT');
      events.push(`UID:${Date.now()}-${index}@weekendplanner`);
      events.push(`DTSTAMP:${formatICalDate(new Date())}`);
      events.push(`DTSTART:${formatICalDate(startTime)}`);
      events.push(`DTEND:${formatICalDate(endTime)}`);
      events.push(`SUMMARY:${item.emoji} ${item.title}`);
      events.push(`LOCATION:${item.details.location}`);
      if (item.details.hotpepperData?.urls?.pc) {
        events.push(`URL:${item.details.hotpepperData.urls.pc}`);
      }
      events.push('END:VEVENT');
    });
    
    events.push('END:VCALENDAR');
    return events.join('\r\n');
  };

  const formatICalDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  };

  const handleDownloadText = () => {
    const text = generatePlanText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weekend-plan.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadCalendar = () => {
    const ical = generateICalendar();
    const blob = new Blob([ical], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weekend-plan.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    // 簡易的な共有URL生成（実際にはサーバーサイドで保存が必要）
    const planData = btoa(encodeURIComponent(JSON.stringify(timeline)));
    const url = `${window.location.origin}/v3?plan=${planData}`;
    setShareUrl(url);
    
    // クリップボードにコピー
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleEmailShare = () => {
    const subject = '週末プランを共有します';
    const body = generatePlanText();
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  const totalItems = timeline.saturday.length + timeline.sunday.length;
  
  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl transition-all"
      >
        <Share2 className="w-4 h-4 mr-2" />
        プランを共有・保存
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-80 z-50"
          >
            <h3 className="font-bold text-lg mb-3 text-gray-900">プランの共有・保存</h3>
            
            <div className="space-y-2">
              <button
                onClick={handleDownloadText}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">テキストでダウンロード</p>
                  <p className="text-xs text-gray-500">プレーンテキスト形式で保存</p>
                </div>
              </button>

              <button
                onClick={handleDownloadCalendar}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <Calendar className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">カレンダーに追加</p>
                  <p className="text-xs text-gray-500">iCal形式でダウンロード</p>
                </div>
              </button>

              <button
                onClick={handleEmailShare}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <Mail className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium text-gray-900">メールで送信</p>
                  <p className="text-xs text-gray-500">メールアプリで共有</p>
                </div>
              </button>

              <button
                onClick={handleShare}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <Link2 className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">共有リンクを作成</p>
                  <p className="text-xs text-gray-500">URLをコピーして共有</p>
                </div>
              </button>
            </div>

            {shareUrl && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">共有URL:</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 text-xs bg-white border border-gray-300 rounded px-2 py-1"
                  />
                  <span className={`text-xs ${copied ? 'text-green-600' : 'text-gray-400'}`}>
                    {copied ? 'コピー済み!' : ''}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                {totalItems}件のアクティビティを含むプラン
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}