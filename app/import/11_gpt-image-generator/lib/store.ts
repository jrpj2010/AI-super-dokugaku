"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { UserInputItemType, UserInputStatus, SavedPrompt } from "@/lib/types"
import type { ExtractedData } from "@/lib/csv-utils"
import { v4 as uuidv4 } from "uuid"

interface ImageStore {
  masterPrompt: string
  userInputs: UserInputItemType[]
  concurrentLimit: number
  dynamicConcurrency: boolean
  performanceMode: "stable" | "balanced" | "turbo" | "extreme"
  imageQuality: "auto" | "low" | "medium" | "high"
  imageSize: "auto" | "1024x1024" | "1536x1024" | "1024x1536"
  imagesPerPrompt: number
  savedPrompts: SavedPrompt[]
  openaiApiKey: string

  setMasterPrompt: (prompt: string) => void
  addUserInput: () => void
  bulkAddUserInputs: (data: string[] | ExtractedData[]) => void
  clearUserInputs: () => void
  removeUserInput: (id: string) => void
  updateUserInput: (id: string, update: string | Partial<UserInputItemType>) => void
  setUserInputStatus: (id: string, status: UserInputStatus, imageUrl?: string, errorMessage?: string) => void
  setConcurrentLimit: (limit: number) => void
  setDynamicConcurrency: (enabled: boolean) => void
  setPerformanceMode: (mode: "stable" | "balanced" | "turbo" | "extreme") => void
  setImageQuality: (quality: "auto" | "low" | "medium" | "high") => void
  setImageSize: (size: "auto" | "1024x1024" | "1536x1024" | "1024x1536") => void
  setImagesPerPrompt: (count: number) => void
  savePrompt: (name: string) => void
  loadPrompt: (id: string) => void
  deletePrompt: (id: string) => void
  setOpenaiApiKey: (apiKey: string) => void
  exportSettings: () => string
  importSettings: (settingsJson: string) => void
}

// 安全なJSON.parseラッパー
const safeJSONParse = (value: any, fallback: any) => {
  try {
    // valueが文字列でない場合は、そのまま返す
    if (typeof value !== 'string') {
      return value
    }
    return JSON.parse(value)
  } catch (e) {
    console.error("JSON parse error:", e)
    return fallback
  }
}


// 初期ユーザーインプットの作成関数
const createInitialUserInputs = () => {
  // 初期状態では空の配列を返す（空の枠を表示しない）
  return []
}

export const useImageStore = create<ImageStore>()(
  persist(
    (set, get) => ({
      masterPrompt: "",
      userInputs: createInitialUserInputs(),
      concurrentLimit: 8, // Tier 5の安全な並列数をデフォルトに
      dynamicConcurrency: true, // 動的並列数調整を有効化
      performanceMode: "balanced", // デフォルトはバランスモード（Tier 5推奨）
      imageQuality: "auto", // デフォルトを"auto"に変更
      imageSize: "auto", // デフォルトを"auto"に変更
      imagesPerPrompt: 1,
      savedPrompts: [],
      openaiApiKey: "",

      setMasterPrompt: (prompt) => set({ masterPrompt: prompt }),
      setOpenaiApiKey: (apiKey) => set({ openaiApiKey: apiKey }),
      setDynamicConcurrency: (enabled) => set({ dynamicConcurrency: enabled }),
      setPerformanceMode: (mode) => {
        // パフォーマンスモードに応じて並列数を自動調整
        // Tier 5の実際の制限に基づいて最適化
        const concurrencyMap = {
          stable: 5,     // 安定動作優先（推奨）
          balanced: 8,   // バランス型（Tier 5で安全な範囲）
          turbo: 12,     // 高速モード（リスクあり）
          extreme: 15    // 最大速度（レート制限ギリギリ）
        }
        set({ performanceMode: mode, concurrentLimit: concurrencyMap[mode] })
      },

      addUserInput: () =>
        set((state) => ({
          userInputs: [...state.userInputs, { id: uuidv4(), prompt: "", status: "idle" }],
        })),

      bulkAddUserInputs: (data) =>
        set((state) => {
          // string[]の場合（後方互換性）
          if (typeof data[0] === 'string') {
            return {
              userInputs: [
                ...state.userInputs,
                ...(data as string[]).map(prompt => ({
                  id: uuidv4(),
                  prompt,
                  status: "idle" as const
                }))
              ],
            }
          }
          // ExtractedData[]の場合（新形式）
          return {
            userInputs: [
              ...state.userInputs,
              ...(data as ExtractedData[]).map(item => ({
                id: uuidv4(),
                prompt: item.prompt,
                status: "idle" as const,
                managementNo: item.managementNo,
                fileName: item.fileName
              }))
            ],
          }
        }),
        
      clearUserInputs: () => set({ userInputs: [] }),
      
      removeUserInput: (id) =>
        set((state) => ({
          userInputs: state.userInputs.filter((input) => input.id !== id)
        })),

      updateUserInput: (id, update) =>
        set((state) => ({
          userInputs: state.userInputs.map((input) => {
            if (input.id !== id) return input
            
            // 文字列の場合はpromptの更新（後方互換性）
            if (typeof update === 'string') {
              return { ...input, prompt: update }
            }
            
            // オブジェクトの場合は部分更新
            return { ...input, ...update }
          }),
        })),

      setUserInputStatus: (id, status, imageUrl, errorMessage) =>
        set((state) => ({
          userInputs: state.userInputs.map((input) =>
            input.id === id ? { ...input, status, imageUrl, errorMessage } : input,
          ),
        })),

      setConcurrentLimit: (limit) => set({ concurrentLimit: limit }),
      setImageQuality: (quality) => set({ imageQuality: quality }),
      setImageSize: (size) => set({ imageSize: size }),
      setImagesPerPrompt: (count) => set({ imagesPerPrompt: count }),

      // マスタープロンプトを保存
      savePrompt: (name) => {
        try {
          const currentPrompt = get().masterPrompt
          if (!currentPrompt.trim()) return

          set((state) => {
            // savedPromptsが配列でない場合は初期化
            const safePrompts = Array.isArray(state.savedPrompts) ? state.savedPrompts : []

            // 同じ名前のプロンプトがあれば上書き
            const existingIndex = safePrompts.findIndex((p) => p?.name === name)
            if (existingIndex >= 0) {
              const updatedPrompts = [...safePrompts]
              updatedPrompts[existingIndex] = {
                ...updatedPrompts[existingIndex],
                prompt: currentPrompt,
                updatedAt: new Date().toISOString(),
              }
              return { savedPrompts: updatedPrompts }
            }

            // 新規保存
            return {
              savedPrompts: [
                ...safePrompts,
                {
                  id: uuidv4(),
                  name,
                  prompt: currentPrompt,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                },
              ],
            }
          })
        } catch (error) {
          console.error("Error saving prompt:", error)
          // エラーが発生しても状態を破壊しないようにする
        }
      },

      // 保存されたプロンプトを読み込み
      loadPrompt: (id) => {
        try {
          const state = get()
          const safePrompts = Array.isArray(state.savedPrompts) ? state.savedPrompts : []
          const prompt = safePrompts.find((p) => p?.id === id)
          if (prompt?.prompt) {
            set({ masterPrompt: prompt.prompt })
          }
        } catch (error) {
          console.error("Error loading prompt:", error)
        }
      },

      // 保存されたプロンプトを削除
      deletePrompt: (id) => {
        try {
          set((state) => {
            const safePrompts = Array.isArray(state.savedPrompts) ? state.savedPrompts : []
            return {
              savedPrompts: safePrompts.filter((p) => p?.id !== id),
            }
          })
        } catch (error) {
          console.error("Error deleting prompt:", error)
        }
      },

      // 設定のエクスポート
      exportSettings: () => {
        const state = get()
        const settings = {
          concurrentLimit: state.concurrentLimit,
          dynamicConcurrency: state.dynamicConcurrency,
          performanceMode: state.performanceMode,
          imageQuality: state.imageQuality,
          imageSize: state.imageSize,
          imagesPerPrompt: state.imagesPerPrompt,
          openaiApiKey: state.openaiApiKey,
          masterPrompt: state.masterPrompt,
          savedPrompts: state.savedPrompts,
          exportedAt: new Date().toISOString(),
          version: "1.0"
        }
        return JSON.stringify(settings, null, 2)
      },

      // 設定のインポート
      importSettings: (settingsJson: string) => {
        try {
          const settings = JSON.parse(settingsJson)
          
          // バージョンチェック
          if (settings.version !== "1.0") {
            throw new Error("サポートされていない設定ファイルバージョンです")
          }
          
          // 設定を適用
          set({
            concurrentLimit: settings.concurrentLimit || 20,
            dynamicConcurrency: settings.dynamicConcurrency ?? true,
            performanceMode: settings.performanceMode || "turbo",
            imageQuality: settings.imageQuality || "auto",
            imageSize: settings.imageSize || "auto",
            imagesPerPrompt: settings.imagesPerPrompt || 1,
            openaiApiKey: settings.openaiApiKey || "",
            masterPrompt: settings.masterPrompt || "",
            savedPrompts: settings.savedPrompts || []
          })
        } catch (error) {
          console.error("Error importing settings:", error)
          throw new Error("設定ファイルの読み込みに失敗しました")
        }
      },
    }),
    {
      name: "image-generator-store",
      storage: {
        getItem: (name) => {
          try {
            // ブラウザ環境チェック
            if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
              return null
            }
            
            const storedData = localStorage.getItem(name)
            if (!storedData) return null
            
            // 文字列でない場合や、既にオブジェクトである場合は削除してnullを返す
            if (typeof storedData !== 'string' || storedData === '[object Object]') {
              console.log('Invalid storage data detected, clearing...')
              localStorage.removeItem(name)
              return null
            }

            const data = safeJSONParse(storedData, null)
            if (!data) return null
            
            // データが既にオブジェクトの場合
            if (typeof data === 'object' && data !== null) {
              // クライアントサイドでuserInputsのIDを再生成
              if (data.state?.userInputs && typeof window !== 'undefined') {
                data.state.userInputs = data.state.userInputs.map((input: any) => ({
                  ...input,
                  id: input.id.startsWith('temp-') ? uuidv4() : input.id
                }))
              }
              return data
            }
            
            return null
          } catch (e) {
            console.error("Storage getItem error:", e)
            // エラーの場合はlocalStorageから削除
            try {
              localStorage.removeItem(name)
            } catch {}
            return null
          }
        },
        setItem: (name, value) => {
          try {
            if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
              return Promise.resolve()
            }
            // valueは既にJSON文字列なので、そのまま保存
            localStorage.setItem(name, value)
            return Promise.resolve()
          } catch (e) {
            console.error("Storage setItem error:", e)
            return Promise.resolve()
          }
        },
        removeItem: (name) => {
          try {
            if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
              return Promise.resolve()
            }
            localStorage.removeItem(name)
            return Promise.resolve()
          } catch (e) {
            console.error("Storage removeItem error:", e)
            return Promise.resolve()
          }
        },
      },
    },
  ),
)
