/**
 * Gen-Spa Ultimate v5.0 - TTS統合システム
 * Gemini 2.5 Flash Preview TTS連携モジュール
 * 
 * 機能:
 * - 複数話者音声生成
 * - SRT字幕ファイル生成
 * - 音声コントロール
 * - バックエンドAPI連携
 */

class GenSpaTtsIntegration {
    constructor() {
        this.apiEndpoint = '/api/tts/conversation';
        this.currentAudio = null;
        this.currentSrt = null;
        this.isPlaying = false;
        this.currentSlideId = null;
        
        // 話者と音声のマッピング（プレゼンテーションタイプ別）
        this.voiceMapping = {
            business: {
                male: ['Puck', 'Charon'],
                female: ['Laomedeia']
            },
            education: {
                male: ['Enceladus'],
                female: ['Callirrhoe']
            },
            product: {
                male: ['Kore'],
                female: ['Leda']
            }
        };
        
        this.init();
    }
    
    /**
     * 初期化処理
     */
    init() {
        this.setupAudioControls();
        this.loadExistingAudio();
        console.log('Gen-Spa TTS Integration initialized');
    }
    
    /**
     * 音声コントロールのセットアップ
     */
    setupAudioControls() {
        // 音声コントロールボタンを各スライドに追加
        document.querySelectorAll('.slide-container').forEach((slide, index) => {
            const slideId = slide.dataset.slideId || `slide-${index + 1}`;
            slide.dataset.slideId = slideId;
            
            const audioControl = this.createAudioControl(slideId);
            slide.appendChild(audioControl);
        });
    }
    
    /**
     * 音声コントロールUI作成
     */
    createAudioControl(slideId) {
        const control = document.createElement('div');
        control.className = 'audio-control';
        control.innerHTML = `
            <button class="audio-button" onclick="genSpaTts.toggleAudio('${slideId}')" id="btn-${slideId}">
                <i class="fas fa-play" id="icon-${slideId}"></i>
            </button>
            <span class="caption" id="status-${slideId}">音声なし</span>
        `;
        return control;
    }
    
    /**
     * ナレーション文字列から会話データを生成
     */
    parseNarrationText(text, slideType = 'business') {
        const conversation = [];
        
        // 複数話者のパターンをチェック
        const multiSpeakerPattern = /([^：:]+)[：:]([^]*?)(?=\n[^：:]+[：:]|$)/g;
        let match;
        let speakerIndex = 0;
        
        while ((match = multiSpeakerPattern.exec(text)) !== null) {
            const speaker = match[1].trim();
            const content = match[2].trim();
            
            conversation.push({
                speaker: speaker,
                text: content,
                emotion: this.detectEmotion(content),
                voice: this.selectVoice(speaker, slideType, speakerIndex)
            });
            speakerIndex++;
        }
        
        // 単一話者の場合
        if (conversation.length === 0) {
            conversation.push({
                speaker: 'ナレーター',
                text: text.trim(),
                emotion: this.detectEmotion(text),
                voice: this.selectVoice('ナレーター', slideType, 0)
            });
        }
        
        return conversation;
    }
    
    /**
     * 感情の自動検出
     */
    detectEmotion(text) {
        if (text.includes('！') || text.includes('すばらしい') || text.includes('素晴らしい')) {
            return 'excited';
        }
        if (text.includes('課題') || text.includes('問題') || text.includes('困難')) {
            return 'serious';
        }
        if (text.includes('ようこそ') || text.includes('はじめまして') || text.includes('こんにちは')) {
            return 'happy';
        }
        if (text.includes('落ち着いて') || text.includes('安心') || text.includes('穏やか')) {
            return 'calm';
        }
        return 'neutral';
    }
    
    /**
     * 話者に最適な音声を選択
     */
    selectVoice(speaker, slideType, index) {
        const mapping = this.voiceMapping[slideType] || this.voiceMapping.business;
        
        // 名前から性別を推測
        const maleNames = ['佐藤', '田中', '山田', '鈴木', 'Joe', 'Ken'];
        const femaleNames = ['田中', '佐々木', 'Jane', 'Mary', 'アシスタント'];
        
        let isMale = maleNames.some(name => speaker.includes(name));
        let isFemale = femaleNames.some(name => speaker.includes(name));
        
        if (!isMale && !isFemale) {
            // インデックスベースで交互に選択
            isMale = index % 2 === 0;
        }
        
        if (isMale) {
            return mapping.male[index % mapping.male.length];
        } else {
            return mapping.female[index % mapping.female.length];
        }
    }
    
    /**
     * スライド用音声生成
     */
    async generateSlideAudio(slideId, narrationText, slideType = 'business') {
        try {
            this.updateStatus(slideId, '音声生成中...');
            
            const conversation = this.parseNarrationText(narrationText, slideType);
            const speakers = this.extractUniqueSpeakers(conversation);
            
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    conversation,
                    speakers,
                    slideId
                })
            });
            
            if (!response.ok) {
                throw new Error('音声生成に失敗しました');
            }
            
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            
            // 音声をキャッシュ
            this.cacheAudio(slideId, audioUrl);
            
            this.updateStatus(slideId, '音声準備完了');
            return audioUrl;
            
        } catch (error) {
            console.error('Audio generation error:', error);
            this.updateStatus(slideId, 'エラー');
            throw error;
        }
    }
    
    /**
     * ユニークな話者を抽出
     */
    extractUniqueSpeakers(conversation) {
        const speakersMap = new Map();
        
        conversation.forEach(item => {
            if (!speakersMap.has(item.speaker)) {
                speakersMap.set(item.speaker, {
                    name: item.speaker,
                    voice: item.voice
                });
            }
        });
        
        return Array.from(speakersMap.values());
    }
    
    /**
     * 音声の再生/停止制御
     */
    async toggleAudio(slideId) {
        const button = document.getElementById(`btn-${slideId}`);
        const icon = document.getElementById(`icon-${slideId}`);
        
        // 他の音声を停止
        if (this.currentAudio && this.currentSlideId !== slideId) {
            this.stopAudio();
        }
        
        if (this.isPlaying && this.currentSlideId === slideId) {
            // 停止
            this.stopAudio();
        } else {
            // 再生
            await this.playAudio(slideId);
        }
    }
    
    /**
     * 音声再生
     */
    async playAudio(slideId) {
        try {
            let audioUrl = this.getStoredAudio(slideId);
            
            if (!audioUrl) {
                // 音声が存在しない場合は生成
                const narrationElement = document.querySelector(`[data-slide-id="${slideId}"] .narration-text`);
                if (!narrationElement) {
                    throw new Error('ナレーションテキストが見つかりません');
                }
                
                const slideTypeElement = document.querySelector(`[data-slide-id="${slideId}"]`);
                const slideType = slideTypeElement?.dataset.slideType || 'business';
                
                audioUrl = await this.generateSlideAudio(slideId, narrationElement.textContent, slideType);
            }
            
            this.currentAudio = new Audio(audioUrl);
            this.currentSlideId = slideId;
            this.isPlaying = true;
            
            // 再生終了時の処理
            this.currentAudio.addEventListener('ended', () => {
                this.stopAudio();
            });
            
            // 再生エラー処理
            this.currentAudio.addEventListener('error', (e) => {
                console.error('Audio playback error:', e);
                this.stopAudio();
                this.updateStatus(slideId, 'エラー');
            });
            
            await this.currentAudio.play();
            this.updatePlayButton(slideId, true);
            this.updateStatus(slideId, '再生中');
            
        } catch (error) {
            console.error('Play audio error:', error);
            this.updateStatus(slideId, 'エラー');
        }
    }
    
    /**
     * 音声停止
     */
    stopAudio() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
        }
        
        if (this.currentSlideId) {
            this.updatePlayButton(this.currentSlideId, false);
            this.updateStatus(this.currentSlideId, '停止');
        }
        
        this.isPlaying = false;
        this.currentSlideId = null;
    }
    
    /**
     * 再生ボタンの更新
     */
    updatePlayButton(slideId, isPlaying) {
        const icon = document.getElementById(`icon-${slideId}`);
        if (icon) {
            icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
    }
    
    /**
     * ステータス表示の更新
     */
    updateStatus(slideId, status) {
        const statusElement = document.getElementById(`status-${slideId}`);
        if (statusElement) {
            statusElement.textContent = status;
        }
    }
    
    /**
     * 音声をローカルストレージにキャッシュ
     */
    cacheAudio(slideId, audioUrl) {
        // IndexedDBまたはlocalStorageを使用してキャッシュ
        localStorage.setItem(`gen-spa-audio-${slideId}`, audioUrl);
    }
    
    /**
     * 保存済み音声を取得
     */
    getStoredAudio(slideId) {
        return localStorage.getItem(`gen-spa-audio-${slideId}`);
    }
    
    /**
     * 既存の音声ファイルを読み込み
     */
    loadExistingAudio() {
        document.querySelectorAll('.slide-container').forEach(slide => {
            const slideId = slide.dataset.slideId;
            const audioUrl = this.getStoredAudio(slideId);
            
            if (audioUrl) {
                this.updateStatus(slideId, '音声準備完了');
            }
        });
    }
    
    /**
     * SRT字幕ファイル生成
     */
    generateSrtForSlide(slideId, conversation) {
        let srtContent = '';
        let currentTime = 0;
        
        conversation.forEach((item, index) => {
            const duration = this.estimateDuration(item.text);
            const startTime = this.formatSrtTime(currentTime);
            const endTime = this.formatSrtTime(currentTime + duration);
            
            srtContent += `${index + 1}\n`;
            srtContent += `${startTime} --> ${endTime}\n`;
            srtContent += `${item.speaker}: ${item.text}\n\n`;
            
            currentTime += duration + 0.1; // 0.1秒の間隔
        });
        
        return srtContent;
    }
    
    /**
     * テキストの読み上げ時間を推定
     */
    estimateDuration(text) {
        // 1文字あたり約0.15秒として計算
        const baseTime = text.length * 0.15;
        // 最小3秒、最大8秒
        return Math.max(3, Math.min(8, baseTime));
    }
    
    /**
     * SRT時間フォーマット
     */
    formatSrtTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 1000);
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
    }
    
    /**
     * 全スライドの一括音声生成
     */
    async generateAllSlideAudio(slideType = 'business') {
        const slides = document.querySelectorAll('.slide-container[data-slide-id]');
        const results = [];
        
        for (const slide of slides) {
            const slideId = slide.dataset.slideId;
            const narrationElement = slide.querySelector('.narration-text');
            
            if (narrationElement) {
                try {
                    const audioUrl = await this.generateSlideAudio(
                        slideId, 
                        narrationElement.textContent, 
                        slideType
                    );
                    results.push({ slideId, success: true, audioUrl });
                } catch (error) {
                    results.push({ slideId, success: false, error: error.message });
                }
            }
        }
        
        return results;
    }
    
    /**
     * 音声ファイルのダウンロード
     */
    downloadAudio(slideId) {
        const audioUrl = this.getStoredAudio(slideId);
        if (!audioUrl) {
            alert('音声ファイルが見つかりません');
            return;
        }
        
        const link = document.createElement('a');
        link.href = audioUrl;
        link.download = `gen-spa-${slideId}.wav`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// グローバルインスタンス
const genSpaTts = new GenSpaTtsIntegration();

// エクスポート（Node.js環境用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GenSpaTtsIntegration;
}