// Supabaseリアルタイム同期フック

import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';

// リアルタイムイベントタイプ
export enum RealtimeEvent {
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

// リアルタイム設定
export interface RealtimeConfig {
  table: string;
  filter?: string;
  events?: RealtimeEvent[];
}

// リアルタイムフックの戻り値
export interface UseRealtimeReturn<T> {
  data: T[];
  isConnected: boolean;
  error: Error | null;
  subscribe: () => void;
  unsubscribe: () => void;
}

// 汎用リアルタイムフック
export function useSupabaseRealtime<T extends { id: string }>(
  config: RealtimeConfig,
  onInsert?: (record: T) => void,
  onUpdate?: (record: T) => void,
  onDelete?: (record: T) => void
): UseRealtimeReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);

  // 初期データ取得
  const fetchInitialData = useCallback(async () => {
    try {
      let query = supabase.from(config.table).select('*');
      
      if (config.filter) {
        query = query.match(JSON.parse(config.filter));
      }

      const { data: initialData, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      
      setData(initialData || []);
    } catch (err) {
      setError(err as Error);
      console.error('Failed to fetch initial data:', err);
    }
  }, [config.table, config.filter]);

  // リアルタイム購読
  const subscribe = useCallback(() => {
    if (channelRef.current) {
      channelRef.current.unsubscribe();
    }

    const events = config.events || [RealtimeEvent.INSERT, RealtimeEvent.UPDATE, RealtimeEvent.DELETE];
    
    const channel = supabase.channel(`realtime:${config.table}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: config.table,
          ...(config.filter && { filter: config.filter })
        },
        (payload: RealtimePostgresChangesPayload<T>) => {
          const { eventType, new: newRecord, old: oldRecord } = payload;

          switch (eventType) {
            case 'INSERT':
              if (events.includes(RealtimeEvent.INSERT) && newRecord) {
                setData(prev => [...prev, newRecord as T]);
                onInsert?.(newRecord as T);
              }
              break;

            case 'UPDATE':
              if (events.includes(RealtimeEvent.UPDATE) && newRecord) {
                setData(prev => prev.map(item => 
                  item.id === (newRecord as T).id ? newRecord as T : item
                ));
                onUpdate?.(newRecord as T);
              }
              break;

            case 'DELETE':
              if (events.includes(RealtimeEvent.DELETE) && oldRecord) {
                setData(prev => prev.filter(item => item.id !== (oldRecord as T).id));
                onDelete?.(oldRecord as T);
              }
              break;
          }
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
        if (status === 'SUBSCRIBED') {
          fetchInitialData();
        }
      });

    channelRef.current = channel;
  }, [config, onInsert, onUpdate, onDelete, fetchInitialData]);

  // 購読解除
  const unsubscribe = useCallback(() => {
    if (channelRef.current) {
      channelRef.current.unsubscribe();
      channelRef.current = null;
      setIsConnected(false);
    }
  }, []);

  // 自動購読
  useEffect(() => {
    subscribe();
    
    return () => {
      unsubscribe();
    };
  }, [subscribe, unsubscribe]);

  return {
    data,
    isConnected,
    error,
    subscribe,
    unsubscribe
  };
}

// ハイライトのリアルタイム同期フック
export function useRealtimeHighlights(fileId: string) {
  const config: RealtimeConfig = {
    table: 'text_highlights',
    filter: JSON.stringify({ file_id: fileId })
  };

  return useSupabaseRealtime(config);
}

// 音声コメントのリアルタイム同期フック
export function useRealtimeComments(fileId: string) {
  const config: RealtimeConfig = {
    table: 'voice_comments',
    filter: JSON.stringify({ file_id: fileId })
  };

  return useSupabaseRealtime(config);
}

// セッション統計のリアルタイム同期フック
export function useRealtimeSessionStats(sessionId: string) {
  const [stats, setStats] = useState({
    activeSessions: 0,
    totalRecordings: 0,
    totalTranscriptions: 0,
    totalConversions: 0
  });

  useEffect(() => {
    const channel = supabase.channel(`session-stats:${sessionId}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'voice_sessions' },
        async () => {
          // セッション統計を更新
          const { count: sessionCount } = await supabase
            .from('voice_sessions')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'active');

          const { count: recordingCount } = await supabase
            .from('voice_recordings')
            .select('*', { count: 'exact', head: true })
            .eq('session_id', sessionId);

          const { count: transcriptionCount } = await supabase
            .from('transcriptions')
            .select('*', { count: 'exact', head: true });

          const { count: conversionCount } = await supabase
            .from('markdown_conversions')
            .select('*', { count: 'exact', head: true });

          setStats({
            activeSessions: sessionCount || 0,
            totalRecordings: recordingCount || 0,
            totalTranscriptions: transcriptionCount || 0,
            totalConversions: conversionCount || 0
          });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [sessionId]);

  return stats;
}

// ユーザーインタラクションのリアルタイム同期フック
export function useRealtimeInteractions(userId: string, limit: number = 10) {
  const [interactions, setInteractions] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // 初期データ取得
    const fetchInitial = async () => {
      const { data } = await supabase
        .from('user_interactions')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (data) {
        setInteractions(data);
      }
    };

    fetchInitial();

    // リアルタイム購読
    const channel = supabase.channel(`interactions:${userId}`)
      .on('postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'user_interactions',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          setInteractions(prev => {
            const updated = [payload.new, ...prev];
            return updated.slice(0, limit);
          });
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    return () => {
      channel.unsubscribe();
    };
  }, [userId, limit]);

  return { interactions, isConnected };
}

// プレゼンス（オンライン状態）フック
export function usePresence(fileId: string, userId: string, userInfo: any) {
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    const channel = supabase.channel(`presence:${fileId}`, {
      config: {
        presence: {
          key: userId
        }
      }
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const users = Object.values(state).flat();
        setOnlineUsers(users);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track(userInfo);
        }
      });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        channelRef.current.untrack();
        channelRef.current.unsubscribe();
      }
    };
  }, [fileId, userId, userInfo]);

  return onlineUsers;
}

// ブロードキャスト（メッセージ送信）フック
export function useBroadcast(channelName: string) {
  const channelRef = useRef<RealtimeChannel | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const channel = supabase.channel(channelName);
    
    channel.subscribe((status) => {
      setIsConnected(status === 'SUBSCRIBED');
    });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }
    };
  }, [channelName]);

  const broadcast = useCallback(async (event: string, payload: any) => {
    if (channelRef.current && isConnected) {
      await channelRef.current.send({
        type: 'broadcast',
        event,
        payload
      });
    }
  }, [isConnected]);

  const on = useCallback((event: string, callback: (payload: any) => void) => {
    if (channelRef.current) {
      channelRef.current.on('broadcast', { event }, callback);
    }
  }, []);

  return { broadcast, on, isConnected };
}

// 音声セッション同期フック
export function useRealtimeVoiceSession(sessionId: string) {
  const [sessionData, setSessionData] = useState<any>(null);
  const [participants, setParticipants] = useState<string[]>([]);
  const { broadcast, on, isConnected } = useBroadcast(`voice-session:${sessionId}`);

  // セッションデータの同期
  useEffect(() => {
    on('session-update', (payload) => {
      setSessionData(payload.sessionData);
    });

    on('participant-join', (payload) => {
      setParticipants(prev => [...prev, payload.userId]);
    });

    on('participant-leave', (payload) => {
      setParticipants(prev => prev.filter(id => id !== payload.userId));
    });
  }, [on]);

  // セッション更新の送信
  const updateSession = useCallback((data: any) => {
    broadcast('session-update', { sessionData: data });
  }, [broadcast]);

  // 参加者の追加/削除
  const joinSession = useCallback((userId: string) => {
    broadcast('participant-join', { userId });
  }, [broadcast]);

  const leaveSession = useCallback((userId: string) => {
    broadcast('participant-leave', { userId });
  }, [broadcast]);

  return {
    sessionData,
    participants,
    updateSession,
    joinSession,
    leaveSession,
    isConnected
  };
}

// リアルタイムカーソル同期フック
export function useRealtimeCursor(documentId: string, userId: string) {
  const [cursors, setCursors] = useState<Map<string, { position: number; color: string; name: string }>>(new Map());
  const { broadcast, on, isConnected } = useBroadcast(`cursor:${documentId}`);

  useEffect(() => {
    on('cursor-move', (payload) => {
      setCursors(prev => {
        const updated = new Map(prev);
        updated.set(payload.userId, {
          position: payload.position,
          color: payload.color,
          name: payload.name
        });
        return updated;
      });
    });

    on('cursor-leave', (payload) => {
      setCursors(prev => {
        const updated = new Map(prev);
        updated.delete(payload.userId);
        return updated;
      });
    });
  }, [on]);

  const updateCursorPosition = useCallback((position: number, color: string, name: string) => {
    broadcast('cursor-move', { userId, position, color, name });
  }, [broadcast, userId]);

  const removeCursor = useCallback(() => {
    broadcast('cursor-leave', { userId });
  }, [broadcast, userId]);

  return {
    cursors: Array.from(cursors.entries()).map(([id, data]) => ({ id, ...data })),
    updateCursorPosition,
    removeCursor,
    isConnected
  };
}