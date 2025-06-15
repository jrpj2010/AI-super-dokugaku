/**
 * スライドプレゼンターメインスクリプト
 */

import { SlideGenerator } from './slide-generator.js';
import { SlideTemplates } from './slide-templates.js';

class SlidePresenter {
  constructor() {
    this.generator = new SlideGenerator();
    this.templates = new SlideTemplates();
    this.currentSlides = null;
    this.currentPreviewSlide = 0;
    
    this.initializeElements();
    this.setupEventListeners();
  }
  
  /**
   * DOM要素の初期化
   */
  initializeElements() {
    this.elements = {
      messageInput: document.getElementById('messageInput'),
      generateBtn: document.getElementById('generateBtn'),
      previewArea: document.getElementById('previewArea'),
      prevPreview: document.getElementById('prevPreview'),
      nextPreview: document.getElementById('nextPreview'),
      exportHtml: document.getElementById('exportHtml'),
      openPresentation: document.getElementById('openPresentation'),
      statusMessage: document.getElementById('statusMessage'),
      loadingOverlay: document.getElementById('loadingOverlay'),
      slideCount: document.getElementById('slideCount'),
      sampleButtons: document.querySelectorAll('.sample-btn')
    };
  }
  
  /**
   * イベントリスナーの設定
   */
  setupEventListeners() {
    // 生成ボタン
    this.elements.generateBtn.addEventListener('click', () => this.generateSlides());
    
    // サンプルボタン
    this.elements.sampleButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sampleId = e.target.getAttribute('data-sample');
        this.loadSample(sampleId);
      });
    });
    
    // プレビューナビゲーション
    this.elements.prevPreview.addEventListener('click', () => this.navigatePreview(-1));
    this.elements.nextPreview.addEventListener('click', () => this.navigatePreview(1));
    
    // エクスポートボタン
    this.elements.exportHtml.addEventListener('click', () => this.exportAsHtml());
    this.elements.openPresentation.addEventListener('click', () => this.openPresentation());
    
    // キーボードショートカット（プレビュー用）
    document.addEventListener('keydown', (e) => {
      if (this.currentSlides && document.activeElement !== this.elements.messageInput) {
        if (e.key === 'ArrowLeft') {
          this.navigatePreview(-1);
        } else if (e.key === 'ArrowRight') {
          this.navigatePreview(1);
        }
      }
    });
  }
  
  /**
   * サンプルメッセージを読み込む
   */
  loadSample(sampleId) {
    if (window.sampleMessages && window.sampleMessages[sampleId]) {
      this.elements.messageInput.value = window.sampleMessages[sampleId];
      this.showStatus('サンプルメッセージを読み込みました', 'info');
    }
  }
  
  /**
   * スライドを生成
   */
  async generateSlides() {
    const message = this.elements.messageInput.value.trim();
    
    if (!message) {
      this.showStatus('メッセージを入力してください', 'error');
      return;
    }
    
    // ローディング表示
    this.showLoading(true);
    this.elements.generateBtn.disabled = true;
    
    try {
      // スライドを生成
      const result = await this.generator.generateSlides(message);
      this.currentSlides = result;
      
      // プレビューを表示
      this.showPreview();
      
      // エクスポートボタンを表示
      this.elements.exportHtml.classList.add('active');
      this.elements.openPresentation.classList.add('active');
      
      // ステータス表示
      this.showStatus(`${result.slides.length}枚のスライドを生成しました`, 'success');
      
      // スライド数を表示
      this.elements.slideCount.textContent = `全${result.slides.length}枚のスライド`;
      this.elements.slideCount.style.display = 'block';
      
    } catch (error) {
      console.error('スライド生成エラー:', error);
      this.showStatus('スライド生成中にエラーが発生しました', 'error');
    } finally {
      this.showLoading(false);
      this.elements.generateBtn.disabled = false;
    }
  }
  
  /**
   * プレビューを表示
   */
  showPreview() {
    if (!this.currentSlides || !this.currentSlides.slides.length) return;
    
    this.currentPreviewSlide = 0;
    this.updatePreview();
    
    // ナビゲーションボタンを有効化
    this.elements.prevPreview.disabled = false;
    this.elements.nextPreview.disabled = false;
  }
  
  /**
   * プレビューを更新
   */
  updatePreview() {
    if (!this.currentSlides) return;
    
    const slide = this.currentSlides.slides[this.currentPreviewSlide];
    const totalSlides = this.currentSlides.slides.length;
    
    // スライドHTMLを生成
    const slideHtml = this.templates.renderSlide(
      slide, 
      this.currentPreviewSlide + 1, 
      totalSlides
    );
    
    // プレビューエリアに表示
    this.elements.previewArea.innerHTML = `
      <div class="preview-slide active" style="transform: scale(0.6); transform-origin: top left; width: 166.67%; height: 166.67%;">
        ${slideHtml}
      </div>
    `;
    
    // ナビゲーションボタンの状態を更新
    this.elements.prevPreview.disabled = this.currentPreviewSlide === 0;
    this.elements.nextPreview.disabled = this.currentPreviewSlide === totalSlides - 1;
  }
  
  /**
   * プレビューナビゲーション
   */
  navigatePreview(direction) {
    if (!this.currentSlides) return;
    
    const newIndex = this.currentPreviewSlide + direction;
    const totalSlides = this.currentSlides.slides.length;
    
    if (newIndex >= 0 && newIndex < totalSlides) {
      this.currentPreviewSlide = newIndex;
      this.updatePreview();
    }
  }
  
  /**
   * HTMLとしてエクスポート
   */
  exportAsHtml() {
    if (!this.currentSlides) return;
    
    // すべてのスライドをHTML化
    const slidesHtml = this.currentSlides.slides
      .map((slide, index) => 
        this.templates.renderSlide(slide, index + 1, this.currentSlides.slides.length)
      )
      .join('\n');
    
    // 完全なHTMLドキュメントを生成
    const fullHtml = this.templates.wrapSlides(slidesHtml, this.currentSlides.metadata);
    
    // ダウンロード
    this.downloadFile(fullHtml, 'presentation.html', 'text/html');
    
    this.showStatus('プレゼンテーションをダウンロードしました', 'success');
  }
  
  /**
   * プレゼンテーションを開く
   */
  openPresentation() {
    if (!this.currentSlides) return;
    
    // すべてのスライドをHTML化
    const slidesHtml = this.currentSlides.slides
      .map((slide, index) => 
        this.templates.renderSlide(slide, index + 1, this.currentSlides.slides.length)
      )
      .join('\n');
    
    // 完全なHTMLドキュメントを生成
    const fullHtml = this.templates.wrapSlides(slidesHtml, this.currentSlides.metadata);
    
    // 新しいウィンドウで開く
    const presentationWindow = window.open('', '_blank');
    presentationWindow.document.write(fullHtml);
    presentationWindow.document.close();
    
    this.showStatus('プレゼンテーションを新しいウィンドウで開きました', 'success');
  }
  
  /**
   * ファイルをダウンロード
   */
  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  /**
   * ローディング表示
   */
  showLoading(show) {
    if (show) {
      this.elements.loadingOverlay.classList.add('active');
    } else {
      this.elements.loadingOverlay.classList.remove('active');
    }
  }
  
  /**
   * ステータスメッセージを表示
   */
  showStatus(message, type = 'info') {
    this.elements.statusMessage.textContent = message;
    this.elements.statusMessage.className = `status-message ${type}`;
    
    // 5秒後に自動的に非表示
    setTimeout(() => {
      this.elements.statusMessage.className = 'status-message';
    }, 5000);
  }
}

// アプリケーションの初期化
document.addEventListener('DOMContentLoaded', () => {
  new SlidePresenter();
});