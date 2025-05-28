const fs = require('fs');

// テスト用の画像を作成（1x1の白いピクセル）
const testImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';

const testData = {
  image: testImageBase64,
  mimeType: 'image/png'
};

console.log('Testing emotion analysis API...');
console.log('URL: https://tanren-emotion-analysis-632969986222.asia-northeast1.run.app/api/analyze-emotion');
console.log('Payload:', JSON.stringify(testData, null, 2));

fetch('https://tanren-emotion-analysis-632969986222.asia-northeast1.run.app/api/analyze-emotion', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData)
})
.then(response => {
  console.log('Status:', response.status);
  return response.json();
})
.then(data => {
  console.log('Response:', JSON.stringify(data, null, 2));
})
.catch(error => {
  console.error('Error:', error);
});