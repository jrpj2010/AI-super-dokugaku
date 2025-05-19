"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface APILogEntry {
  id: string
  timestamp: string
  type: "request" | "response" | "error" | "info"
  method: string
  url: string
  headers?: Record<string, string>
  body?: any
  status?: number
  response?: any
  error?: string
  duration?: number
}

interface APILogStore {
  logs: APILogEntry[]
  maxLogs: number
  
  addLog: (entry: Omit<APILogEntry, "id" | "timestamp">) => void
  clearLogs: () => void
  setMaxLogs: (max: number) => void
  exportLogs: () => string
}

export const useAPILogStore = create<APILogStore>()(
  persist(
    (set, get) => ({
      logs: [],
      maxLogs: 100, // 保存する最大ログ数
      
      addLog: (entry) => {
        const newLog: APILogEntry = {
          ...entry,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        }
        
        set((state) => {
          const newLogs = [newLog, ...state.logs].slice(0, state.maxLogs)
          return { logs: newLogs }
        })
      },
      
      clearLogs: () => set({ logs: [] }),
      
      setMaxLogs: (max) => set({ maxLogs: max }),
      
      exportLogs: () => {
        const logs = get().logs
        return JSON.stringify(logs, null, 2)
      },
    }),
    {
      name: "api-log-storage",
      storage: {
        getItem: (name) => {
          try {
            if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
              return null
            }
            
            const storedData = localStorage.getItem(name)
            if (!storedData) return null

            // 文字列でない場合や、既にオブジェクトである場合は削除してnullを返す
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
            console.error("Storage getItem error:", e)
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
    }
  )
)