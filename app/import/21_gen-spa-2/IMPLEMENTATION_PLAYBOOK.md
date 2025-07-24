# Gen-Spa 2.0 実装プレイブック

このドキュメントは、Gen-Spa 2.0の開発において繰り返し発生するパターンと、佐藤様から頻繁にいただく指示事項をまとめた実装ガイドラインです。

## 🎯 基本原則

### 1. デバッグファースト開発
- **必ずデバッグモードをデフォルトONで実装**
- エラーが発生したら、まず詳細なログを出力する機能を追加
- ユーザー（非技術者）でも理解できる日本語のエラーメッセージを表示

### 2. ユーザー設定可能性
- API キーなど重要な設定は**必ずユーザー側で設定可能**にする
- 設定画面（モーダル）を用意し、LocalStorageに保存
- サーバー側とクライアント側の両方で動作するよう実装

### 3. 日本語優先
- すべてのUI、エラーメッセージ、ログは**完全に日本語**で表示
- 技術用語も可能な限り日本語で説明を追加

## 📋 実装チェックリスト

### 新機能追加時の標準フロー

1. **型定義の追加** (`types.ts`)
   ```typescript
   // 必ず interface で型を定義
   export interface NewFeature {
     id: string;
     name: string;
     // 必要なプロパティを定義
   }
   ```

2. **サービスクラスの作成** (`services/`)
   ```typescript
   export class NewFeatureService {
     // LocalStorage操作
     static save(data: NewFeature): void { }
     static load(): NewFeature[] { }
     // API通信やビジネスロジック
   }
   ```

3. **UIコンポーネントの作成** (`components/`)
   - モーダルコンポーネント（設定・管理画面）
   - リアルタイムバリデーション
   - エラー表示UI（赤背景の警告ボックス）

4. **App.tsxへの統合**
   - 状態管理（useState）
   - 初期化処理（useEffect）
   - モーダルの表示制御

## 🐛 デバッグ機能の実装パターン

### 1. デバッグログシステム
```typescript
// 必須要素
interface DebugLog {
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
  details?: any;
}

// ログ表示UI
- 黒背景に黄色文字（視認性重視）
- コピー機能
- Markdownダウンロード機能
- タイムスタンプ付き
```

### 2. エラーハンドリング
```typescript
try {
  // 処理
} catch (error) {
  // 1. 技術的なエラーログ（開発者向け）
  console.error('Technical error:', error);
  
  // 2. ユーザー向け日本語エラーメッセージ
  logError('処理に失敗しました', {
    原因: 'APIキーが無効です',
    対処法: '設定画面から正しいAPIキーを入力してください'
  });
  
  // 3. UI上にエラー表示
  setError('エラーが発生しました。詳細はデバッグコンソールを確認してください。');
}
```

## 🔧 設定管理パターン

### 1. 設定モーダルの基本構造
```typescript
interface AppSettings {
  apiKey?: string;
  debugMode: boolean;
  selectedModel: string;
  customTemplates?: CustomTemplate[];  // 拡張可能
}

// LocalStorage保存
useEffect(() => {
  localStorage.setItem('genSpaSettings', JSON.stringify(appSettings));
}, [appSettings]);
```

### 2. カスタマイズ可能な要素
- APIキー（ユーザー入力）
- デバッグモード（ON/OFF）
- モデル選択（ドロップダウン）
- テンプレート管理（追加・編集・削除）

## 🚨 よくある実装ミスと対策

### 1. JSON解析エラー
**問題**: Gemini APIからのレスポンスが期待する形式と異なる

**対策**:
- 必須フィールドの存在確認
- フォールバック処理の実装
- 詳細なエラーログ出力

```typescript
// presentationTitleが欠落している場合のフォールバック
if (!parsedData.presentationTitle) {
  logWarning('presentationTitleが欠落しています。デフォルト値を使用します。');
  parsedData.presentationTitle = 'プレゼンテーション';
}
```

### 2. プロンプトテンプレートの形式エラー
**問題**: カスタムテンプレートが誤った形式でJSONを出力

**対策**:
- リアルタイムバリデーション
- 必須フィールドのチェック
- エラー表示UI

```typescript
const validatePromptContent = (content: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // 必須プレースホルダー
  if (!content.includes('{{USER_INPUT}}')) {
    errors.push('{{USER_INPUT}} プレースホルダーが必要です');
  }
  
  // 必須フィールド
  const requiredFields = ['presentationTitle', 'analysisAndDesignDocument', 'slides'];
  // チェック処理...
  
  return { isValid: errors.length === 0, errors };
};
```

## 🎨 UI/UXパターン

### 1. モーダルの基本構造
```tsx
<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh]">
    {/* ヘッダー */}
    <div className="flex justify-between items-center p-6 border-b">
      <h2 className="text-2xl font-bold">タイトル</h2>
      <button onClick={onClose}>&times;</button>
    </div>
    
    {/* コンテンツ */}
    <div className="p-6 overflow-y-auto">
      {/* 内容 */}
    </div>
  </div>
</div>
```

### 2. エラー表示
```tsx
{error && (
  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
    <h4 className="text-sm font-semibold text-red-700 mb-1">エラー:</h4>
    <p className="text-sm text-red-600">{error}</p>
  </div>
)}
```

### 3. 成功メッセージ
```tsx
{success && (
  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
    <p className="text-sm text-green-700">{success}</p>
  </div>
)}
```

## 📦 Docker対応

### 1. 環境変数の扱い
```javascript
// server.js
const apiKey = req.body?.apiKey || process.env.GEMINI_API_KEY || process.env.API_KEY;
```

### 2. ビルドとデプロイ
```bash
# 必ず実行する手順
docker compose build
docker compose up -d
```

## 🔄 実装の反復パターン

### 1. 機能追加フロー
1. 要件確認（ユーザーの要望を正確に理解）
2. 型定義追加
3. サービス層実装
4. UI実装
5. App.tsxへの統合
6. エラーハンドリング追加
7. デバッグ機能追加
8. 動作確認

### 2. エラー対応フロー
1. エラーログの詳細確認
2. デバッグログ機能の強化
3. フォールバック処理の追加
4. ユーザー向けエラーメッセージの改善
5. 再発防止のバリデーション追加

## 📝 コミュニケーションパターン

### ユーザーからよくある要望
1. 「デバッグモードをデフォルトで ON にして」
2. 「ユーザー側で API キーを設定できるようにして」
3. 「エラーの詳細を日本語で表示して」
4. 「設定を保存できるようにして」
5. 「カスタマイズ可能にして」

### 対応時の注意点
- 実装前に計画を提示する
- 日本語で分かりやすく説明
- 非技術者でも理解できる言葉を使う
- 画面キャプチャがあれば確認する

## 🔁 後方互換性とデータ移行

### カスタムテンプレートの自動移行パターン

#### 問題
ユーザーが作成したカスタムテンプレートが古い形式で保存されている場合、新しいバージョンでエラーになる。

#### 解決策
```typescript
// 移行処理の実装
static migrateOldTemplates(): boolean {
  // 1. 古い形式の検出
  if (template.content.includes('"slide_structure"')) {
    // 2. 新しい形式への変換
    const newContent = this.convertOldFormatToNew(template.content);
    // 3. 保存と通知
    this.log('success', 'テンプレートを新形式に変換しました');
  }
}

// App.tsx での初期化時チェック
useEffect(() => {
  const hasMigrated = PromptTemplateService.migrateOldTemplates();
  if (hasMigrated) {
    logSuccess('カスタムテンプレートの移行が完了しました。3秒後に自動的にページを再読み込みします...');
    // 自動リロードでLocalStorageの変更を反映
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
}, []);
```

#### 移行時の注意点
1. **ユーザーデータの保護**
   - 元のデータは変更せず、新しい形式にコピー
   - 移行失敗時は元のデータを保持

2. **透明性の確保**
   - 移行処理をデバッグログに出力
   - ユーザーに移行完了を通知

3. **段階的移行**
   - 完全な置き換えではなく、必要な部分のみ修正
   - 説明文に「(自動変換済み)」を追加

## 🎨 汎用プロンプト対応（Katsu-Spa 3.0）

### 実装内容
1. **アプリ名の変更**
   - Gen-Spa 2.0 → Katsu-Spa 3.0
   - App.tsx、index.html、PromptTemplateModal内の名称を統一

2. **プロンプトバリデーションの柔軟化**
   - エラーレベル：作成不可（必須項目の欠落）
   - 警告レベル：作成可能だが推奨形式ではない
   - ValidationResult型で詳細な結果を返す

3. **テンプレートタイプの導入**
   ```typescript
   templateType?: 'gen-spa' | 'marp' | 'generic'
   ```
   - gen-spa: 従来のJSON形式
   - marp: MARPプレゼンテーション形式
   - generic: 汎用テキスト形式

4. **GeminiServiceの拡張**
   - detectResponseType: レスポンス形式の自動検出
   - processMarpResponse: MARP形式の処理
   - processGenericResponse: 汎用形式の処理

### バグ修正履歴（2025年7月24日）
5. **Generic形式レスポンス処理の改善**
   - rawJson未定義エラーの修正（rawResponse使用に変更）
   - JSON解析失敗時の汎用形式フォールバック処理を追加
   - 長いJSONデータの適切な分割処理を実装
   - 構造化データ（JSON配列）の自動スライド化機能を追加

6. **自動リロードループの修正**
   - 移行完了フラグをLocalStorageで管理（template-migration-version）
   - 既に変換済みのテンプレートを重複変換しないよう条件を改善
   - 無限リロードループを防止

### ユーザーからの要望パターン
- 「色々なシステムプロンプトに対応してほしい」
- 「好きなプロンプトを入力できるようにして」
- 「警告が出ても作成できるようにして」

## 🚀 今後の実装で注意すべきこと

1. **新機能は必ずカスタマイズ可能に**
   - ハードコードを避ける
   - 設定画面から変更可能にする

2. **エラー処理は徹底的に**
   - try-catch を適切に使用
   - ユーザーフレンドリーなメッセージ
   - デバッグ情報の記録

3. **型安全性の確保**
   - TypeScript の型定義を正確に
   - any 型の使用を最小限に

4. **テスト容易性**
   - 各機能を独立してテスト可能に
   - デモ用のテストデータを用意

5. **後方互換性の維持**
   - データ形式を変更する際は移行処理を実装
   - ユーザーのカスタマイズを尊重

このプレイブックは、実装経験に基づいて継続的に更新してください。