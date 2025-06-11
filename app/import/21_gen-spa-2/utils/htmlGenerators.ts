
import { PresentationData, SlideContent } from '../types';
import { 
  PAGE_BACKGROUND_COLOR,
  SLIDE_BACKGROUND_COLOR,
  SLIDE_BACKGROUND_COLOR_ALT,
  TEXT_COLOR_DARK,
  TEXT_COLOR_MUTED,
  ACCENT_COLOR_PRIMARY, 
  ACCENT_COLOR_SECONDARY,
  HIGHLIGHT_CLASS_NAME, 
  HIGHLIGHT_STYLES, 
  GOOGLE_FONTS_LINK_NOTO_SANS_JP, 
  TAILWIND_CDN_LINK, 
  FADE_IN_UP_ANIMATION_KEYFRAMES,
} from '../constants';

export class HtmlGenerator {

  private getSlideBaseHtml(title: string, headContent: string, bodyContent: string, bodyClasses: string): string {
    return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  ${GOOGLE_FONTS_LINK_NOTO_SANS_JP}
  ${TAILWIND_CDN_LINK}
  <style>
    /* Global font style to ensure Noto Sans JP is prioritized */
    body, html { 
      font-family: 'Noto Sans JP', sans-serif !important; 
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  </style>
  ${headContent}
</head>
<body class="${bodyClasses}">
  ${bodyContent}
</body>
</html>`;
  }

  private getCommonSlideStyles(includeAnimation: boolean = true): string {
    let animationCss = '';
    if (includeAnimation) {
        animationCss = FADE_IN_UP_ANIMATION_KEYFRAMES;
    }

    return `
    <style>
      body { margin: 0; padding: 0; color: ${TEXT_COLOR_DARK}; font-family: 'Noto Sans JP', sans-serif !important; }
      .slide-container {
        width: 100%;
        min-height: 100vh;
        max-width: 1280px; 
        margin: 0 auto; 
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden; 
        background-color: ${SLIDE_BACKGROUND_COLOR};
        color: ${TEXT_COLOR_DARK};
        padding: 40px 20px; 
        box-sizing: border-box;
      }
      .slide-section .slide-container {
         border-bottom: 1px solid #e0e0e0;
      }
      .slide-section .slide-container:last-child {
          border-bottom: none;
      }

      .slide-content-wrapper {
        width: 100%;
        max-width: 960px;
        z-index: 10; 
        text-align: left;
      }
      .${HIGHLIGHT_CLASS_NAME} { ${HIGHLIGHT_STYLES} }
      
      .deco-shape-1 {
        position: absolute;
        top: -60px;
        left: -60px;
        width: 220px;
        height: 220px;
        background: rgba(190, 18, 60, 0.03);
        clip-path: polygon(0 0, 100% 0, 0 100%);
        z-index: 1;
        transform: rotate(-15deg);
      }
      .deco-shape-2 {
        position: absolute;
        bottom: -70px;
        right: -70px;
        width: 280px;
        height: 280px;
        background: rgba(159, 18, 57, 0.025);
        clip-path: circle(40% at 60% 60%);
        z-index: 1;
        transform: rotate(15deg);
      }

      .slide-title { 
        font-size: 2.5rem; 
        font-weight: 700; 
        line-height: 1.2;
        letter-spacing: 0.01em;
        margin-bottom: 1.5rem; 
        text-align: center;
        color: ${ACCENT_COLOR_SECONDARY}; 
        padding-bottom: 0.5rem; 
        border-bottom: 2px solid ${ACCENT_COLOR_PRIMARY + '40'}; 
      }
      .slide-text-content {
         color: ${TEXT_COLOR_DARK}; 
         font-size: 1.125rem; 
         line-height: 1.7; 
      }
      .slide-text-content p { margin-bottom: 1rem; }
      .slide-text-content ul, .slide-text-content ol { margin-left: 1.25rem; margin-bottom: 1rem; }
      .slide-text-content li { margin-bottom: 0.5rem; }
      .slide-text-content strong { font-weight: 700; color: ${ACCENT_COLOR_PRIMARY}; }
      .slide-text-content blockquote { 
        border-left: 4px solid ${ACCENT_COLOR_PRIMARY}; 
        padding-left: 1rem; 
        margin: 1rem 0; 
        font-style: italic; 
        color: ${TEXT_COLOR_MUTED};
      }
      .slide-meta-info { /* Container for notes and visual suggestions */
        margin-top: 1.5rem; /* Tailwind: mt-6 */
        padding-top: 1rem; /* Tailwind: pt-4 */
        border-top: 1px solid #e5e7eb; /* Tailwind: border-gray-200 */
        font-size: 0.875rem; /* Tailwind: text-sm */
      }
      .slide-meta-info h4 {
        font-weight: 600; /* semibold */
        color: ${ACCENT_COLOR_PRIMARY};
        margin-bottom: 0.5rem; /* mb-2 */
      }
      .slide-meta-info p, .slide-meta-info pre {
        color: ${TEXT_COLOR_MUTED};
        margin-bottom: 0.5rem; /* mb-2 */
        white-space: pre-wrap; /* Allow wrapping for long suggestions/notes */
        word-break: break-word;
      }
      
       @media (max-width: 1300px) {
        .slide-container { padding: 30px 15px; }
        .slide-title { font-size: 2.25rem; }
      }
      @media (max-width: 768px) {
        .slide-container { padding: 25px 10px; }
        .slide-title { font-size: 2rem !important; }
        .slide-content-wrapper { padding: 0 5px; }
        .slide-text-content { font-size: 1rem; }
      }
      ${animationCss}
    </style>
    `;
  }
  
  private applyHighlights(htmlContent: string, keywords?: string[]): string {
    if (!keywords || keywords.length === 0) return htmlContent;
    let newContent = htmlContent;
    keywords.forEach(keyword =>
      {
      if (keyword && typeof keyword === 'string' && keyword.trim() !== '') {
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(?<!<span class="${HIGHLIGHT_CLASS_NAME}">)(${escapedKeyword})(?![^<]*>|</span>)`, 'gi');
        newContent = newContent.replace(regex, `<span class="${HIGHLIGHT_CLASS_NAME}">$1</span>`);
      }
    });
    return newContent;
  }

  private generateSlideMetaInfoHtml(slide: SlideContent, animationClass: string = ''): string {
    let metaHtml = '';
    if (slide.visualElementSuggestion || slide.notes) {
      metaHtml += `<div class="slide-meta-info ${animationClass}">`;
      if (slide.visualElementSuggestion) {
        metaHtml += `<h4>提案ビジュアル:</h4><p>${slide.visualElementSuggestion}</p>`;
      }
      if (slide.notes) {
        metaHtml += `<h4 class="mt-2">スピーカーノート:</h4><p>${slide.notes}</p>`;
      }
      metaHtml += `</div>`;
    }
    return metaHtml;
  }


  public generateAnalysisMd(data: PresentationData): string {
    return `# ${data.presentationTitle} - 分析と構成設計\n\n${data.analysisAndDesignDocument}`;
  }

  public generateIndividualSlideHtml(slide: SlideContent, slideNumber: number, presentationTitle: string, totalSlides: number): string {
    const headContent = this.getCommonSlideStyles();
    const highlightedContent = this.applyHighlights(slide.contentHtml, slide.highlightedKeywords);
    const metaInfoHtml = this.generateSlideMetaInfoHtml(slide, 'animate-fadeInUp animate-delay-600');

    const bodyContent = `
  <div class="slide-container animate-fadeInUp">
    <div class="deco-shape-1 animate-fadeInUp animate-delay-200"></div>
    <div class="deco-shape-2 animate-fadeInUp animate-delay-400"></div>
    <div class="slide-content-wrapper">
      <h1 class="slide-title animate-fadeInUp animate-delay-200">${slide.title}</h1>
      <div class="slide-text-content animate-fadeInUp animate-delay-400">
        ${highlightedContent}
      </div>
      ${metaInfoHtml}
    </div>
    <div style="position: absolute; bottom: 15px; right: 20px; font-size: 0.85rem; color: ${TEXT_COLOR_MUTED}; z-index: 10;">
      ${slideNumber} / ${totalSlides}
    </div>
  </div>`;
    return this.getSlideBaseHtml(`${presentationTitle} - スライド ${slideNumber}: ${slide.title}`, headContent, bodyContent, `bg-[${PAGE_BACKGROUND_COLOR}]`);
  }

  public generateInteractivePresentationHtml(data: PresentationData): string {
    const slidesHtml = data.slides.map((slide, index) => {
      const highlightedContent = this.applyHighlights(slide.contentHtml, slide.highlightedKeywords);
      const metaInfoHtml = this.generateSlideMetaInfoHtml(slide);
      return `
        <div id="slide-${index}" class="slide-interactive-item absolute inset-0 transition-opacity duration-500 ease-in-out opacity-0 ${index === 0 ? 'opacity-100 current-slide' : ''}">
          <div class="slide-container" style="border-bottom: none;">
            <div class="deco-shape-1"></div>
            <div class="deco-shape-2"></div>
            <div class="slide-content-wrapper">
              <h1 class="slide-title">${slide.title}</h1>
              <div class="slide-text-content">${highlightedContent}</div>
              ${metaInfoHtml}
            </div>
            <div style="position: absolute; bottom: 15px; right: 20px; font-size: 0.85rem; color: ${TEXT_COLOR_MUTED}; z-index: 10;">
              ${index + 1} / ${data.slides.length}
            </div>
          </div>
        </div>`;
    }).join('');

    const headContent = `
      ${this.getCommonSlideStyles(false)} 
      <style>
        .interactive-presentation-canvas {
          position: relative;
          width: 100vw; /* Full viewport width */
          height: 100vh; /* Full viewport height */
          overflow: hidden;
          background-color: ${PAGE_BACKGROUND_COLOR};
          border: 6px solid ${ACCENT_COLOR_PRIMARY}; /* Wine-red border */
          box-sizing: border-box; /* Ensure border doesn't add to size */
        }
        .slide-interactive-item { pointer-events: none; }
        .slide-interactive-item.opacity-100 { pointer-events: auto; }
        
        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0,0,0,0.3);
          color: white;
          border: none;
          padding: 10px 12px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 100;
          font-size: 1.5rem;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-arrow:hover { background-color: rgba(0,0,0,0.5); }
        .nav-arrow.prev { left: 20px; }
        .nav-arrow.next { right: 20px; }
        .nav-arrow.disabled { opacity: 0.3; cursor: not-allowed; }

        .navigation-dots {
          position: absolute; /* Changed from fixed to be inside canvas */
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 100;
        }
        .nav-dot {
          width: 12px;
          height: 12px;
          background-color: rgba(0, 0, 0, 0.25);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s;
          border: 2px solid rgba(255,255,255,0.5);
        }
        .nav-dot:hover { background-color: rgba(0, 0, 0, 0.4); }
        .nav-dot.active {
          background-color: ${ACCENT_COLOR_PRIMARY}; 
          border-color: ${SLIDE_BACKGROUND_COLOR};
          transform: scale(1.1);
        }
      </style>
    `;
    const bodyContent = `
      <div class="interactive-presentation-canvas">
        ${slidesHtml}
        <button class="nav-arrow prev" id="prevSlideBtn" title="前のスライド">&#10094;</button>
        <button class="nav-arrow next" id="nextSlideBtn" title="次のスライド">&#10095;</button>
        <div class="navigation-dots" id="navDotsContainer">
          ${data.slides.map((_, index) => `<div class="nav-dot ${index === 0 ? 'active' : ''}" data-slide="${index}" title="スライド ${index+1}"></div>`).join('')}
        </div>
      </div>
      <script>
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide-interactive-item');
        const dots = document.querySelectorAll('.nav-dot');
        const prevBtn = document.getElementById('prevSlideBtn');
        const nextBtn = document.getElementById('nextSlideBtn');
        const totalSlides = slides.length;

        function updateNavButtons() {
            prevBtn.disabled = currentSlide === 0;
            prevBtn.classList.toggle('disabled', currentSlide === 0);
            nextBtn.disabled = currentSlide === totalSlides - 1;
            nextBtn.classList.toggle('disabled', currentSlide === totalSlides - 1);
        }

        function showSlide(index) {
          slides.forEach(s => s.classList.remove('opacity-100', 'current-slide'));
          dots.forEach(d => d.classList.remove('active'));
          
          slides[index].classList.add('opacity-100', 'current-slide');
          dots[index].classList.add('active');
          currentSlide = index;
          updateNavButtons();
        }
        
        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) showSlide(currentSlide - 1);
        });
        nextBtn.addEventListener('click', () => {
            if (currentSlide < totalSlides - 1) showSlide(currentSlide + 1);
        });

        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
            e.preventDefault();
            if (currentSlide < totalSlides - 1) showSlide(currentSlide + 1);
          } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            e.preventDefault();
            if (currentSlide > 0) showSlide(currentSlide - 1);
          }
        });
        
        dots.forEach(dot => {
          dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            showSlide(slideIndex);
          });
        });

        showSlide(0); 
      </script>
    `;
    return this.getSlideBaseHtml(`${data.presentationTitle} - インタラクティブ版`, headContent, bodyContent, `bg-[${PAGE_BACKGROUND_COLOR}] m-0 p-0 overflow-hidden`);
  }

  public generateDashboardIndexHtml(data: PresentationData, individualSlideFileNames: string[]): string {
    const headContent = `
      <style>
        body { 
            font-family: 'Noto Sans JP', sans-serif !important; 
            background-color: ${PAGE_BACKGROUND_COLOR}; 
            color: ${TEXT_COLOR_DARK}; 
            padding: 2rem; 
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .container { max-width: 900px; margin: auto; background-color: #ffffff; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 6px 18px rgba(0,0,0,0.06); border: 1px solid #e0e0e0; }
        h1 { font-size: 2.25rem; font-weight: 700; color: ${ACCENT_COLOR_SECONDARY}; margin-bottom: 2rem; text-align: center; }
        h2 { 
            font-size: 1.6rem; 
            font-weight: 700; 
            color: ${TEXT_COLOR_DARK}; 
            margin-top: 2.5rem; 
            margin-bottom: 1.25rem; 
            padding-bottom: 0.6rem; 
            border-bottom: 2px solid ${ACCENT_COLOR_PRIMARY}; 
        }
        ul { list-style: none; padding: 0; }
        li a { 
            display: block; 
            background-color: #f1f3f5;
            color: ${TEXT_COLOR_MUTED}; 
            padding: 0.85rem 1.25rem; 
            margin-bottom: 0.6rem; 
            border-radius: 0.375rem; 
            text-decoration: none; 
            transition: all 0.2s ease-in-out; 
            border: 1px solid #dee2e6;
            font-weight: 500;
        }
        li a:hover { 
            background-color: #e9ecef;
            color: ${ACCENT_COLOR_PRIMARY}; 
            border-color: ${ACCENT_COLOR_PRIMARY}; 
            transform: translateY(-2px) scale(1.01); 
            box-shadow: 0 3px 8px rgba(0,0,0,0.04); 
        }
        .grid-container { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 1rem; }
        .main-links a { 
          font-size: 1.15rem; 
          padding: 1rem 1.5rem; 
          background-color: ${ACCENT_COLOR_PRIMARY}; 
          color: white !important; 
          border: none;
        }
        .main-links a:hover { 
          background-color: ${ACCENT_COLOR_SECONDARY}; 
          color: white !important;
          border: none;
        }
      </style>
    `;

    const individualSlidesLinks = individualSlideFileNames.map(fileName =>
      `<li><a href="./${fileName}" target="_blank" title="${fileName.replace('.html','')}を開く">${fileName.replace('.html','')}</a></li>`
    ).join('');

    const bodyContent = `
      <div class="container">
        <h1>${data.presentationTitle.replace(/"/g, '&quot;')} - ダッシュボード</h1>
        
        <h2>メインプレゼンテーション</h2>
        <ul class="main-links">
          <li><a href="./presentation.html" target="_blank">🎬 インタラクティブ版 (キー操作)</a></li>
        </ul>

        <h2>個別スライド (${data.slides.length})</h2>
        <ul class="grid-container">
          ${individualSlidesLinks}
        </ul>

        <h2>分析ドキュメント</h2>
        <ul>
           <li><a href="./分析と構成設計.md" target="_blank">📄 分析と構成設計ドキュメント (Markdown)</a></li>
        </ul>
      </div>
    `;
    return this.getSlideBaseHtml(`${data.presentationTitle} - ダッシュボード`, headContent, bodyContent, `bg-[${PAGE_BACKGROUND_COLOR}]`);
  }
}