// 完全なページダウンロードスクリプト
// Feloページの完全なコピーを作成するためのスクリプト

(function() {
  console.log('🚀 完全ページダウンローダー起動...');
  
  // 1. 現在のページの完全なHTMLを取得
  function getCompleteHTML() {
    // DOCTYPE宣言を含む完全なHTML
    const doctype = document.doctype;
    let doctypeString = '';
    if (doctype) {
      doctypeString = `<!DOCTYPE ${doctype.name}`;
      if (doctype.publicId) {
        doctypeString += ` PUBLIC "${doctype.publicId}"`;
      }
      if (doctype.systemId) {
        doctypeString += ` "${doctype.systemId}"`;
      }
      doctypeString += '>\n';
    }
    
    return doctypeString + document.documentElement.outerHTML;
  }
  
  // 2. すべてのリソースURLを絶対URLに変換
  function makeUrlsAbsolute(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const base = window.location.origin;
    
    // src属性を持つ要素
    doc.querySelectorAll('[src]').forEach(el => {
      const src = el.getAttribute('src');
      if (src && !src.startsWith('http') && !src.startsWith('data:')) {
        el.setAttribute('src', new URL(src, base).href);
      }
    });
    
    // href属性を持つ要素
    doc.querySelectorAll('[href]').forEach(el => {
      const href = el.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('data:')) {
        el.setAttribute('href', new URL(href, base).href);
      }
    });
    
    // スタイル内のURLも変換
    doc.querySelectorAll('style').forEach(style => {
      style.textContent = style.textContent.replace(
        /url\(['"]?(?!http|data:)([^'"]+)['"]?\)/g,
        (match, url) => `url('${new URL(url, base).href}')`
      );
    });
    
    return doc.documentElement.outerHTML;
  }
  
  // 3. インラインスタイルとして外部CSSを埋め込む
  async function embedExternalStyles(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const styleLinks = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'));
    
    for (const link of styleLinks) {
      try {
        const response = await fetch(link.href);
        const cssText = await response.text();
        
        // 新しいstyleタグを作成
        const styleTag = doc.createElement('style');
        styleTag.setAttribute('data-original-href', link.href);
        styleTag.textContent = cssText;
        
        // linkタグをstyleタグに置き換え
        link.parentNode.replaceChild(styleTag, link);
      } catch (e) {
        console.warn(`CSS読み込み失敗: ${link.href}`, e);
      }
    }
    
    return doc.documentElement.outerHTML;
  }
  
  // 4. 画像をBase64に変換して埋め込む（オプション）
  async function embedImages(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const images = Array.from(doc.querySelectorAll('img'));
    
    for (const img of images) {
      if (img.src && !img.src.startsWith('data:')) {
        try {
          const response = await fetch(img.src);
          const blob = await response.blob();
          const base64 = await blobToBase64(blob);
          img.src = base64;
        } catch (e) {
          console.warn(`画像変換失敗: ${img.src}`, e);
        }
      }
    }
    
    return doc.documentElement.outerHTML;
  }
  
  // Blob to Base64変換
  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  
  // 5. メイン実行関数
  async function downloadCompletePage(options = {}) {
    const {
      embedStyles = true,
      embedImagesAsBase64 = false,
      filename = 'felo-complete-page.html'
    } = options;
    
    console.log('📥 ページデータ取得中...');
    let html = getCompleteHTML();
    
    console.log('🔗 URL絶対パス変換中...');
    html = makeUrlsAbsolute(html);
    
    if (embedStyles) {
      console.log('🎨 外部スタイルシート埋め込み中...');
      html = await embedExternalStyles(html);
    }
    
    if (embedImagesAsBase64) {
      console.log('🖼️ 画像をBase64変換中...');
      html = await embedImages(html);
    }
    
    // ダウンロード
    const blob = new Blob([html], {type: 'text/html'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    
    console.log(`✅ ${filename} としてダウンロードしました`);
    
    return html;
  }
  
  // 6. リソースマップを作成
  function createResourceMap() {
    const resources = {
      scripts: [],
      stylesheets: [],
      images: [],
      fonts: [],
      others: []
    };
    
    // Performance APIを使用してロードされたリソースを取得
    const entries = performance.getEntriesByType('resource');
    entries.forEach(entry => {
      const url = entry.name;
      const type = entry.initiatorType;
      
      const resource = {
        url: url,
        type: type,
        size: entry.transferSize,
        duration: entry.duration
      };
      
      switch(type) {
        case 'script':
          resources.scripts.push(resource);
          break;
        case 'css':
        case 'link':
          resources.stylesheets.push(resource);
          break;
        case 'img':
        case 'image':
          resources.images.push(resource);
          break;
        case 'font':
          resources.fonts.push(resource);
          break;
        default:
          resources.others.push(resource);
      }
    });
    
    return resources;
  }
  
  // グローバル関数として公開
  window.feloDownloader = {
    downloadCompletePage,
    createResourceMap,
    getCompleteHTML,
    
    // 簡単実行用
    downloadAll: async function() {
      console.log('📦 完全バックアップ開始...');
      
      // リソースマップを作成
      const resourceMap = createResourceMap();
      const mapBlob = new Blob([JSON.stringify(resourceMap, null, 2)], {type: 'application/json'});
      const mapUrl = URL.createObjectURL(mapBlob);
      const mapLink = document.createElement('a');
      mapLink.href = mapUrl;
      mapLink.download = 'felo-resource-map.json';
      mapLink.click();
      
      // 完全なHTMLをダウンロード
      await downloadCompletePage({
        embedStyles: true,
        embedImagesAsBase64: false,
        filename: 'felo-complete-with-styles.html'
      });
      
      console.log('✅ すべてのダウンロードが完了しました！');
    }
  };
  
  console.log('\n📌 使用方法:');
  console.log('   feloDownloader.downloadAll() - すべてをダウンロード');
  console.log('   feloDownloader.downloadCompletePage() - HTMLのみ');
  console.log('   feloDownloader.createResourceMap() - リソース一覧取得');
  
})();