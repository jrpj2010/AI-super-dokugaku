import React from "react"
import SlideLayout from "./slide-layout"
import { Briefcase, ShieldCheck, TrendingUp, BarChart, Clock } from "lucide-react"
import type { CoverData } from "@/lib/dummy-data"

interface CoverSlideProps extends CoverData {
  presentationTitle: string // This seems redundant if mainTitle is used from CoverData
}

const CoverSlide: React.FC<CoverSlideProps> = ({
  // presentationTitle, // Using mainTitle from CoverData instead
  documentType,
  confidentialityLevel,
  mainTitle,
  subtitle,
  metric1Value,
  metric1Label,
  metric2Value,
  metric2Label,
  metric3Value,
  metric3Label,
  author,
  date,
}) => {
  return (
    <SlideLayout
      slideId="slide-cover"
      pageNumber="01"
      className="bg-gradient-to-br from-wine-red-light via-wine-red to-wine-red-dark text-white"
    >
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/15 backdrop-blur-md rounded-full border border-white/30">
            <Briefcase size={16} /> {documentType} • <ShieldCheck size={16} /> {confidentialityLevel}
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 font-noto-serif">{mainTitle}</h1>
        <h2 className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl">{subtitle}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {[
            { icon: <TrendingUp />, value: metric1Value, label: metric1Label },
            { icon: <BarChart />, value: metric2Value, label: metric2Label },
            { icon: <Clock />, value: metric3Value, label: metric3Label },
          ].map((metric, idx) => (
            <div key={idx} className="bg-white/15 backdrop-blur-md p-6 rounded-lg border border-white/30 shadow-subtle">
              <div className="flex items-center justify-center text-white/80 mb-2">
                {React.cloneElement(metric.icon, { size: 28 })}
              </div>
              <div className="text-4xl font-roboto-mono font-bold text-white">{metric.value}</div>
              <div className="text-sm text-white/70 mt-1">{metric.label}</div>
            </div>
          ))}
        </div>

        <div>
          <p className="text-lg text-white/90 mb-1">{author}</p>
          <p className="text-white/70 text-sm">{date}</p>
        </div>
      </div>
    </SlideLayout>
  )
}

export default CoverSlide
