# Feloスライドのリソース一括ダウンロード方法

## 1. Chrome拡張機能を使う方法

### Save All Resources 拡張機能
1. Chrome Web Storeから「Save All Resources」をインストール
2. Feloのスライドページを開く
3. 検証ツール（DevTools）を開く
4. 拡張機能のアイコンをクリック
5. すべてのリソースがZIPファイルとしてダウンロードされる

### Resource Saver 拡張機能（代替案）
- より高機能で、フォルダ構造を維持したまま保存可能

## 2. DevToolsの機能を使う方法

### Network タブからの一括保存
1. DevToolsを開く
2. Networkタブに移動
3. ページをリロード（Cmd+R）
4. すべてのリソースが読み込まれるまで待つ
5. 右クリック → "Save all as HAR with content"
6. HARファイルから個別のファイルを抽出

## 3. コンソールスクリプトでの取得

```javascript
// すべてのスクリプトタグを取得
const scripts = Array.from(document.querySelectorAll('script[src]'));
const links = Array.from(document.querySelectorAll('link[href]'));

// URLリストを作成
const resources = [
  ...scripts.map(s => s.src),
  ...links.map(l => l.href)
];

// コンソールに出力
console.log(resources.join('\n'));
```

## 4. Puppeteerを使った自動化

```javascript
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function downloadFeloResources(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // ネットワークリクエストを監視
  const resources = [];
  
  page.on('response', async (response) => {
    const url = response.url();
    if (response.status() === 200) {
      resources.push({
        url: url,
        type: response.request().resourceType()
      });
    }
  });
  
  await page.goto(url, { waitUntil: 'networkidle0' });
  
  // リソースをダウンロード
  for (const resource of resources) {
    try {
      const response = await axios.get(resource.url, { responseType: 'arraybuffer' });
      const filename = path.basename(new URL(resource.url).pathname) || 'index.html';
      fs.writeFileSync(`./downloaded/${filename}`, response.data);
    } catch (e) {
      console.error(`Failed to download: ${resource.url}`);
    }
  }
  
  await browser.close();
}
```

## 5. スライドごとのHTML取得方法

```javascript
// Feloのスライド構造を解析してHTML取得
async function captureSlideHTML() {
  const slides = [];
  
  // 各スライドのセレクタを特定（実際のセレクタに置き換え）
  const slideElements = document.querySelectorAll('.slide-container'); // 要調整
  
  slideElements.forEach((slide, index) => {
    slides.push({
      index: index + 1,
      html: slide.outerHTML,
      styles: getComputedStyles(slide)
    });
  });
  
  return slides;
}

// 計算済みスタイルも取得
function getComputedStyles(element) {
  const styles = window.getComputedStyle(element);
  const result = {};
  
  for (let i = 0; i < styles.length; i++) {
    const prop = styles[i];
    result[prop] = styles.getPropertyValue(prop);
  }
  
  return result;
}
```