"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RealtimeDashboard from "@/components/realtime-dashboard"
import AnalysisReport from "@/components/analysis-report"

export default function AISuite() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sessionData, setSessionData] = useState<any>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <div className="container mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">TANREN</h1>
          <p className="text-lg text-gray-600">
            マルチモーダルAIを活用したロールプレイング診断・感情分析プラットフォーム
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6" role="tablist" aria-label="分析モード選択">
            <TabsTrigger value="dashboard" aria-label="リアルタイム分析モード">リアルタイム分析</TabsTrigger>
            <TabsTrigger value="report" aria-label="分析結果レポートモード">分析結果レポート</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <RealtimeDashboard 
              onAnalysisComplete={(data) => {
                setSessionData(data)
                setActiveTab("report")
              }}
            />
          </TabsContent>

          <TabsContent value="report">
            <AnalysisReport sessionData={sessionData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
