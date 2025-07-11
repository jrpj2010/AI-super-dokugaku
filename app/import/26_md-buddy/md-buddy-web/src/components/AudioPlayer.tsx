import { useState, useEffect, useRef } from 'react';
import { FileItem } from '@/store/fileStore';
import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { parseSRT } from '@/utils/subtitles';

interface AudioPlayerProps {
  audioFile: FileItem;
  subtitleFile?: FileItem;
}

export function AudioPlayer({ audioFile, subtitleFile }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  // 音声ファイルのURLを生成
  useEffect(() => {
    if (audioFile.content instanceof Blob) {
      const url = URL.createObjectURL(audioFile.content);
      setAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof audioFile.content === 'string' && audioFile.content.startsWith('data:')) {
      setAudioUrl(audioFile.content);
    }
  }, [audioFile]);

  // 字幕の更新
  useEffect(() => {
    if (!subtitleFile || !currentTime) return;

    const subtitles = parseSRT(subtitleFile.content);
    const current = subtitles.find(
      sub => currentTime >= sub.startTime && currentTime <= sub.endTime
    );
    
    setCurrentSubtitle(current?.text || '');
  }, [currentTime, subtitleFile]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    if (!audioRef.current) return;
    audioRef.current.volume = value[0];
    setVolume(value[0]);
  };

  const handlePlaybackRateChange = (rate: number) => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const skip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime += seconds;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
        
        {/* 音声波形のプレースホルダー */}
        <div className="w-full max-w-2xl mb-8">
          <div className="h-32 bg-gradient-to-r from-blue-200 to-blue-400 dark:from-blue-800 dark:to-blue-600 rounded-lg flex items-center justify-center">
            <Volume2 className="w-16 h-16 text-white opacity-50" />
          </div>
        </div>
        
        {/* プレーヤーコントロール */}
        <div className="w-full max-w-2xl space-y-4">
          {/* シークバー */}
          <div className="space-y-2">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          {/* 再生コントロール */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => skip(-10)}
              className="w-10 h-10"
            >
              <SkipBack className="w-5 h-5" />
            </Button>
            
            <Button
              variant="default"
              size="icon"
              onClick={togglePlayPause}
              className="w-14 h-14"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => skip(10)}
              className="w-10 h-10"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>
          
          {/* 音量と再生速度 */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 flex-1">
              <Volume2 className="w-4 h-4 text-gray-500" />
              <Slider
                value={[volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">速度:</span>
              <select
                value={playbackRate}
                onChange={(e) => handlePlaybackRateChange(Number(e.target.value))}
                className="text-sm border rounded px-2 py-1"
              >
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* 字幕表示 */}
        {subtitleFile && currentSubtitle && (
          <div className="mt-8 p-4 bg-black bg-opacity-75 text-white rounded-lg">
            <p className="text-center text-lg">{currentSubtitle}</p>
          </div>
        )}
      </div>
    </div>
  );
}