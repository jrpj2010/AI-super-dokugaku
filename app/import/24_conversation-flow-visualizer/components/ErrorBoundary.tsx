import React, { ReactNode, Component, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, errorInfo: ErrorInfo) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private maxRetries = 3;
  
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🚨 Error caught by boundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
    
    // 詳細なエラー情報をローカルストレージに保存
    this.logError(error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // 外部エラーハンドラーを呼び出し
    this.props.onError?.(error, errorInfo);
  }

  private logError(error: Error, errorInfo: ErrorInfo) {
    const errorLog = {
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    try {
      const existingLogs = JSON.parse(localStorage.getItem('errorLogs') || '[]');
      existingLogs.push(errorLog);
      // 最大100件まで保持
      if (existingLogs.length > 100) {
        existingLogs.splice(0, existingLogs.length - 100);
      }
      localStorage.setItem('errorLogs', JSON.stringify(existingLogs));
    } catch (e) {
      console.warn('Failed to log error to localStorage:', e);
    }
  }

  handleReset = () => {
    if (this.state.retryCount < this.maxRetries) {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: prevState.retryCount + 1
      }));
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  clearErrorLogs = () => {
    localStorage.removeItem('errorLogs');
    alert('エラーログを削除しました');
  };

  render() {
    if (this.state.hasError) {
      // カスタムフォールバックが提供されている場合はそれを使用
      if (this.props.fallback) {
        return this.props.fallback(this.state.error!, this.state.errorInfo!);
      }

      const canRetry = this.state.retryCount < this.maxRetries;
      const isDevelopment = process.env.NODE_ENV === 'development';

      // ダークテーマのエラー UI
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          padding: '40px 20px',
          backgroundColor: '#0a0a0a',
          color: '#ffffff',
          fontFamily: 'Inter, sans-serif'
        }}>
          {/* エラーアイコン */}
          <div style={{
            fontSize: '64px',
            marginBottom: '24px',
            opacity: 0.8
          }}>
            ⚠️
          </div>

          {/* エラータイトル */}
          <h2 style={{
            fontSize: '24px',
            fontWeight: 600,
            marginBottom: '16px',
            color: '#ef4444'
          }}>
            エラーが発生しました
          </h2>

          {/* エラー説明 */}
          <p style={{
            fontSize: '16px',
            color: '#9ca3af',
            marginBottom: '32px',
            textAlign: 'center',
            maxWidth: '500px',
            lineHeight: 1.6
          }}>
            アプリケーションで予期しないエラーが発生しました。
            {canRetry ? '再試行するか、' : ''}ページを再読み込みしてください。
          </p>

          {/* アクションボタン */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px'
          }}>
            {canRetry && (
              <button
                onClick={this.handleReset}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5856eb'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}
              >
                🔄 再試行 ({this.maxRetries - this.state.retryCount}回まで)
              </button>
            )}
            
            <button
              onClick={this.handleReload}
              style={{
                padding: '12px 24px',
                backgroundColor: '#374151',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#374151'}
            >
              🔃 ページを再読み込み
            </button>
          </div>

          {/* 開発環境でのみエラー詳細を表示 */}
          {isDevelopment && this.state.error && (
            <details style={{
              backgroundColor: '#1f2937',
              padding: '16px',
              borderRadius: '8px',
              marginTop: '16px',
              maxWidth: '800px',
              width: '100%',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              <summary style={{
                cursor: 'pointer',
                marginBottom: '12px',
                color: '#f87171'
              }}>
                エラー詳細 (開発モード)
              </summary>
              <div style={{
                whiteSpace: 'pre-wrap',
                color: '#e5e7eb',
                lineHeight: 1.4
              }}>
                <strong>エラー:</strong> {this.state.error.message}
                {this.state.error.stack && (
                  <>
                    <br /><br />
                    <strong>スタック:</strong>
                    <br />{this.state.error.stack}
                  </>
                )}
                {this.state.errorInfo?.componentStack && (
                  <>
                    <br /><br />
                    <strong>コンポーネントスタック:</strong>
                    <br />{this.state.errorInfo.componentStack}
                  </>
                )}
              </div>
            </details>
          )}

          {/* エラーログクリアボタン */}
          <button
            onClick={this.clearErrorLogs}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: '1px solid #374151',
              borderRadius: '6px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            エラーログを削除
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;