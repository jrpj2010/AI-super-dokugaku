"use client"

import { useState, useEffect, useRef } from "react"
import { useAPILogStore } from "@/lib/api-log-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Trash2, ChevronDown, ChevronUp, Filter, AlertCircle, CheckCircle, Info } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function APILogViewer() {
  const { logs, clearLogs, exportLogs } = useAPILogStore()
  const [expandedLogs, setExpandedLogs] = useState<string[]>([])
  const [logFilter, setLogFilter] = useState<string>("all")
  const [autoScroll, setAutoScroll] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const scrollContentRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new logs are added
  useEffect(() => {
    if (autoScroll && scrollContentRef.current) {
      scrollContentRef.current.scrollTop = scrollContentRef.current.scrollHeight
    }
  }, [logs, autoScroll])

  const toggleExpand = (logId: string) => {
    setExpandedLogs(prev => 
      prev.includes(logId) 
        ? prev.filter(id => id !== logId)
        : [...prev, logId]
    )
  }

  const filteredLogs = logs.filter(log => {
    if (logFilter === "all") return true
    if (logFilter === "error") return log.type === "error" || log.status >= 400
    if (logFilter === "success") return log.type === "response" && log.status >= 200 && log.status < 300
    if (logFilter === "progress") return log.type === "info"
    return true
  })

  const downloadLogs = () => {
    const logsJson = exportLogs()
    const blob = new Blob([logsJson], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `api-logs-${new Date().toISOString()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "request": return "blue"
      case "response": return "green"
      case "error": return "red"
      case "info": return "gray"
      case "timeout": return "orange"
      default: return "gray"
    }
  }

  const getStatusColor = (status?: number) => {
    if (!status) return "gray"
    if (status >= 200 && status < 300) return "green"
    if (status >= 400) return "red"
    return "yellow"
  }

  const getLogIcon = (type: string, status?: number) => {
    if (type === "error" || (status && status >= 400)) {
      return <AlertCircle className="h-4 w-4 text-red-500" />
    }
    if (type === "response" && status && status >= 200 && status < 300) {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    }
    return <Info className="h-4 w-4 text-blue-500" />
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle>API 通信ログ</CardTitle>
          <div className="flex gap-2">
            <Select value={logFilter} onValueChange={setLogFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="フィルター" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    全て
                  </div>
                </SelectItem>
                <SelectItem value="error">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    エラー
                  </div>
                </SelectItem>
                <SelectItem value="success">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    成功
                  </div>
                </SelectItem>
                <SelectItem value="progress">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-500" />
                    進捗
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoScroll(!autoScroll)}
              className={autoScroll ? "bg-blue-50" : ""}
            >
              自動スクロール
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadLogs}
              disabled={logs.length === 0}
            >
              <Download className="h-4 w-4 mr-1" />
              ダウンロード
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearLogs}
              disabled={logs.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              クリア
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full" ref={scrollAreaRef}>
          <div ref={scrollContentRef}>
            {logs.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                ログがありません
              </p>
            ) : filteredLogs.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                フィルターに一致するログがありません
              </p>
            ) : (
              <div className="space-y-3">
                {filteredLogs.map(log => (
                  <div
                    key={log.id}
                    className={`border rounded-lg p-3 transition-colors ${
                      log.type === "error" || (log.status && log.status >= 400) 
                        ? "border-red-300 bg-red-50 hover:bg-red-100" 
                        : log.type === "response" && log.status && log.status >= 200 && log.status < 300
                        ? "border-green-300 bg-green-50 hover:bg-green-100"
                        : log.type === "info"
                        ? "border-blue-300 bg-blue-50 hover:bg-blue-100"
                        : "hover:bg-accent/50"
                    }`}
                  >
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleExpand(log.id)}
                    >
                      <div className="flex items-center gap-3">
                        {getLogIcon(log.type, log.status)}
                        <Badge 
                          variant="outline" 
                          className={
                            log.type === "error" || (log.status && log.status >= 400)
                              ? "text-red-600 border-red-600"
                              : log.type === "response" && log.status && log.status >= 200 && log.status < 300
                              ? "text-green-600 border-green-600"
                              : log.type === "info"
                              ? "text-blue-600 border-blue-600"
                              : ""
                          }
                        >
                          {log.type.toUpperCase()}
                        </Badge>
                        <span className="font-mono text-sm">
                          {log.method} {log.url}
                        </span>
                        {log.status && (
                          <Badge 
                            variant="outline" 
                            className={
                              log.status >= 200 && log.status < 300
                                ? "text-green-600 border-green-600"
                                : log.status >= 400
                                ? "text-red-600 border-red-600"
                                : "text-yellow-600 border-yellow-600"
                            }
                          >
                            {log.status}
                          </Badge>
                        )}
                        {log.duration && (
                          <span className="text-xs text-muted-foreground">
                            {log.duration}ms
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleTimeString('ja-JP', { 
                            hour: '2-digit', 
                            minute: '2-digit', 
                            second: '2-digit',
                            fractionalSecondDigits: 3
                          })}
                        </span>
                        {expandedLogs.includes(log.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  
                  {expandedLogs.includes(log.id) && (
                    <div className="mt-3 pt-3 border-t space-y-2">
                      {log.headers && (
                        <div>
                          <p className="text-sm font-semibold mb-1">Headers:</p>
                          <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                            {JSON.stringify(log.headers, null, 2)}
                          </pre>
                        </div>
                      )}
                      
                      {log.body && (
                        <div>
                          <p className="text-sm font-semibold mb-1">Request Body:</p>
                          <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                            {JSON.stringify(log.body, null, 2)}
                          </pre>
                        </div>
                      )}
                      
                      {log.response && (
                        <div>
                          <p className="text-sm font-semibold mb-1">Response:</p>
                          <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                            {JSON.stringify(log.response, null, 2)}
                          </pre>
                        </div>
                      )}
                      
                      {log.error && (
                        <div>
                          <p className="text-sm font-semibold mb-1 text-red-600">Error:</p>
                          <pre className="text-xs bg-red-50 text-red-900 p-2 rounded overflow-x-auto">
                            {log.error}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}