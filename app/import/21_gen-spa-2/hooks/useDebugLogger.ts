import { useState, useCallback } from 'react';
import { DebugLog } from '../types';

export const useDebugLogger = () => {
  const [logs, setLogs] = useState<DebugLog[]>([]);

  const addLog = useCallback((level: DebugLog['level'], message: string, details?: any) => {
    const timestamp = new Date().toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const newLog: DebugLog = {
      timestamp,
      level,
      message,
      details
    };

    setLogs(prev => [...prev, newLog]);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const logInfo = useCallback((message: string, details?: any) => {
    addLog('info', message, details);
  }, [addLog]);

  const logWarning = useCallback((message: string, details?: any) => {
    addLog('warning', message, details);
  }, [addLog]);

  const logError = useCallback((message: string, details?: any) => {
    addLog('error', message, details);
  }, [addLog]);

  const logSuccess = useCallback((message: string, details?: any) => {
    addLog('success', message, details);
  }, [addLog]);

  return {
    logs,
    logInfo,
    logWarning,
    logError,
    logSuccess,
    clearLogs
  };
};