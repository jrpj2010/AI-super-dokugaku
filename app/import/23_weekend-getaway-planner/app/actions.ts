'use server'

import { GoogleGenerativeAI } from '@google/generative-ai';
import { OutingIdea, GeminiOutingPlan } from '@/types';
import { searchTourismSpots } from '@/lib/webFetcher';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ 
  model: process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite-preview-06-17' 
});

// フォールバック用の提案生成（観光地が見つからない場合）
async function generateFallbackIdeas(userInput: string): Promise<OutingIdea[]> {
  const prompt = `
ユーザーの要望に基づいて、週末お出かけプランを3つ提案してください。

ユーザーの要望: "${userInput}"

各プランについて、以下の形式でJSON配列として出力してください：
[
  {
    "planName": "プランの名前",
    "description": "プランの説明（2-3文）",
    "category": "プランのカテゴリ",
    "activities": ["活動1", "活動2", "活動3"],
    "estimatedCostSymbol": "¥～¥¥¥",
    "suggestedLocation": "主な場所",
    "keywords": ["キーワード1", "キーワード2"]
  }
]
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let jsonString = response.text().trim();

    // JSONを抽出
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonString.match(fenceRegex);
    if (match && match[1]) {
      jsonString = match[1].trim();
    }

    if (!jsonString.startsWith('[')) {
      const arrayMatch = jsonString.match(/(\[.*\])/s);
      if (arrayMatch && arrayMatch[1]) {
        jsonString = arrayMatch[1];
      }
    }

    const parsedPlans: GeminiOutingPlan[] = JSON.parse(jsonString);
    
    return parsedPlans.map((plan, index) => ({
      ...plan,
      id: `${Date.now()}-${index}`,
      imageUrl: `https://placehold.co/400x200/0066cc/ffffff?text=${encodeURIComponent(plan.category)}`,
    }));
  } catch (error) {
    console.error('Fallback generation error:', error);
    return [];
  }
}

export async function generateOutingIdeas(userInput: string): Promise<OutingIdea[]> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('APIキーが設定されていません。環境変数 GEMINI_API_KEY を確認してください。');
  }
  
  try {
    // Step 1: Webから観光情報を取得
    console.log('Searching tourism spots for:', userInput);
    const tourismSpots = await searchTourismSpots(userInput);
    
    if (tourismSpots.length === 0) {
      // 観光地が見つからない場合は、Geminiに提案を生成してもらう
      return generateFallbackIdeas(userInput);
    }
    
    // Step 2: 取得した観光情報をGeminiで分析・整理
    const spotsInfo = tourismSpots.map(spot => 
      `- ${spot.name}（${spot.location}）: ${spot.description}
        カテゴリ: ${spot.category}
        アクティビティ: ${spot.activities.join(', ') || 'なし'}
        価格帯: ${spot.priceRange || '不明'}
        URL: ${spot.url || 'なし'}`
    ).join('\n\n');
    
    const prompt = `
以下の実際の観光地情報を基に、ユーザーの要望に合った週末お出かけプランを3つ提案してください。
各プランは複数の観光地や活動を組み合わせた、1日または2日間の旅程として構成してください。

ユーザーの要望: "${userInput}"

利用可能な観光地情報:
${spotsInfo}

各プランについて、以下の形式でJSON配列として出力してください：
[
  {
    "planName": "プランの名前（観光地名を含む具体的な名前）",
    "description": "プランの説明（実際の観光地名を含む2-3文）",
    "category": "プランのカテゴリ",
    "activities": ["観光地1での活動", "観光地2での活動", "観光地3での活動"],
    "estimatedCostSymbol": "¥～¥¥¥",
    "suggestedLocation": "主な場所",
    "keywords": ["キーワード1", "キーワード2"]
  }
]

実際の観光地情報を活用し、具体的で実現可能なプランを提案してください。
観光地名は必ず含めてください。
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let jsonString = response.text().trim();

    // Remove Markdown code block fences if present
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonString.match(fenceRegex);
    if (match && match[1]) {
      jsonString = match[1].trim();
    }

    // Extract JSON array if not properly formatted
    if (!jsonString.startsWith('[')) {
      const arrayMatch = jsonString.match(/(\[.*\])/s);
      if (arrayMatch && arrayMatch[1]) {
        jsonString = arrayMatch[1];
      } else if (jsonString.includes('[]')) {
        return [];
      } else {
        console.warn('Gemini response was not a JSON array:', response.text());
        return [];
      }
    }

    // Handle empty array case
    if (jsonString === '' || jsonString === '[]') {
      return [];
    }

    const parsedPlans: GeminiOutingPlan[] = JSON.parse(jsonString);

    if (!Array.isArray(parsedPlans)) {
      console.warn('Parsed response is not an array:', parsedPlans);
      return [];
    }

    // 各プランに観光地の画像を使用
    return parsedPlans.map((plan, index) => {
      // 関連する観光地の画像を探す
      const relatedSpot = tourismSpots.find(spot => 
        plan.planName.includes(spot.name) || 
        plan.description.includes(spot.name) ||
        plan.activities.some(activity => activity.includes(spot.name))
      );

      return {
        ...plan,
        id: `${Date.now()}-${index}`,
        imageUrl: relatedSpot?.imageUrl || `https://placehold.co/400x200/0066cc/ffffff?text=${encodeURIComponent(plan.category)}`,
      };
    });

  } catch (error) {
    console.error('Error generating outing ideas:', error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
      throw new Error('無効なAPIキーです。正しいAPIキーが設定されているか確認してください。');
    }
    throw new Error('プランの生成中にエラーが発生しました。しばらくしてからもう一度お試しください。');
  }
}