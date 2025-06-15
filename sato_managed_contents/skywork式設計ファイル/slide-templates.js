/**
 * スライドテンプレートシステム
 * 各種スライドタイプのHTMLテンプレートを管理
 */

export class SlideTemplates {
  constructor() {
    this.templates = {
      title: this.titleTemplate,
      overview: this.overviewTemplate,
      themes: this.themesTemplate,
      problems: this.problemsTemplate,
      structure: this.structureTemplate,
      flow: this.flowTemplate,
      analysis: this.analysisTemplate,
      advice: this.adviceTemplate,
      implementation: this.implementationTemplate,
      summary: this.summaryTemplate
    };
  }
  
  /**
   * スライドをHTMLに変換
   */
  renderSlide(slideData, slideNumber, totalSlides) {
    const template = this.templates[slideData.type];
    if (!template) {
      console.warn(`Unknown slide type: ${slideData.type}`);
      return this.defaultTemplate(slideData, slideNumber, totalSlides);
    }
    
    return template.call(this, slideData, slideNumber, totalSlides);
  }
  
  /**
   * タイトルスライドテンプレート
   */
  titleTemplate(slide, slideNumber, totalSlides) {
    return `
      <div class="slide slide-title" data-slide="${slideNumber}" style="background: ${slide.style.background};">
        <div class="slide-content">
          <div class="title-wrapper">
            <h1 class="main-title" style="color: ${slide.style.titleColor};">
              ${slide.content.title}
            </h1>
            <h2 class="subtitle" style="color: ${slide.style.titleColor}; opacity: 0.9;">
              ${slide.content.subtitle}
            </h2>
          </div>
          
          <div class="title-stats">
            <div class="stat-item">
              <div class="stat-number">${slide.content.stats.themes}</div>
              <div class="stat-label">テーマ</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">${slide.content.stats.problems}</div>
              <div class="stat-label">問題点</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">${slide.content.stats.advice}</div>
              <div class="stat-label">提案</div>
            </div>
          </div>
          
          <div class="date-footer">
            ${slide.content.date}
          </div>
        </div>
        ${this.slideFooter(slideNumber, totalSlides)}
      </div>
    `;
  }
  
  /**
   * 概要スライドテンプレート
   */
  overviewTemplate(slide, slideNumber, totalSlides) {
    return `
      <div class="slide slide-overview" data-slide="${slideNumber}">
        <div class="slide-content">
          <h2 class="slide-title">${slide.content.title}</h2>
          
          <div class="overview-grid">
            ${slide.content.sections.map(section => `
              <div class="overview-card">
                <div class="overview-icon">${section.icon}</div>
                <div class="overview-label">${section.label}</div>
                <div class="overview-value">${section.value}</div>
              </div>
            `).join('')}
          </div>
          
          <div class="metadata-footer">
            <span>文字数: ${slide.content.metadata.textLength.toLocaleString()}</span>
            <span>段落数: ${slide.content.metadata.paragraphCount}</span>
            <span>文数: ${slide.content.metadata.sentenceCount}</span>
          </div>
        </div>
        ${this.slideFooter(slideNumber, totalSlides)}
      </div>
    `;
  }
  
  /**
   * テーマスライドテンプレート
   */
  themesTemplate(slide, slideNumber, totalSlides) {
    return `
      <div class="slide slide-themes" data-slide="${slideNumber}">
        <div class="slide-content">
          <h2 class="slide-title">${slide.content.title}</h2>
          
          <div class="themes-bubble-chart">
            ${slide.content.themes.map((theme, index) => `
              <div class="theme-bubble" 
                   style="
                     width: ${theme.size}px; 
                     height: ${theme.size}px; 
                     background-color: ${theme.color};
                     animation-delay: ${index * 0.1}s;
                   ">
                <span class="theme-text">${theme.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
        ${this.slideFooter(slideNumber, totalSlides)}
      </div>
    `;
  }
  
  /**
   * 問題点スライドテンプレート
   */
  problemsTemplate(slide, slideNumber, totalSlides) {
    return `
      <div class="slide slide-problems" data-slide="${slideNumber}" style="background: ${slide.style.background};">
        <div class="slide-content">
          <h2 class="slide-title">${slide.content.title}</h2>
          
          <div class="problems-list">
            ${slide.content.problems.map(problem => `
              <div class="problem-item severity-${problem.severity}">
                <div class="problem-number">${problem.number}</div>
                <div class="problem-content">
                  <h3 class="problem-title">${problem.title}</h3>
                  <p class="problem-description">${problem.description}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        ${this.slideFooter(slideNumber, totalSlides)}
      </div>
    `;
  }
  
  /**
   * 構造分析スライドテンプレート
   */
  structureTemplate(slide, slideNumber, totalSlides) {
    return `
      <div class="slide slide-structure" data-slide="${slideNumber}" style="background: ${slide.style.background};">
        <div class="slide-content">
          <h2 class="slide-title" style="color: ${slide.style.textColor};">${slide.content.title}</h2>
          
          <div class="structure-hierarchy">
            ${slide.content.mainPoints.map(point => `
              <div class="structure-card">
                <div class="structure-icon">${point.icon}</div>
                <div class="structure-order">${point.order}</div>
                <div class="structure-text">${point.text}</div>
              </div>
            `).join('')}
          </div>
        </div>
        ${this.slideFooter(slideNumber, totalSlides)}
      </div>
    `;
  }
  
  /**
   * フロースライドテンプレート
   */
  flowTemplate(slide, slideNumber, totalSlides) {
    return `
      <div class="slide slide-flow" data-slide="${slideNumber}" style="background: ${slide.style.background};">
        <div class="slide-content">
          <h2 class="slide-title">${slide.content.title}</h2>
          
          <div class="flow-timeline">
            ${slide.content.steps.map((step, index) => `
              <div class="flow-step" style="animation-delay: ${index * 0.2}s;">
                <div class="flow-connector"></div>
                <div class="flow-node">
                  <div class="flow-number">${step.order}</div>
                </div>
                <div class="flow-content">
                  <h3 class="flow-title">${step.step}</h3>
                  <p class="flow-description">${step.description}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        ${this.slideFooter(slideNumber, totalSlides)}
      </div>
    `;
  }
  
  /**
   * 分析スライドテンプレート（強み・弱み）
   */
  analysisTemplate(slide, slideNumber, totalSlides) {
    return `
      <div class="slide slide-analysis" data-slide="${slideNumber}">
        <div class="slide-content">
          <h2 class="slide-title">${slide.content.title}</h2>
          
          <div class="analysis-split">
            <div class="strengths-section">
              <h3 class="section-title">強み</h3>
              <div class="analysis-items">
                ${slide.content.strengths.map(item => `
                  <div class="analysis-item">
                    <span class="item-icon" style="color: ${item.color};">${item.icon}</span>
                    <span class="item-text">${item.text}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <div class="weaknesses-section">
              <h3 class="section-title">改善点</h3>
              <div class="analysis-items">
                ${slide.content.weaknesses.map(item => `
                  <div class="analysis-item">
                    <span class="item-icon" style="color: ${item.color};">${item.icon}</span>
                    <span class="item-text">${item.text}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
        ${this.slideFooter(slideNumber, totalSlides)}
      </div>
    `;
  }
  
  /**
   * アドバイススライドテンプレート
   */
  adviceTemplate(slide, slideNumber, totalSlides) {
    return `
      <div class="slide slide-advice" data-slide="${slideNumber}" style="background: ${slide.style.background};">
        <div class="slide-content">
          <h2 class="slide-title">${slide.content.title}</h2>
          
          <div class="advice-grid">
            ${slide.content.items.map(item => `
              <div class="advice-card priority-${item.priority}">
                <h3 class="advice-title">${item.title}</h3>
                <p class="advice-description">${item.description}</p>
                <ul class="advice-actions">
                  ${item.actions.slice(0, 3).map(action => `
                    <li>${action}</li>
                  `).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </div>
        ${this.slideFooter(slideNumber, totalSlides)}
      </div>
    `;
  }
  
  /**
   * 実装スライドテンプレート
   */
  implementationTemplate(slide, slideNumber, totalSlides) {
    return `
      <div class="slide slide-implementation" data-slide="${slideNumber}" style="background: ${slide.style.background};">
        <div class="slide-content">
          <h2 class="slide-title">${slide.content.title}</h2>
          
          <div class="implementation-timeline">
            ${Object.entries(slide.content.phases).map(([phase, steps], index) => `
              <div class="phase-section" style="border-left-color: ${slide.style.phaseColors[index]};">
                <h3 class="phase-title">${phase}</h3>
                <div class="phase-steps">
                  ${steps.map(step => `
                    <div class="step-item">
                      <div class="step-title">${step.title}</div>
                      <div class="step-time">${step.estimatedTime || '30-60分'}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
          
          <div class="total-time">
            推定総所要時間: <strong>${Math.floor(slide.content.totalTime / 60)}時間</strong>
          </div>
        </div>
        ${this.slideFooter(slideNumber, totalSlides)}
      </div>
    `;
  }
  
  /**
   * まとめスライドテンプレート
   */
  summaryTemplate(slide, slideNumber, totalSlides) {
    return `
      <div class="slide slide-summary" data-slide="${slideNumber}" style="background: ${slide.style.background};">
        <div class="slide-content">
          <h2 class="slide-title" style="color: ${slide.style.textColor};">${slide.content.title}</h2>
          
          <div class="summary-content">
            <div class="key-findings">
              <h3>主な発見</h3>
              <ul>
                ${slide.content.keyFindings.map(finding => `
                  <li>${finding}</li>
                `).join('')}
              </ul>
            </div>
            
            <div class="next-steps">
              <h3>次のステップ</h3>
              <ol>
                ${slide.content.nextSteps.map(step => `
                  <li>${step}</li>
                `).join('')}
              </ol>
            </div>
            
            <div class="call-to-action">
              ${slide.content.callToAction}
            </div>
          </div>
        </div>
        ${this.slideFooter(slideNumber, totalSlides)}
      </div>
    `;
  }
  
  /**
   * デフォルトテンプレート
   */
  defaultTemplate(slide, slideNumber, totalSlides) {
    return `
      <div class="slide slide-default" data-slide="${slideNumber}">
        <div class="slide-content">
          <h2 class="slide-title">スライド ${slideNumber}</h2>
          <div class="default-content">
            ${JSON.stringify(slide.content, null, 2)}
          </div>
        </div>
        ${this.slideFooter(slideNumber, totalSlides)}
      </div>
    `;
  }
  
  /**
   * スライドフッター
   */
  slideFooter(slideNumber, totalSlides) {
    return `
      <div class="slide-footer">
        <div class="slide-number">${slideNumber} / ${totalSlides}</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${(slideNumber / totalSlides) * 100}%;"></div>
        </div>
      </div>
    `;
  }
  
  /**
   * すべてのスライドをラップ
   */
  wrapSlides(slidesHtml, metadata) {
    return `
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>メッセージ分析プレゼンテーション</title>
        ${this.getInlineStyles()}
        ${this.getInlineScripts()}
      </head>
      <body>
        <div class="presentation-container">
          ${slidesHtml}
        </div>
        
        <div class="controls">
          <button class="control-btn" id="prevSlide" title="前のスライド (←)">◀</button>
          <button class="control-btn" id="nextSlide" title="次のスライド (→)">▶</button>
          <button class="control-btn" id="fullscreen" title="フルスクリーン (F)">⛶</button>
        </div>
        
        <div class="slide-indicator">
          <span id="currentSlide">1</span> / <span id="totalSlides">${metadata.totalSlides}</span>
        </div>
      </body>
      </html>
    `;
  }
  
  /**
   * インラインスタイルを取得
   */
  getInlineStyles() {
    return `
      <style>
        ${this.getBaseStyles()}
        ${this.getSlideStyles()}
        ${this.getAnimationStyles()}
        ${this.getPrintStyles()}
      </style>
    `;
  }
  
  /**
   * ベーススタイル
   */
  getBaseStyles() {
    return `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, sans-serif;
        background: #1a1a1a;
        color: #333;
        overflow: hidden;
      }
      
      .presentation-container {
        width: 100vw;
        height: 100vh;
        position: relative;
      }
      
      .slide {
        width: 100%;
        height: 100%;
        position: absolute;
        display: none;
        background: white;
        overflow: hidden;
      }
      
      .slide.active {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .slide-content {
        max-width: 1200px;
        width: 90%;
        margin: 0 auto;
        padding: 60px;
        position: relative;
      }
      
      .slide-title {
        font-size: 3em;
        margin-bottom: 40px;
        text-align: center;
        font-weight: 700;
      }
      
      .controls {
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: flex;
        gap: 10px;
        z-index: 1000;
      }
      
      .control-btn {
        width: 50px;
        height: 50px;
        border: none;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        transition: all 0.3s;
      }
      
      .control-btn:hover {
        background: rgba(0, 0, 0, 0.9);
        transform: scale(1.1);
      }
      
      .slide-indicator {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 14px;
        z-index: 1000;
      }
      
      .slide-footer {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 1200px;
      }
      
      .progress-bar {
        height: 3px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        overflow: hidden;
        margin-top: 10px;
      }
      
      .progress-fill {
        height: 100%;
        background: #2c6b97;
        transition: width 0.3s ease;
      }
    `;
  }
  
  /**
   * スライド別スタイル
   */
  getSlideStyles() {
    return `
      /* タイトルスライド */
      .slide-title {
        text-align: center;
        color: white;
      }
      
      .main-title {
        font-size: 4em;
        font-weight: 900;
        margin-bottom: 20px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      }
      
      .subtitle {
        font-size: 2em;
        font-weight: 300;
      }
      
      .title-stats {
        display: flex;
        justify-content: center;
        gap: 60px;
        margin-top: 80px;
      }
      
      .stat-item {
        text-align: center;
        color: white;
      }
      
      .stat-number {
        font-size: 3em;
        font-weight: 700;
      }
      
      .stat-label {
        font-size: 1.2em;
        opacity: 0.8;
        margin-top: 10px;
      }
      
      /* 概要スライド */
      .overview-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
        margin-top: 60px;
      }
      
      .overview-card {
        background: #f8f9fa;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        transition: transform 0.3s;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      }
      
      .overview-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      }
      
      .overview-icon {
        font-size: 3em;
        margin-bottom: 20px;
      }
      
      .overview-label {
        font-size: 1.2em;
        color: #666;
        margin-bottom: 10px;
      }
      
      .overview-value {
        font-size: 1.5em;
        font-weight: 700;
        color: #2c6b97;
      }
      
      /* テーマスライド */
      .themes-bubble-chart {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 20px;
        margin-top: 60px;
        min-height: 400px;
      }
      
      .theme-bubble {
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 700;
        padding: 20px;
        text-align: center;
        animation: bubbleIn 0.6s ease-out forwards;
        opacity: 0;
        transform: scale(0);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      }
      
      /* 問題点スライド */
      .problems-list {
        margin-top: 60px;
      }
      
      .problem-item {
        display: flex;
        margin-bottom: 30px;
        padding: 30px;
        border-radius: 15px;
        background: white;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s;
      }
      
      .problem-item:hover {
        transform: translateX(10px);
      }
      
      .problem-number {
        width: 60px;
        height: 60px;
        background: #ff6b6b;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5em;
        font-weight: 700;
        flex-shrink: 0;
        margin-right: 30px;
      }
      
      .severity-high .problem-number {
        background: #e74c3c;
      }
      
      .severity-medium .problem-number {
        background: #f39c12;
      }
      
      .severity-low .problem-number {
        background: #95a5a6;
      }
      
      /* フロースライド */
      .flow-timeline {
        margin-top: 60px;
        position: relative;
      }
      
      .flow-step {
        display: flex;
        align-items: center;
        margin-bottom: 40px;
        opacity: 0;
        animation: slideInLeft 0.6s ease-out forwards;
      }
      
      .flow-connector {
        position: absolute;
        left: 30px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: #ddd;
      }
      
      .flow-node {
        width: 60px;
        height: 60px;
        background: #2c6b97;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 700;
        font-size: 1.5em;
        margin-right: 30px;
        position: relative;
        z-index: 1;
      }
      
      /* 実装スライド */
      .implementation-timeline {
        margin-top: 60px;
      }
      
      .phase-section {
        margin-bottom: 40px;
        padding-left: 30px;
        border-left: 4px solid;
      }
      
      .phase-title {
        font-size: 1.8em;
        margin-bottom: 20px;
      }
      
      .step-item {
        display: flex;
        justify-content: space-between;
        padding: 15px;
        background: rgba(255, 255, 255, 0.8);
        margin-bottom: 10px;
        border-radius: 8px;
      }
      
      .total-time {
        text-align: center;
        font-size: 1.5em;
        margin-top: 40px;
        padding: 20px;
        background: #e8f4fd;
        border-radius: 10px;
      }
    `;
  }
  
  /**
   * アニメーションスタイル
   */
  getAnimationStyles() {
    return `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes bubbleIn {
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      .slide.active .slide-content > * {
        animation: fadeIn 0.6s ease-out;
      }
    `;
  }
  
  /**
   * 印刷用スタイル
   */
  getPrintStyles() {
    return `
      @media print {
        .presentation-container {
          height: auto;
        }
        
        .slide {
          position: relative;
          display: block !important;
          page-break-after: always;
          height: 100vh;
          margin-bottom: 0;
        }
        
        .controls,
        .slide-indicator {
          display: none;
        }
        
        .slide-footer {
          position: fixed;
          bottom: 20px;
        }
      }
    `;
  }
  
  /**
   * インラインスクリプトを取得
   */
  getInlineScripts() {
    return `
      <script>
        (function() {
          let currentSlide = 1;
          const totalSlides = document.querySelectorAll('.slide').length;
          
          function showSlide(n) {
            const slides = document.querySelectorAll('.slide');
            
            if (n > totalSlides) currentSlide = 1;
            if (n < 1) currentSlide = totalSlides;
            
            slides.forEach(slide => slide.classList.remove('active'));
            slides[currentSlide - 1].classList.add('active');
            
            document.getElementById('currentSlide').textContent = currentSlide;
          }
          
          function nextSlide() {
            showSlide(currentSlide += 1);
          }
          
          function prevSlide() {
            showSlide(currentSlide -= 1);
          }
          
          function toggleFullscreen() {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen();
            } else {
              document.exitFullscreen();
            }
          }
          
          // イベントリスナー
          document.getElementById('nextSlide').addEventListener('click', nextSlide);
          document.getElementById('prevSlide').addEventListener('click', prevSlide);
          document.getElementById('fullscreen').addEventListener('click', toggleFullscreen);
          
          // キーボードショートカット
          document.addEventListener('keydown', (e) => {
            switch(e.key) {
              case 'ArrowRight':
              case ' ':
                nextSlide();
                break;
              case 'ArrowLeft':
                prevSlide();
                break;
              case 'f':
              case 'F':
                toggleFullscreen();
                break;
              case 'Escape':
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                }
                break;
            }
          });
          
          // 初期表示
          showSlide(1);
        })();
      </script>
    `;
  }
}

// エクスポート用のファクトリ関数
export function createSlideTemplates() {
  return new SlideTemplates();
}