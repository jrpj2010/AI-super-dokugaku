/**
 * 画像をBase64エンコードする関数
 * @param file 画像ファイル
 * @returns Base64エンコードされた文字列
 */
export function encodeImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64String = reader.result as string
      // data:image/jpeg;base64, の部分を削除
      const base64Data = base64String.split(",")[1]
      resolve(base64Data)
    }
    reader.onerror = (error) => reject(error)
  })
}

/**
 * Base64エンコードされた画像データをデコードしてBlobを作成
 * @param base64Data Base64エンコードされた画像データ
 * @param mimeType MIMEタイプ（デフォルトはJPEG）
 * @returns 画像のBlob
 */
export function decodeBase64ToBlob(base64Data: string, mimeType = "image/jpeg"): Blob {
  const byteCharacters = atob(base64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024)
    const byteNumbers = new Array(slice.length)

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, { type: mimeType })
}

/**
 * Base64エンコードされた画像データからURLを作成
 * @param base64Data Base64エンコードされた画像データ
 * @param mimeType MIMEタイプ（デフォルトはJPEG）
 * @returns 画像のURL
 */
export function createImageUrlFromBase64(base64Data: string, mimeType = "image/jpeg"): string {
  const blob = decodeBase64ToBlob(base64Data, mimeType)
  return URL.createObjectURL(blob)
}
