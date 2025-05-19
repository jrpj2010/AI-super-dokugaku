"use client"

import { create } from "zustand"

export interface DebugMessage {
  text: string
  timestamp: number
  count: number
}

interface ApiDebugStore {
  messages: DebugMessage[]
  addMessage: (text: string) => void
  clearMessages: () => void
}

export const useApiDebugStore = create<ApiDebugStore>((set, get) => ({
  messages: [],

  addMessage: (text: string) =>
    set((state) => {
      const messages = [...state.messages]
      const lastMessage = messages[messages.length - 1]

      // 同じメッセージが連続する場合はカウントを増やす
      if (lastMessage && lastMessage.text === text) {
        lastMessage.count += 1
        lastMessage.timestamp = Date.now()
        return { messages }
      }

      // 新しいメッセージを追加
      messages.push({
        text,
        timestamp: Date.now(),
        count: 1,
      })

      // 最大20件までメッセージを保持
      if (messages.length > 20) {
        messages.shift()
      }

      return { messages }
    }),

  clearMessages: () => set({ messages: [] }),
}))
