"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { v4 as uuidv4 } from "uuid"

export interface GenerationHistoryItem {
  id: string
  createdAt: string
  masterPrompt: string
  userInputs: Array<{
    id: string
    prompt: string
    imageUrl?: string
    status: "pending" | "processing" | "completed" | "error"
    error?: string
  }>
  settings: {
    quality: string
    size: string
    imagesPerPrompt: number
    concurrentLimit: number
  }
  totalImages: number
  successCount: number
  errorCount: number
}

interface HistoryStore {
  history: GenerationHistoryItem[]
  maxHistory: number
  
  addHistory: (item: Omit<GenerationHistoryItem, "id" | "createdAt">) => string
  updateHistory: (id: string, updates: Partial<GenerationHistoryItem>) => void
  deleteHistory: (id: string) => void
  clearHistory: () => void
  getHistory: (id: string) => GenerationHistoryItem | undefined
  exportHistory: () => string
  importHistory: (jsonData: string) => boolean
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      history: [],
      maxHistory: 50, // 最大50件まで保存
      
      addHistory: (item) => {
        const id = uuidv4()
        const newItem: GenerationHistoryItem = {
          ...item,
          id,
          createdAt: new Date().toISOString(),
        }
        
        set((state) => {
          const newHistory = [newItem, ...state.history]
          // 最大件数を超えたら古いものを削除
          if (newHistory.length > state.maxHistory) {
            newHistory.pop()
          }
          return { history: newHistory }
        })
        
        return id
      },
      
      updateHistory: (id, updates) => {
        set((state) => ({
          history: state.history.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        }))
      },
      
      deleteHistory: (id) => {
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        }))
      },
      
      clearHistory: () => {
        set({ history: [] })
      },
      
      getHistory: (id) => {
        return get().history.find((item) => item.id === id)
      },
      
      exportHistory: () => {
        const history = get().history
        return JSON.stringify(history, null, 2)
      },
      
      importHistory: (jsonData) => {
        try {
          const data = JSON.parse(jsonData)
          if (Array.isArray(data)) {
            set({ history: data })
            return true
          }
          return false
        } catch {
          return false
        }
      },
    }),
    {
      name: "image-generation-history",
      storage: {
        getItem: (name) => {
          try {
            if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
              return null
            }
            const storedData = localStorage.getItem(name)
            if (!storedData) return null
            
            // データが破損していないかチェック
            if (typeof storedData !== 'string' || storedData === '[object Object]') {
              console.warn(`Invalid storage data detected for ${name}, clearing...`)
              localStorage.removeItem(name)
              return null
            }
            
            // 安全なJSON.parseラッパー
            const safeJSONParse = (value: any, fallback: any) => {
              try {
                if (typeof value !== 'string') return value
                return JSON.parse(value)
              } catch (e) { 
                return fallback
              }
            }
            
            const data = safeJSONParse(storedData, null)
            return data
          } catch (e) {
            console.error("History storage getItem error:", e)
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
            localStorage.setItem(name, value)
            return Promise.resolve()
          } catch (e) {
            console.error("History storage setItem error:", e)
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
            console.error("History storage removeItem error:", e)
            return Promise.resolve()
          }
        },
      },
    }
  )
)