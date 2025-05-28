"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { SessionData } from '@/hooks/use-session-recording'

interface SessionContextType {
  currentSession: SessionData | null
  setCurrentSession: (session: SessionData | null) => void
  selectedSessionId: string | null
  setSelectedSessionId: (id: string | null) => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [currentSession, setCurrentSession] = useState<SessionData | null>(null)
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)

  return (
    <SessionContext.Provider 
      value={{
        currentSession,
        setCurrentSession,
        selectedSessionId,
        setSelectedSessionId
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSessionContext() {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSessionContext must be used within a SessionProvider')
  }
  return context
}