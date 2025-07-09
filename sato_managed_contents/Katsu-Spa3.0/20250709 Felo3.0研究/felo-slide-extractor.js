// Felo スライド抽出スクリプト
// このスクリプトをFeloのページのコンソールで実行してください

(function() {
  console.log('🔍 Feloスライド構造解析開始...');
  
  // 1. まず主要なコンテナを特定
  function findSlideContainers() {
    const possibleSelectors = [
      '[data-slide]',
      '.slide',
      '.swiper-slide',
      '[class*="slide"]',
      'section',
      'article',
      '.page',
      '[class*="page"]'
    ];
    
    let containers = [];
    for (const selector of possibleSelectors) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        console.log(`✅ 発見: ${selector} (${elements.length}個)`);
        containers.push({selector, elements: Array.from(elements)});
      }
    }
    
    return containers;
  }
  
  // 2. 各スライドのHTMLと関連リソースを抽出
  function extractSlideData(slideElement, index) {
    const slideData = {
      index: index + 1,
      html: slideElement.outerHTML,
      text: slideElement.textContent.trim().substring(0, 100) + '...',
      images: [],
      styles: [],
      scripts: []
    };
    
    // 画像を抽出
    const images = slideElement.querySelectorAll('img');
    images.forEach(img => {
      slideData.images.push({
        src: img.src,
        alt: img.alt,
        className: img.className
      });
    });
    
    // インラインスタイルを抽出
    const elementsWithStyle = slideElement.querySelectorAll('[style]');
    elementsWithStyle.forEach(el => {
      slideData.styles.push({
        element: el.tagName,
        style: el.getAttribute('style')
      });
    });
    
    return slideData;
  }
  
  // 3. グローバルなスタイルシートを取得
  function extractGlobalStyles() {
    const styles = [];
    
    // <link>タグのスタイルシート
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      styles.push({
        type: 'external',
        href: link.href
      });
    });
    
    // <style>タグの内容
    document.querySelectorAll('style').forEach(style => {
      styles.push({
        type: 'inline',
        content: style.textContent
      });
    });
    
    return styles;
  }
  
  // 4. 全リソースURLを収集
  function collectAllResources() {
    const resources = {
      scripts: Array.from(document.querySelectorAll('script[src]')).map(s => s.src),
      stylesheets: Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href),
      images: Array.from(document.querySelectorAll('img')).map(i => i.src),
      fonts: []
    };
    
    // フォントを探す
    const styleSheets = document.styleSheets;
    for (let i = 0; i < styleSheets.length; i++) {
      try {
        const rules = styleSheets[i].cssRules || styleSheets[i].rules;
        for (let j = 0; j < rules.length; j++) {
          if (rules[j].cssText && rules[j].cssText.includes('@font-face')) {
            const fontUrl = rules[j].cssText.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (fontUrl) resources.fonts.push(fontUrl[1]);
          }
        }
      } catch (e) {
        console.warn('スタイルシートへのアクセスがブロックされました:', e);
      }
    }
    
    return resources;
  }
  
  // 5. 実行
  const containers = findSlideContainers();
  const globalStyles = extractGlobalStyles();
  const allResources = collectAllResources();
  
  // 最も可能性の高いスライドコンテナを選択
  let slides = [];
  if (containers.length > 0) {
    // 最も要素数が多いものを選択
    const bestContainer = containers.reduce((prev, current) => 
      current.elements.length > prev.elements.length ? current : prev
    );
    
    console.log(`\n📊 "${bestContainer.selector}" を使用してスライドを抽出します`);
    
    slides = bestContainer.elements.map((el, i) => extractSlideData(el, i));
  }
  
  // 結果をまとめる
  const result = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    slideCount: slides.length,
    slides: slides,
    globalStyles: globalStyles,
    resources: allResources,
    documentStructure: {
      title: document.title,
      bodyClasses: document.body.className,
      htmlClasses: document.documentElement.className
    }
  };
  
  // 結果を表示
  console.log('\n📋 解析結果:');
  console.log(result);
  
  // ダウンロード用のリンクを作成
  const blob = new Blob([JSON.stringify(result, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'felo-slides-data.json';
  a.click();
  
  console.log('\n✅ felo-slides-data.json としてダウンロードしました');
  
  // スライドHTMLを個別にダウンロードする関数
  window.downloadIndividualSlides = function() {
    slides.forEach((slide, i) => {
      const htmlBlob = new Blob([slide.html], {type: 'text/html'});
      const htmlUrl = URL.createObjectURL(htmlBlob);
      const a = document.createElement('a');
      a.href = htmlUrl;
      a.download = `slide-${String(i + 1).padStart(2, '0')}.html`;
      setTimeout(() => a.click(), i * 100); // 遅延を入れて順番にダウンロード
    });
    console.log(`\n✅ ${slides.length}個のスライドHTMLをダウンロードしました`);
  };
  
  console.log('\n💡 個別のスライドHTMLをダウンロードするには:');
  console.log('   downloadIndividualSlides() を実行してください');
  
  return result;
})();