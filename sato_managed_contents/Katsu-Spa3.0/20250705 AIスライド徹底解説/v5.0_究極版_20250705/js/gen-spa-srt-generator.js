/**
 * Gen-Spa Ultimate v5.0 - SRT字幕生成モジュール
 * 高精度なタイミング計算とフォーマット出力
 * 
 * 機能:
 * - ナレーションテキストから自動SRT生成
 * - 複数話者対応
 * - 感情・速度設定に基づくタイミング調整
 * - 日本語文章の自然な区切り検出
 */

class GenSpaSrtGenerator {
    constructor() {
        this.defaultWpm = 300; // Words per minute（日本語：文字/分）
        this.punctuationPause = 0.3; // 句読点での停止時間
        this.emotionModifiers = {
            'excited': 1.2,  // 興奮時は20%速く
            'happy': 1.1,    // 楽しい時は10%速く
            'neutral': 1.0,  // 通常速度
            'serious': 0.9,  // 真剣な時は10%遅く
            'calm': 0.8,     // 落ち着いた時は20%遅く
            'sad': 0.85      // 悲しい時は15%遅く
        };
        
        this.speakerPauseTime = 0.5; // 話者切り替え時の停止時間
    }
    
    /**
     * メインのSRT生成メソッド
     */
    generateSrt(conversation, options = {}) {
        const {
            startTime = 0,
            includeEmotions = true,
            includeTimecodes = true,
            autoBreakLongLines = true,
            maxLineLength = 35
        } = options;
        
        let srtContent = '';
        let currentTime = startTime;
        let entryIndex = 1;
        
        for (const item of conversation) {
            const segments = this.segmentText(item.text, maxLineLength, autoBreakLongLines);
            
            for (const segment of segments) {
                const duration = this.calculateDuration(segment, item.emotion || 'neutral');
                const endTime = currentTime + duration;
                
                // SRTエントリを作成
                srtContent += this.createSrtEntry(
                    entryIndex,
                    currentTime,
                    endTime,
                    item.speaker,
                    segment,
                    includeEmotions ? item.emotion : null
                );
                
                entryIndex++;
                currentTime = endTime + 0.1; // 次のセグメントまで0.1秒間隔
            }
            
            // 話者切り替え時の追加停止時間
            currentTime += this.speakerPauseTime;
        }
        
        return {
            srtContent: srtContent.trim(),
            totalDuration: currentTime,
            entryCount: entryIndex - 1
        };
    }
    
    /**
     * テキストを適切な長さに分割
     */
    segmentText(text, maxLength, autoBreak) {
        if (!autoBreak || text.length <= maxLength) {
            return [text];
        }
        
        const segments = [];
        const sentences = this.splitIntoSentences(text);
        let currentSegment = '';
        
        for (const sentence of sentences) {
            if (currentSegment.length + sentence.length <= maxLength) {
                currentSegment += sentence;
            } else {
                if (currentSegment.length > 0) {
                    segments.push(currentSegment.trim());
                    currentSegment = sentence;
                } else {
                    // 長すぎる文は強制分割
                    const forceSplit = this.forceSplitText(sentence, maxLength);
                    segments.push(...forceSplit);
                }
            }
        }
        
        if (currentSegment.length > 0) {
            segments.push(currentSegment.trim());
        }
        
        return segments.filter(seg => seg.length > 0);
    }
    
    /**
     * 文章を自然な単位で分割
     */
    splitIntoSentences(text) {
        // 日本語の自然な区切り文字
        const delimiters = /([。．！？\n])/;
        const parts = text.split(delimiters);
        const sentences = [];
        
        for (let i = 0; i < parts.length; i += 2) {
            const content = parts[i] || '';
            const delimiter = parts[i + 1] || '';
            
            if (content.trim().length > 0) {
                sentences.push(content + delimiter);
            }
        }
        
        return sentences;
    }
    
    /**
     * 長すぎるテキストを強制分割
     */
    forceSplitText(text, maxLength) {
        const segments = [];
        let remaining = text;
        
        while (remaining.length > maxLength) {
            // 適切な区切り位置を探す
            let splitPos = maxLength;
            
            // 文字境界で分割を試みる
            const breakChars = ['、', ',', ' ', 'の', 'に', 'を', 'が', 'は', 'で'];
            for (const char of breakChars) {
                const pos = remaining.lastIndexOf(char, maxLength);
                if (pos > maxLength * 0.7) { // 70%以上の位置であれば採用
                    splitPos = pos + 1;
                    break;
                }
            }
            
            segments.push(remaining.substring(0, splitPos));
            remaining = remaining.substring(splitPos);
        }
        
        if (remaining.length > 0) {
            segments.push(remaining);
        }
        
        return segments;
    }
    
    /**
     * テキストの読み上げ時間を計算
     */
    calculateDuration(text, emotion = 'neutral') {
        // 基本時間計算（文字数ベース）
        const baseTime = (text.length / this.defaultWpm) * 60;
        
        // 句読点による停止時間を加算
        const punctuationCount = (text.match(/[。．、，！？]/g) || []).length;
        const punctuationTime = punctuationCount * this.punctuationPause;
        
        // 感情修正を適用
        const emotionModifier = this.emotionModifiers[emotion] || 1.0;
        
        // 最小・最大時間の制約
        const totalTime = (baseTime + punctuationTime) / emotionModifier;
        return Math.max(1.5, Math.min(10.0, totalTime));
    }
    
    /**
     * SRTエントリを作成
     */
    createSrtEntry(index, startTime, endTime, speaker, text, emotion = null) {
        const start = this.formatTime(startTime);
        const end = this.formatTime(endTime);
        
        let content = text;
        if (speaker && speaker !== 'ナレーター') {
            content = `${speaker}: ${text}`;
        }
        
        // 感情表記を追加（オプション）
        if (emotion && emotion !== 'neutral') {
            content += ` (${emotion})`;
        }
        
        return `${index}\n${start} --> ${end}\n${content}\n\n`;
    }
    
    /**
     * 時間をSRT形式でフォーマット
     */
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 1000);
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
    }
    
    /**
     * SRTファイルを解析して会話データに変換
     */
    parseSrt(srtContent) {
        const conversation = [];
        const entries = this.extractSrtEntries(srtContent);
        
        for (const entry of entries) {
            const { speaker, text, emotion } = this.parseEntryText(entry.text);
            
            conversation.push({
                id: entry.id,
                startTime: entry.startTime,
                endTime: entry.endTime,
                speaker,
                text,
                emotion,
                duration: this.timeToSeconds(entry.endTime) - this.timeToSeconds(entry.startTime)
            });
        }
        
        return conversation;
    }
    
    /**
     * SRTエントリを抽出
     */
    extractSrtEntries(srtContent) {
        const entries = [];
        const blocks = srtContent.trim().split(/\n\n+/);
        
        for (const block of blocks) {
            const lines = block.trim().split('\n');
            if (lines.length < 3) continue;
            
            const id = parseInt(lines[0]);
            const timecode = lines[1];
            const text = lines.slice(2).join(' ');
            
            const [startTime, endTime] = timecode.split(' --> ');
            
            entries.push({
                id,
                startTime,
                endTime,
                text
            });
        }
        
        return entries;
    }
    
    /**
     * エントリテキストから話者と感情を抽出
     */
    parseEntryText(text) {
        let speaker = 'ナレーター';
        let cleanText = text;
        let emotion = 'neutral';
        
        // 話者を抽出（「話者名：」のパターン）
        const speakerMatch = text.match(/^([^：:]+)[：:]\s*(.+)$/);
        if (speakerMatch) {
            speaker = speakerMatch[1].trim();
            cleanText = speakerMatch[2].trim();
        }
        
        // 感情を抽出（「(emotion)」のパターン）
        const emotionMatch = cleanText.match(/^(.+?)\s*\((\w+)\)$/);
        if (emotionMatch) {
            cleanText = emotionMatch[1].trim();
            emotion = emotionMatch[2];
        }
        
        return { speaker, text: cleanText, emotion };
    }
    
    /**
     * 時間文字列を秒数に変換
     */
    timeToSeconds(timeString) {
        const [time, ms] = timeString.split(',');
        const [hours, minutes, seconds] = time.split(':').map(Number);
        
        return hours * 3600 + minutes * 60 + seconds + (parseInt(ms) / 1000);
    }
    
    /**
     * 複数スライドのSRTを一括生成
     */
    generateMultipleSrt(slides) {
        const results = [];
        let globalTime = 0;
        
        for (const slide of slides) {
            const result = this.generateSrt(slide.conversation, {
                startTime: globalTime,
                ...slide.options
            });
            
            results.push({
                slideId: slide.slideId,
                srtContent: result.srtContent,
                duration: result.totalDuration - globalTime,
                entryCount: result.entryCount
            });
            
            globalTime = result.totalDuration + 2; // スライド間に2秒の間隔
        }
        
        return results;
    }
    
    /**
     * SRTファイルのダウンロード用Blobを作成
     */
    createSrtBlob(srtContent) {
        return new Blob([srtContent], {
            type: 'text/plain;charset=utf-8'
        });
    }
    
    /**
     * SRTファイルをダウンロード
     */
    downloadSrt(srtContent, filename = 'subtitle.srt') {
        const blob = this.createSrtBlob(srtContent);
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    }
    
    /**
     * SRTの品質検証
     */
    validateSrt(srtContent) {
        const errors = [];
        const warnings = [];
        const entries = this.extractSrtEntries(srtContent);
        
        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            
            // ID順序チェック
            if (entry.id !== i + 1) {
                errors.push(`エントリ${i + 1}: IDが正しくありません (${entry.id})`);
            }
            
            // 時間順序チェック
            const startSeconds = this.timeToSeconds(entry.startTime);
            const endSeconds = this.timeToSeconds(entry.endTime);
            
            if (startSeconds >= endSeconds) {
                errors.push(`エントリ${entry.id}: 開始時間が終了時間以降です`);
            }
            
            // 継続時間チェック
            const duration = endSeconds - startSeconds;
            if (duration < 0.5) {
                warnings.push(`エントリ${entry.id}: 継続時間が短すぎます (${duration.toFixed(2)}秒)`);
            }
            if (duration > 10) {
                warnings.push(`エントリ${entry.id}: 継続時間が長すぎます (${duration.toFixed(2)}秒)`);
            }
            
            // テキスト長チェック
            if (entry.text.length > 70) {
                warnings.push(`エントリ${entry.id}: テキストが長すぎます (${entry.text.length}文字)`);
            }
            
            // 前のエントリとの重複チェック
            if (i > 0) {
                const prevEntry = entries[i - 1];
                const prevEndSeconds = this.timeToSeconds(prevEntry.endTime);
                
                if (startSeconds < prevEndSeconds) {
                    errors.push(`エントリ${entry.id}: 前のエントリと時間が重複しています`);
                }
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors,
            warnings,
            totalEntries: entries.length,
            totalDuration: entries.length > 0 ? this.timeToSeconds(entries[entries.length - 1].endTime) : 0
        };
    }
}

// エクスポート（Node.js環境用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GenSpaSrtGenerator;
}

// グローバル使用（ブラウザ環境用）
if (typeof window !== 'undefined') {
    window.GenSpaSrtGenerator = GenSpaSrtGenerator;
}