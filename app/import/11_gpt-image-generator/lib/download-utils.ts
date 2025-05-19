// 画像ダウンロードユーティリティ
export async function downloadImage(urlOrBase64: string, filename: string): Promise<void> {
  let blob: Blob;
  
  // URLの場合とBase64の場合を判別
  if (urlOrBase64.startsWith('/api/') || urlOrBase64.startsWith('http')) {
    // URLから画像をフェッチ
    const response = await fetch(urlOrBase64);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    blob = await response.blob();
  } else {
    // Base64データURLから実際のBase64部分を抽出
    const base64String = urlOrBase64.split(',')[1] || urlOrBase64;
    
    // Base64をBlobに変換
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    blob = new Blob([byteArray], { type: 'image/png' });
  }
  
  // ダウンロードリンクを作成
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // クリックしてダウンロード
  document.body.appendChild(link);
  link.click();
  
  // クリーンアップ
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// タイムスタンプ付きファイル名を生成
export function generateFilename(prefix: string = 'generated'): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  return `${prefix}_${timestamp}.png`;
}

// 複数画像をZIPファイルとしてダウンロード
export async function downloadImagesAsZip(images: Array<{id: string, imageUrl: string, prompt: string}>, masterPrompt: string): Promise<void> {
  try {
    // JSZipライブラリを動的インポート
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    
    // 画像フォルダを作成
    const imagesFolder = zip.folder('images');
    if (!imagesFolder) return;
    
    // 各画像を追加
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      let imageData: string;
      
      // URLかBase64かを判別
      if (image.imageUrl.startsWith('/api/') || image.imageUrl.startsWith('http')) {
        // URLの場合は画像をフェッチ
        const response = await fetch(image.imageUrl);
        if (!response.ok) {
          console.error(`Failed to fetch image ${image.id}`);
          continue;
        }
        const blob = await response.blob();
        const buffer = await blob.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
        imageData = base64;
      } else {
        // Base64データURLの場合
        imageData = image.imageUrl.split(',')[1] || image.imageUrl;
      }
      
      const fileName = `image_${i + 1}_${image.id}.png`;
      imagesFolder.file(fileName, imageData, { base64: true });
    }
    
    // メタデータファイルを作成
    const metadata = {
      generatedAt: new Date().toISOString(),
      masterPrompt: masterPrompt,
      images: images.map((img, index) => ({
        id: img.id,
        fileName: `image_${index + 1}_${img.id}.png`,
        prompt: img.prompt,
      })),
    };
    
    zip.file('metadata.json', JSON.stringify(metadata, null, 2));
    
    // ZIPファイルを生成
    const content = await zip.generateAsync({ type: 'blob' });
    
    // ダウンロード
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = `generated_images_${new Date().toISOString().slice(0, 10)}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error creating ZIP file:', error);
    throw error;
  }
}