// バージョン情報を管理するユーティリティ
import packageJson from '../package.json'

export const APP_VERSION = packageJson.version || '1.1.2'
export const APP_NAME = 'TANREN'
export const VERSION_DISPLAY = `${APP_NAME} Ver ${APP_VERSION}`