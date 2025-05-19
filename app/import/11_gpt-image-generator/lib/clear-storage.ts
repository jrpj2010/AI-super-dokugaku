// localStorageをクリアするユーティリティ
export function clearCorruptedStorage() {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return
  }
  
  const keysToCheck = ['image-generator-store', 'api-log-storage']
  
  keysToCheck.forEach(key => {
    try {
      const data = localStorage.getItem(key)
      if (data) {
        // 無効なデータのチェック
        if (data === '[object Object]' || typeof data !== 'string') {
          console.log(`Clearing invalid storage for key: ${key}`)
          localStorage.removeItem(key)
          return
        }
        
        // パースを試みて、失敗した場合は削除
        try {
          const parsed = JSON.parse(data)
          // パースは成功したが、形式が不正な場合も削除
          if (!parsed || typeof parsed !== 'object') {
            console.log(`Clearing malformed storage for key: ${key}`)
            localStorage.removeItem(key)
          }
        } catch {
          console.log(`Clearing corrupted storage for key: ${key}`)
          localStorage.removeItem(key)
        }
      }
    } catch (e) {
      console.error(`Error checking storage key ${key}:`, e)
      // エラーが発生した場合も削除を試みる
      try {
        localStorage.removeItem(key)
      } catch {}
    }
  })
}