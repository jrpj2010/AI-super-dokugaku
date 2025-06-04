"use client"
import SlideLayout from "./slide-layout"
import type React from "react"

import { BarChart3, TrendingUp, Info, CheckCircle, AlertCircle, Settings, Activity } from "lucide-react"
import type { DetailDataA } from "@/lib/dummy-data"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface DetailSlideAProps extends DetailDataA {
  pageNumber: string
}

const DetailSlideA: React.FC<DetailSlideAProps> = ({
  pageTitle,
  pageLabel,
  chartTitle,
  chartIndicatorIcon = "trendingUp",
  chartData,
  chartCaption,
  analysisTitle,
  insights,
  pageNumber,
}) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#4A0E2A", // Wine red for legend text
          font: {
            family: "'Noto Sans JP', sans-serif",
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#8C274C", // Wine red
        bodyColor: "#333333",
        borderColor: "#8C274C",
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("ja-JP").format(context.parsed.y)
            }
            return label
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(140, 39, 76, 0.1)", // Light wine red grid lines
        },
        ticks: {
          color: "#6B2941", // Darker wine red for ticks
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B2941",
        },
      },
    },
  }

  const getIcon = (iconName: string | undefined, colorClass = "text-wine-red") => {
    const props = { size: 20, className: colorClass }
    switch (iconName) {
      case "info":
        return <Info {...props} />
      case "checkCircle":
        return <CheckCircle {...props} />
      case "alertCircle":
        return <AlertCircle {...props} />
      default:
        return <Settings {...props} />
    }
  }

  const getChartIndicatorIcon = (iconName: string) => {
    const props = { size: 20, className: "text-wine-red/80" }
    switch (iconName) {
      case "trendingUp":
        return <TrendingUp {...props} />
      case "activity":
        return <Activity {...props} />
      default:
        return <BarChart3 {...props} />
    }
  }

  return (
    <SlideLayout pageNumber={pageNumber} className="bg-light-canvas">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-10 bg-wine-red rounded-sm" />
          <h1 className="text-3xl md:text-4xl font-bold text-wine-red font-noto-serif">{pageTitle}</h1>
        </div>
        <div className="flex-shrink-0 px-3 py-1 text-xs font-medium bg-wine-red/10 text-wine-red rounded-full flex items-center gap-1 border border-wine-red/30">
          <Settings size={14} /> {pageLabel}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        {/* Chart Area */}
        <div className="flex flex-col min-h-0">
          <div className="p-6 rounded-lg shadow-subtle bg-white border border-slate-200 flex-1 flex flex-col min-h-0 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-slate-700 flex items-center font-noto-serif">
                <BarChart3 size={24} className="mr-2 text-wine-red" />
                {chartTitle}
              </h3>
              <div className="px-3 py-1 text-xs bg-wine-red/5 text-wine-red/80 rounded-full flex items-center gap-1 border border-wine-red/20">
                {getChartIndicatorIcon(chartIndicatorIcon)}
              </div>
            </div>
            <div className="flex-1 relative min-h-[200px] md:min-h-[250px]">
              <Bar data={chartData} options={chartOptions} />
            </div>
            <div className="text-center mt-3">
              <span className="text-xs text-slate-500">{chartCaption}</span>
            </div>
          </div>
        </div>

        {/* Analysis Area */}
        <div className="flex flex-col min-h-0 space-y-4">
          <h2 className="text-2xl font-semibold text-slate-700 flex items-center font-noto-serif">
            <TrendingUp size={28} className="mr-3 text-wine-red" />
            {analysisTitle}
          </h2>
          <div className="flex-1 min-h-0 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-sm bg-white border-l-4 ${insight.borderColorClass || "border-wine-red"} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 ${insight.iconBgClass || "bg-wine-red/10"} rounded-md flex items-center justify-center flex-shrink-0`}
                  >
                    {getIcon(insight.icon, insight.titleColorClass || "text-wine-red")}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${insight.titleColorClass || "text-wine-red"} mb-1 font-noto-serif`}>
                      {insight.title}
                    </h4>
                    <p className="text-slate-600 text-sm">{insight.content}</p>
                    {insight.label && (
                      <div className="mt-2">
                        <span
                          className={`px-2 py-0.5 text-xs font-medium ${insight.labelBgClass || "bg-wine-red/10"} ${insight.labelTextColorClass || "text-wine-red"} rounded-full border ${insight.borderColorClass ? insight.borderColorClass.replace("border-l-4 ", "border-") : "border-wine-red/30"}`}
                        >
                          {insight.label}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  )
}

export default DetailSlideA
