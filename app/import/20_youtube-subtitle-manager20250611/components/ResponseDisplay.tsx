import React from 'react';
import { InformationCircleIcon } from './icons'; // Or a more suitable icon

interface ResponseDisplayProps {
  response: string | null;
  isLoading: boolean;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response, isLoading }) => {
  if (isLoading) {
    return null; // Loading spinner is handled in App.tsx
  }

  if (!response) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] bg-gray-800 text-gray-400 rounded-lg p-6 text-center">
        <InformationCircleIcon className="w-12 h-12 mb-4 text-blue-500"/>
        <p className="text-lg">AIからの応答待機中、または応答がありません。</p>
        <p className="text-sm">プロンプトを送信してください。(Waiting for AI response or no response yet. Please send a prompt.)</p>
      </div>
    );
  }

  // Basic markdown-like paragraph handling for newlines
  const paragraphs = response.split('\n').map((paragraph, index) => (
    <p key={index} className="whitespace-pre-wrap">{paragraph.trim() ? paragraph : <>&nbsp;</>}</p>
  ));

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-blue-400 mb-4">AIの応答 (AI Response)</h3>
      <div className="text-gray-200 leading-relaxed gemini-response-area">
        {paragraphs}
      </div>
    </div>
  );
};

export default ResponseDisplay;