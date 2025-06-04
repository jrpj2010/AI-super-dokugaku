"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import CoverSlide from "@/components/presentation/cover-slide"
import AgendaSlide from "@/components/presentation/agenda-slide"
import DetailSlideA from "@/components/presentation/detail-slide-a"
import ThankYouSlide from "@/components/presentation/thankyou-slide"
import { dummyCoverData, dummyAgendaData, dummyDetailDataA, dummyThankYouData } from "@/lib/dummy-data"
import type { CoverData, AgendaData, DetailDataA, ThankYouData } from "@/lib/dummy-data" // 型をインポート
import { ChevronLeft, ChevronRight, Printer, Download, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PresentationData {
  coverData: CoverData
  agendaData: AgendaData
  detailDataA: DetailDataA
  thankYouData: ThankYouData
}

export default function PresentationPage() {
  const searchParams = useSearchParams()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [presentationTitle, setPresentationTitle] = useState("プレゼンテーション")
  const [slidesData, setSlidesData] = useState<PresentationData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const slidesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const title = localStorage.getItem("presentationTitle")
    if (title) {
      setPresentationTitle(title)
    }

    const isGenerated = searchParams.get("generated") === "true"
    if (isGenerated) {
      const dataString = localStorage.getItem("presentationData")
      if (dataString) {
        try {
          const parsedData = JSON.parse(dataString) as PresentationData
          // 簡単なバリデーション（主要なキーが存在するか）
          if (parsedData.coverData && parsedData.agendaData && parsedData.detailDataA && parsedData.thankYouData) {
            setSlidesData(parsedData)
          } else {
            throw new Error("必要なデータが不足しています。")
          }
        } catch (e: any) {
          console.error("Failed to parse presentation data from localStorage:", e)
          setError(`生成されたデータの読み込みに失敗しました: ${e.message}. ダミーデータを表示します。`)
          setSlidesData({ dummyCoverData, dummyAgendaData, dummyDetailDataA, dummyThankYouData })
        }
      } else {
        setError("生成されたデータが見つかりません。ダミーデータを表示します。")
        setSlidesData({ dummyCoverData, dummyAgendaData, dummyDetailDataA, dummyThankYouData })
      }
    } else {
      // 通常のダミーデータ表示
      setSlidesData({ dummyCoverData, dummyAgendaData, dummyDetailDataA, dummyThankYouData })
    }
  }, [searchParams])

  useEffect(() => {
    if (slidesData) {
      slidesRef.current = slidesRef.current.slice(0, 4) // スライド数は4で固定
    }
  }, [slidesData])

  if (!slidesData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-light-canvas p-4">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
            <AlertTriangle className="mr-2" /> {error}
          </div>
        )}
        <p className="text-slate-700 text-lg">プレゼンテーションデータを読み込み中です...</p>
      </div>
    )
  }

  // スライドコンポーネントの配列を動的に生成
  const slides = [
    <CoverSlide key="cover" {...slidesData.coverData} presentationTitle={presentationTitle} />,
    <AgendaSlide key="agenda" {...slidesData.agendaData} />,
    <DetailSlideA key="detail-a" {...slidesData.detailDataA} pageNumber="03" />, // pageNumberは固定またはLLMに生成させる
    <ThankYouSlide key="thankyou" {...slidesData.thankYouData} finalPageNumber="04" />, // finalPageNumberも同様
  ]

  const totalSlides = slides.length

  const navigateToSlide = (index: number) => {
    slidesRef.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    const next = Math.min(currentSlide + 1, totalSlides - 1)
    navigateToSlide(next)
  }

  const prevSlide = () => {
    const newPrev = Math.max(currentSlide - 1, 0)
    navigateToSlide(newPrev)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    alert("HTMLダウンロード機能はMVPでは未実装です。")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light-canvas p-4 overflow-hidden">
      {error && (
        <div className="w-full max-w-5xl mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md flex items-center text-sm print:hidden">
          <AlertTriangle className="mr-2 flex-shrink-0" size={18} /> {error}
        </div>
      )}
      <div className="w-full max-w-5xl mb-4 flex justify-between items-center print:hidden">
        <h1 className="text-2xl font-bold text-wine-red font-noto-serif">{presentationTitle}</h1>
        <div>
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrint}
            className="mr-2 text-wine-red border-wine-red/50 hover:bg-wine-red/5 hover:border-wine-red"
            aria-label="印刷"
          >
            <Printer size={20} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleDownload}
            className="text-wine-red border-wine-red/50 hover:bg-wine-red/5 hover:border-wine-red"
            aria-label="ダウンロード"
          >
            <Download size={20} />
          </Button>
        </div>
      </div>

      <div className="relative w-full max-w-5xl aspect-[16/9] overflow-hidden rounded-md shadow-strong border border-slate-200">
        {slides.map((slide, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) slidesRef.current[index] = el
            }}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {slide}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center space-x-4 print:hidden">
        <Button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          variant="outline"
          className="text-wine-red border-wine-red/50 hover:bg-wine-red/5 hover:border-wine-red"
        >
          <ChevronLeft size={24} /> 前へ
        </Button>
        <span className="text-slate-700 font-medium">
          {currentSlide + 1} / {totalSlides}
        </span>
        <Button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          variant="outline"
          className="text-wine-red border-wine-red/50 hover:bg-wine-red/5 hover:border-wine-red"
        >
          次へ <ChevronRight size={24} />
        </Button>
      </div>
    </div>
  )
}
