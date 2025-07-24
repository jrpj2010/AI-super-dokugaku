import React, { useState, useEffect } from 'react';
import { PromptTemplate, ValidationResult } from '../types';
import { PromptTemplateService } from '../services/promptTemplateService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PromptTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTemplateUpdate: () => void;
}

export const PromptTemplateModal: React.FC<PromptTemplateModalProps> = ({
  isOpen,
  onClose,
  onTemplateUpdate
}) => {
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<PromptTemplate | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    content: ''
  });
  const [previewMode, setPreviewMode] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadTemplates();
    }
  }, [isOpen]);

  const loadTemplates = () => {
    const allTemplates = PromptTemplateService.getAllTemplates();
    setTemplates(allTemplates);
  };

  const handleEdit = async (template: PromptTemplate) => {
    try {
      const content = await PromptTemplateService.getTemplateContent(template);
      setEditingTemplate({
        ...template,
        content
      });
      setPreviewMode(false);
      setValidationResult(null);
    } catch (error) {
      alert('テンプレートの読み込みに失敗しました');
    }
  };

  const handleSaveEdit = () => {
    if (!editingTemplate) return;

    const validation = validatePromptContent(editingTemplate.content || '', detectTemplateType(editingTemplate.content || ''));
    setValidationResult(validation);
    
    if (!validation.canProceed) {
      alert('プロンプトに重大な問題があります。エラーを確認してください。');
      return;
    }
    
    if (validation.warnings.length > 0 && !confirm('警告があります。このまま保存しますか？')) {
      return;
    }

    PromptTemplateService.updateTemplate(editingTemplate.id, {
      name: editingTemplate.name,
      description: editingTemplate.description,
      content: editingTemplate.content
    });

    setEditingTemplate(null);
    setValidationResult(null);
    loadTemplates();
    onTemplateUpdate();
  };

  const handleDelete = (template: PromptTemplate) => {
    if (!PromptTemplateService.isDeletable(template)) {
      alert('デフォルトテンプレートは削除できません');
      return;
    }

    if (confirm(`「${template.name}」を削除してもよろしいですか？`)) {
      PromptTemplateService.deleteCustomTemplate(template.id);
      loadTemplates();
      onTemplateUpdate();
    }
  };

  const handleAddNew = () => {
    if (!newTemplate.name || !newTemplate.description || !newTemplate.content) {
      alert('すべてのフィールドを入力してください');
      return;
    }

    const validation = validatePromptContent(newTemplate.content);
    setValidationResult(validation);
    
    // エラーがある場合のみ作成を中止
    if (!validation.canProceed) {
      alert('プロンプトに重大な問題があります。エラーを確認してください。');
      return;
    }
    
    // 警告がある場合は確認
    if (validation.warnings.length > 0 && !confirm('警告があります。このまま作成しますか？')) {
      return;
    }

    PromptTemplateService.addCustomTemplate({
      id: '', // サービス側で生成される
      name: newTemplate.name,
      description: newTemplate.description,
      content: newTemplate.content,
      isCustom: true,
      templateType: detectTemplateType(newTemplate.content)
    });

    setNewTemplate({ name: '', description: '', content: '' });
    setShowAddForm(false);
    setValidationResult(null);
    loadTemplates();
    onTemplateUpdate();
  };

  const getDefaultPromptContent = () => {
    return `あなたは「Katsu-Spa 3.0」、完全自律型の日本語プレゼンテーション生成システムです。

入力テキスト:
\`\`\`
{{USER_INPUT}}
\`\`\`

以下のステップを精密に実行し、約 {{NUM_SLIDES}} 枚のスライドを生成してください:

**重要: 最初に必ずプレゼンテーション全体のタイトル（presentationTitle）を決定してください。**

1. **プレゼンテーションタイトルの決定 (日本語):**
   - 入力テキストの内容を分析し、プレゼンテーション全体を端的に表現するタイトルを決定してください。

2. **戦略分析と構成設計 (Markdown形式、日本語):**
   - 内容を分析し、キーメッセージを抽出します。
   - ストーリーラインを構築します。

3. **スライドコンテンツ生成 (HTML構造化、日本語):**
   - 各スライドのタイトルと内容を生成します。
   - Tailwind CSSを使用したスタイリングを適用します。

**出力形式 (厳密なJSON):**
\`\`\`json
{
  "presentationTitle": "string (必須: 日本語のプレゼンテーションタイトル)",
  "analysisAndDesignDocument": "string (Markdown形式のコンテンツ)",
  "slides": [
    {
      "slideNumber": "number",
      "title": "string (日本語のタイトル)",
      "contentHtml": "string (HTMLコンテンツ)",
      "highlightedKeywords": ["string"],
      "visualElementSuggestion": "string",
      "layoutType": "string (任意)",
      "notes": "string (任意)"
    }
  ]
}
\`\`\``;
  };

  const detectTemplateType = (content: string): 'gen-spa' | 'marp' | 'generic' => {
    // MARP形式の検出
    if (content.includes('marp:') || content.includes('---') && content.includes('paginate:')) {
      return 'marp';
    }
    // Gen-Spa形式の検出
    if (content.includes('presentationTitle') && content.includes('analysisAndDesignDocument')) {
      return 'gen-spa';
    }
    // その他は汎用形式
    return 'generic';
  };

  const validatePromptContent = (content: string, templateType?: string): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // MARPやGeneric形式の場合は警告のみ
    const isGenSpaFormat = templateType === 'gen-spa' || (!templateType && content.includes('presentationTitle'));
    
    // プレースホルダーのチェック（警告レベル）
    if (!content.includes('{{USER_INPUT}}')) {
      warnings.push('{{USER_INPUT}} プレースホルダーが推奨されます');
    }
    if (!content.includes('{{NUM_SLIDES}}')) {
      warnings.push('{{NUM_SLIDES}} プレースホルダーが推奨されます');
    }
    
    // Gen-Spa形式の場合のみフィールドチェック（警告レベル）
    if (isGenSpaFormat) {
      const requiredFields = ['presentationTitle', 'analysisAndDesignDocument', 'slides'];
      for (const field of requiredFields) {
        if (!content.includes(`"${field}"`)) {
          warnings.push(`Gen-Spa形式: フィールド "${field}" が推奨されます`);
        }
      }
      
      // スライド構造のチェック
      const slideFields = ['slideNumber', 'title', 'contentHtml'];
      for (const field of slideFields) {
        if (!content.includes(`"${field}"`)) {
          warnings.push(`Gen-Spa形式: スライドフィールド "${field}" が推奨されます`);
        }
      }
    }
    
    // 最低限のチェック（エラーレベル）
    if (content.trim().length < 50) {
      errors.push('プロンプトが短すぎます（最低50文字以上）');
    }
    
    return {
      level: errors.length > 0 ? 'error' : warnings.length > 0 ? 'warning' : 'info',
      errors,
      warnings,
      isValid: errors.length === 0,
      canProceed: errors.length === 0 // エラーがなければ続行可能
    };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* ヘッダー */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">プロンプトテンプレート管理</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* メインコンテンツ */}
        <div className="flex-1 overflow-hidden flex">
          {/* 左側：テンプレート一覧 */}
          <div className="w-1/3 border-r overflow-y-auto p-4">
            <button
              onClick={() => {
                setShowAddForm(true);
                setEditingTemplate(null);
                setValidationResult(null);
                setNewTemplate({
                  name: '',
                  description: '',
                  content: getDefaultPromptContent()
                });
              }}
              className="w-full mb-4 px-4 py-2 bg-rose-700 text-white rounded-lg hover:bg-rose-800 transition-colors"
            >
              + 新規テンプレート作成
            </button>

            <div className="space-y-2">
              {templates.map(template => (
                <div
                  key={template.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    editingTemplate?.id === template.id
                      ? 'border-rose-500 bg-rose-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleEdit(template)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {template.name}
                        {template.isCustom && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            カスタム
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                    </div>
                    {PromptTemplateService.isDeletable(template) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(template);
                        }}
                        className="ml-2 text-red-500 hover:text-red-700"
                        title="削除"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右側：編集エリア */}
          <div className="flex-1 overflow-y-auto p-6">
            {showAddForm ? (
              // 新規作成フォーム
              <div>
                <h3 className="text-xl font-semibold mb-4">新規テンプレート作成</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      テンプレート名
                    </label>
                    <input
                      type="text"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-600 focus:border-rose-600"
                      placeholder="例: ミニマルスタイル"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      説明
                    </label>
                    <input
                      type="text"
                      value={newTemplate.description}
                      onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-600 focus:border-rose-600"
                      placeholder="例: シンプルで洗練されたデザインのプレゼンテーション"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      プロンプト内容
                    </label>
                    <textarea
                      value={newTemplate.content}
                      onChange={(e) => {
                        setNewTemplate({ ...newTemplate, content: e.target.value });
                        const validation = validatePromptContent(e.target.value, detectTemplateType(e.target.value));
                        setValidationResult(validation);
                      }}
                      className="w-full h-96 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-600 focus:border-rose-600 font-mono text-sm"
                      placeholder="プロンプトの内容を入力..."
                    />
                  </div>
                  
                  {/* バリデーション結果表示 */}
                  {validationResult && (validationResult.errors.length > 0 || validationResult.warnings.length > 0) && (
                    <div className={`p-3 rounded-md ${
                      validationResult.level === 'error' 
                        ? 'bg-red-50 border border-red-200' 
                        : 'bg-yellow-50 border border-yellow-200'
                    }`}>
                      {validationResult.errors.length > 0 && (
                        <>
                          <h4 className="text-sm font-semibold text-red-700 mb-1">エラー:</h4>
                          <ul className="list-disc list-inside text-sm text-red-600 space-y-1 mb-2">
                            {validationResult.errors.map((error, index) => (
                              <li key={`error-${index}`}>{error}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {validationResult.warnings.length > 0 && (
                        <>
                          <h4 className="text-sm font-semibold text-yellow-700 mb-1">警告:</h4>
                          <ul className="list-disc list-inside text-sm text-yellow-600 space-y-1">
                            {validationResult.warnings.map((warning, index) => (
                              <li key={`warning-${index}`}>{warning}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setNewTemplate({ name: '', description: '', content: '' });
                        setValidationResult(null);
                      }}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      キャンセル
                    </button>
                    <button
                      onClick={handleAddNew}
                      className="px-4 py-2 bg-rose-700 text-white rounded-md hover:bg-rose-800"
                    >
                      作成
                    </button>
                  </div>
                </div>
              </div>
            ) : editingTemplate ? (
              // 編集フォーム
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">
                    {editingTemplate.isCustom ? 'カスタムテンプレート編集' : 'テンプレート編集'}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={previewMode}
                        onChange={(e) => setPreviewMode(e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-600">プレビュー</span>
                    </label>
                  </div>
                </div>

                {!editingTemplate.isCustom && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700">
                    <strong>注意:</strong> デフォルトテンプレートを編集すると、カスタムテンプレートとして保存されます。
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      テンプレート名
                    </label>
                    <input
                      type="text"
                      value={editingTemplate.name}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-600 focus:border-rose-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      説明
                    </label>
                    <input
                      type="text"
                      value={editingTemplate.description}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, description: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-600 focus:border-rose-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      プロンプト内容 {previewMode && '（プレビュー）'}
                    </label>
                    {previewMode ? (
                      <div className="w-full h-96 p-4 border border-gray-300 rounded-md overflow-y-auto bg-gray-50">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-sm max-w-none">
                          {editingTemplate.content || ''}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <textarea
                        value={editingTemplate.content || ''}
                        onChange={(e) => {
                          setEditingTemplate({ ...editingTemplate, content: e.target.value });
                          const validation = validatePromptContent(e.target.value, detectTemplateType(e.target.value));
                          setValidationResult(validation);
                        }}
                        className="w-full h-96 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-600 focus:border-rose-600 font-mono text-sm"
                      />
                    )}
                  </div>
                  
                  {/* バリデーション結果表示 */}
                  {validationResult && (validationResult.errors.length > 0 || validationResult.warnings.length > 0) && (
                    <div className={`p-3 rounded-md ${
                      validationResult.level === 'error' 
                        ? 'bg-red-50 border border-red-200' 
                        : 'bg-yellow-50 border border-yellow-200'
                    }`}>
                      {validationResult.errors.length > 0 && (
                        <>
                          <h4 className="text-sm font-semibold text-red-700 mb-1">エラー:</h4>
                          <ul className="list-disc list-inside text-sm text-red-600 space-y-1 mb-2">
                            {validationResult.errors.map((error, index) => (
                              <li key={`error-${index}`}>{error}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {validationResult.warnings.length > 0 && (
                        <>
                          <h4 className="text-sm font-semibold text-yellow-700 mb-1">警告:</h4>
                          <ul className="list-disc list-inside text-sm text-yellow-600 space-y-1">
                            {validationResult.warnings.map((warning, index) => (
                              <li key={`warning-${index}`}>{warning}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setEditingTemplate(null);
                        setValidationResult(null);
                      }}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      キャンセル
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="px-4 py-2 bg-rose-700 text-white rounded-md hover:bg-rose-800"
                    >
                      保存
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // 初期状態
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>左側からテンプレートを選択するか、新規作成してください</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};