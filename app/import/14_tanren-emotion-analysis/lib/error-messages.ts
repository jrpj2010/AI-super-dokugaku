export interface MediaErrorMessages {
  permission: {
    title: string
    message: string
    actions: string[]
  }
  notFound: {
    title: string
    message: string
    actions: string[]
  }
  other: {
    title: string
    message: string
    actions: string[]
  }
}

export const mediaErrorMessages: MediaErrorMessages = {
  permission: {
    title: "📷 カメラとマイクの許可が必要です",
    message: "カメラとマイクへのアクセスが拒否されました。",
    actions: [
      "ブラウザのアドレスバーの左側にあるカメラアイコンをクリック",
      "「カメラ」と「マイク」の使用を許可",
      "ページを再読み込みして、もう一度お試しください"
    ]
  },
  notFound: {
    title: "🔌 デバイスが見つかりません",
    message: "カメラまたはマイクが見つかりません。",
    actions: [
      "デバイスが正しく接続されているか確認",
      "他のアプリケーションがデバイスを使用していないか確認",
      "デバイスドライバーが最新か確認"
    ]
  },
  other: {
    title: "⚠️ エラーが発生しました",
    message: "メディアデバイスへのアクセスに失敗しました。",
    actions: [
      "ブラウザを再起動してください",
      "他のタブやアプリケーションでカメラ・マイクを使用していないか確認",
      "問題が続く場合は、別のブラウザをお試しください"
    ]
  }
}

export function getMediaErrorMessage(errorType: 'permission' | 'notFound' | 'other', errorMessage?: string): string {
  const error = mediaErrorMessages[errorType]
  const actions = error.actions.map((action, index) => `${index + 1}. ${action}`).join('\n')
  
  return `${error.message}\n\n以下の手順で解決できる可能性があります：\n${actions}${errorMessage ? `\n\nエラー詳細: ${errorMessage}` : ''}`
}

export function getRecordingErrorMessage(error: Error): string {
  const errorMessage = error.message.toLowerCase()
  
  if (errorMessage.includes('mediarecorder') || errorMessage.includes('not supported')) {
    return `録画の開始に失敗しました: ${error.message}\n\nブラウザがMediaRecorder APIをサポートしているか確認してください。\n推奨ブラウザ: Chrome, Firefox, Edge`
  }
  
  if (errorMessage.includes('permission') || errorMessage.includes('denied')) {
    return getMediaErrorMessage('permission', error.message)
  }
  
  if (errorMessage.includes('not found') || errorMessage.includes('no device')) {
    return getMediaErrorMessage('notFound', error.message)
  }
  
  return `録画の開始中にエラーが発生しました:\n${error.message}\n\nカメラとマイクの権限を確認し、もう一度お試しください。`
}