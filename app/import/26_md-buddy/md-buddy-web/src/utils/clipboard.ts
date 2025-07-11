// クリップボード画像処理ユーティリティ

export interface ClipboardImageResult {
  success: boolean;
  fileName?: string;
  markdown?: string;
  error?: string;
}

/**
 * クリップボードから画像を取得してファイルとして保存
 */
export async function handleClipboardImagePaste(): Promise<ClipboardImageResult> {
  try {
    // クリップボードの内容を取得
    const clipboardItems = await navigator.clipboard.read();
    
    for (const clipboardItem of clipboardItems) {
      // 画像タイプを確認
      const imageType = clipboardItem.types.find(type => type.startsWith('image/'));
      
      if (imageType) {
        // 画像データを取得
        const blob = await clipboardItem.getType(imageType);
        
        // ファイル名を生成
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const extension = getExtensionFromMimeType(imageType);
        const fileName = `clipboard-image-${timestamp}.${extension}`;
        
        // 画像をローカルに保存（ここでは一時的にData URLとして処理）
        const dataUrl = await blobToDataUrl(blob);
        
        // Markdownリンクを生成
        const markdown = `![${fileName}](${dataUrl})`;
        
        return {
          success: true,
          fileName,
          markdown
        };
      }
    }
    
    return {
      success: false,
      error: 'クリップボードに画像が見つかりませんでした'
    };
    
  } catch (error: any) {
    console.error('クリップボード画像処理エラー:', error);
    return {
      success: false,
      error: error.message || 'クリップボードの読み取りに失敗しました'
    };
  }
}

/**
 * MIMEタイプから拡張子を取得
 */
function getExtensionFromMimeType(mimeType: string): string {
  const typeMap: { [key: string]: string } = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'image/bmp': 'bmp'
  };
  
  return typeMap[mimeType] || 'png';
}

/**
 * BlobをData URLに変換
 */
function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * ペーストイベントから画像を処理
 */
export async function handlePasteEvent(event: ClipboardEvent): Promise<ClipboardImageResult> {
  const items = event.clipboardData?.items;
  
  if (!items) {
    return {
      success: false,
      error: 'クリップボードデータがありません'
    };
  }
  
  // 画像アイテムを探す
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile();
      
      if (file) {
        // ファイル名を生成
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const extension = getExtensionFromMimeType(item.type);
        const fileName = `clipboard-image-${timestamp}.${extension}`;
        
        // 画像をData URLに変換
        const dataUrl = await blobToDataUrl(file);
        
        // Markdownリンクを生成
        const markdown = `![${fileName}](${dataUrl})`;
        
        return {
          success: true,
          fileName,
          markdown
        };
      }
    }
  }
  
  return {
    success: false,
    error: 'クリップボードに画像が見つかりませんでした'
  };
}

/**
 * クリップボードアクセス権限をチェック
 */
export async function checkClipboardPermissions(): Promise<boolean> {
  try {
    // Clipboard APIが利用可能かチェック
    if (!navigator.clipboard || !navigator.clipboard.read) {
      return false;
    }
    
    // 権限をチェック
    const permission = await navigator.permissions.query({
      name: 'clipboard-read' as PermissionName
    });
    
    return permission.state === 'granted' || permission.state === 'prompt';
    
  } catch (error) {
    console.warn('クリップボード権限チェックエラー:', error);
    return false;
  }
}