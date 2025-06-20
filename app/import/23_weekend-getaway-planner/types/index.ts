export interface OutingIdea {
  id: string;
  planName: string;
  description: string;
  category: string;
  activities: string[];
  estimatedCostSymbol: string;
  suggestedLocation: string;
  keywords: string[];
  imageUrl: string;
  priceRange?: string;
  url?: string;
}

export interface GeminiOutingPlan {
  planName: string;
  description: string;
  category: string;
  activities: string[];
  estimatedCostSymbol: string;
  suggestedLocation: string;
  keywords: string[];
}