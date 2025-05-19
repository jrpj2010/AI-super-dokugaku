export type UserInputStatus = "idle" | "pending" | "processing" | "completed" | "error"

export interface UserInputItemType {
  id: string
  prompt: string
  status: UserInputStatus
  imageUrl?: string
  allImageUrls?: string[]
  errorMessage?: string
  progressMessage?: string
}

export interface SavedPrompt {
  id: string
  name: string
  prompt: string
  createdAt: string
  updatedAt: string
}

export interface AppSettings {
  concurrentLimit: number
  imageQuality: "low" | "medium" | "high"
  imageSize: "1024x1024" | "1536x1024" | "1024x1536"
  imagesPerPrompt: number
}
