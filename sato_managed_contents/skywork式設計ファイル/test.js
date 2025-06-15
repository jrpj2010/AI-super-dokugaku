/**
 * 簡易テストスクリプト
 * Node.jsで実行: node test.js
 */

console.log('メッセージ徹底解析サイト - テストスクリプト');
console.log('=====================================\n');

// 各モジュールの存在確認
const fs = require('fs');
const path = require('path');

// チェックするファイル
const filesToCheck = [
  'index.html',
  'message_analysis.html',
  'structure_analysis.html',
  'practical_advice.html',
  'interactive_tool.html',
  'styles.css',
  'app.js',
  'analyzer.js',
  'visualizer.js',
  'interactive-tool.js',
  'practical-advice.js',
  'utils.js',
  'server.js'
];

console.log('📁 ファイル存在チェック:');
console.log('------------------------');

let allFilesExist = true;

filesToCheck.forEach(file => {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${file}`);
  
  if (!exists) {
    allFilesExist = false;
  }
});

console.log('\n📊 ファイルサイズチェック:');
console.log('-------------------------');

filesToCheck.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const sizeInKB = (stats.size / 1024).toFixed(2);
    console.log(`${file}: ${sizeInKB} KB`);
  }
});

console.log('\n🔍 HTMLファイル検証:');
console.log('-------------------');

const htmlFiles = filesToCheck.filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 基本的なHTML構造チェック
    const hasDoctype = content.includes('<!DOCTYPE html>');
    const hasHtmlTag = content.includes('<html') && content.includes('</html>');
    const hasHeadTag = content.includes('<head>') && content.includes('</head>');
    const hasBodyTag = content.includes('<body>') && content.includes('</body>');
    const hasTitle = content.includes('<title>');
    
    console.log(`\n${file}:`);
    console.log(`  DOCTYPE: ${hasDoctype ? '✅' : '❌'}`);
    console.log(`  HTML tag: ${hasHtmlTag ? '✅' : '❌'}`);
    console.log(`  HEAD tag: ${hasHeadTag ? '✅' : '❌'}`);
    console.log(`  BODY tag: ${hasBodyTag ? '✅' : '❌'}`);
    console.log(`  TITLE tag: ${hasTitle ? '✅' : '❌'}`);
  }
});

console.log('\n🎨 CSS検証:');
console.log('-----------');

const cssFile = path.join(__dirname, 'styles.css');
if (fs.existsSync(cssFile)) {
  const content = fs.readFileSync(cssFile, 'utf8');
  
  // CSS変数の確認
  const hasRootVars = content.includes(':root');
  const hasPrimaryColor = content.includes('--primary');
  const hasResponsive = content.includes('@media');
  
  console.log(`CSS変数定義: ${hasRootVars ? '✅' : '❌'}`);
  console.log(`カラーパレット: ${hasPrimaryColor ? '✅' : '❌'}`);
  console.log(`レスポンシブ対応: ${hasResponsive ? '✅' : '❌'}`);
}

console.log('\n📝 JavaScript構文チェック:');
console.log('------------------------');

const jsFiles = filesToCheck.filter(f => f.endsWith('.js'));

jsFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    try {
      // ファイルを読み込んで基本的な構文エラーをチェック
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 簡易的な構文チェック
      const hasUnmatchedBrackets = (content.match(/\{/g) || []).length !== (content.match(/\}/g) || []).length;
      const hasUnmatchedParens = (content.match(/\(/g) || []).length !== (content.match(/\)/g) || []).length;
      const hasUnmatchedSquare = (content.match(/\[/g) || []).length !== (content.match(/\]/g) || []).length;
      
      console.log(`${file}: ${(!hasUnmatchedBrackets && !hasUnmatchedParens && !hasUnmatchedSquare) ? '✅ 構文OK' : '❌ 構文エラーの可能性'}`);
    } catch (error) {
      console.log(`${file}: ❌ 読み込みエラー`);
    }
  }
});

console.log('\n🌐 サーバー起動テスト:');
console.log('--------------------');
console.log('サーバーを起動するには以下のコマンドを実行してください:');
console.log('  node server.js');
console.log('\nその後、ブラウザで以下のURLにアクセス:');
console.log('  http://localhost:8080');

console.log('\n=====================================');
console.log('テスト完了！');

if (allFilesExist) {
  console.log('✅ すべてのファイルが正常に存在します。');
} else {
  console.log('❌ 一部のファイルが見つかりません。');
}

console.log('=====================================');