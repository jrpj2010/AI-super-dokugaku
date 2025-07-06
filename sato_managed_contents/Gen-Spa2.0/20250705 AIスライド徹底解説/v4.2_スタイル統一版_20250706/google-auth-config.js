// Google Slides API認証設定

// Google OAuth2.0設定
const GOOGLE_AUTH_CONFIG = {
    // 開発環境用（.envファイルから読み込み）
    development: {
        clientId: process.env.GOOGLE_CLIENT_ID || 'YOUR_DEV_CLIENT_ID',
        apiKey: process.env.GOOGLE_API_KEY || 'YOUR_DEV_API_KEY',
        scope: 'https://www.googleapis.com/auth/presentations https://www.googleapis.com/auth/drive.file',
        discoveryDocs: ['https://slides.googleapis.com/$discovery/rest?version=v1']
    },
    
    // 本番環境用（公開時のOAuth認証）
    production: {
        clientId: 'YOUR_PROD_CLIENT_ID.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/presentations https://www.googleapis.com/auth/drive.file',
        discoveryDocs: ['https://slides.googleapis.com/$discovery/rest?version=v1']
    }
};

// 環境判定
const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.protocol === 'file:';

// 現在の設定を取得
const getCurrentConfig = () => {
    return isDevelopment ? GOOGLE_AUTH_CONFIG.development : GOOGLE_AUTH_CONFIG.production;
};

// Google API Clientの初期化
async function initGoogleApiClient() {
    const config = getCurrentConfig();
    
    return new Promise((resolve, reject) => {
        gapi.load('client:auth2', async () => {
            try {
                await gapi.client.init({
                    apiKey: config.apiKey,
                    clientId: config.clientId,
                    discoveryDocs: config.discoveryDocs,
                    scope: config.scope
                });
                
                resolve(gapi);
            } catch (error) {
                reject(error);
            }
        });
    });
}

// 認証状態の確認
function isSignedIn() {
    return gapi.auth2.getAuthInstance().isSignedIn.get();
}

// サインイン処理
async function signIn() {
    const auth = gapi.auth2.getAuthInstance();
    try {
        await auth.signIn();
        return true;
    } catch (error) {
        console.error('Sign in failed:', error);
        return false;
    }
}

// サインアウト処理
async function signOut() {
    const auth = gapi.auth2.getAuthInstance();
    await auth.signOut();
}

// エクスポート
window.GoogleAuthConfig = {
    initGoogleApiClient,
    isSignedIn,
    signIn,
    signOut,
    getCurrentConfig
};