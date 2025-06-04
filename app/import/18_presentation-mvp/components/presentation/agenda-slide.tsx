import React from "react"
import SlideLayout from "./slide-layout"
import { ListChecks, Lightbulb, CheckCircle, AlertTriangle, Info } from "lucide-react"
import type { AgendaData } from "@/lib/dummy-data"

const AgendaSlide: React.FC<AgendaData> = ({ agendaTitle, agendaSubtitle, agendaItems, insightsTitle, insights }) => {
  const itemColors = ["bg-wine-red", "bg-wine-red/90", "bg-wine-red/80"]
  const insightColors = [
    {
      dot: "bg-accent-green", // Assuming accent-green is defined in Tailwind config
      text: "text-accent-green-dark", // Assuming accent-green-dark is defined
      icon: <CheckCircle size={18} className="text-accent-green" />,
      border: "border-accent-green",
    },
    {
      dot: "bg-accent-yellow",
      text: "text-accent-yellow-dark",
      icon: <AlertTriangle size={18} className="text-accent-yellow" />,
      border: "border-accent-yellow",
    },
    {
      dot: "bg-accent-blue",
      text: "text-accent-blue-dark",
      icon: <Info size={18} className="text-accent-blue" />,
      border: "border-accent-blue",
    },
  ]

  return (
    <SlideLayout slideId="slide-agenda" pageNumber="02" className="bg-light-canvas">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-10 bg-wine-red rounded-sm" />
        <h1 className="text-4xl font-bold text-wine-red font-noto-serif">{agendaTitle}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 flex-1 min-h-0">
        {/* Left side: Agenda Items */}
        <div className="md:col-span-3 flex flex-col">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-slate-700 font-noto-serif">
            <ListChecks size={28} className="mr-3 text-wine-red" />
            {agendaSubtitle}
          </h2>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {agendaItems.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-lg shadow-subtle bg-white border border-slate-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 ${itemColors[index % itemColors.length]} text-white rounded-md flex items-center justify-center font-bold text-lg flex-shrink-0 font-roboto-mono`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1 text-slate-800 font-noto-serif">{item.title}</h3>
                    <p className="text-slate-600 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: Insights */}
        <div className="md:col-span-2 flex flex-col">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-slate-700 font-noto-serif">
            <Lightbulb size={28} className="mr-3 text-wine-red" />
            {insightsTitle}
          </h2>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-subtle bg-white border-l-4 ${insightColors[index % insightColors.length].border} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 ${insightColors[index % insightColors.length].dot} rounded-md flex items-center justify-center flex-shrink-0`}
                  >
                    {React.cloneElement(insightColors[index % insightColors.length].icon, { className: "text-white" })}
                  </div>
                  <div>
                    <h4
                      className={`font-semibold ${insightColors[index % insightColors.length].text} mb-1 font-noto-serif`}
                    >
                      {insight.title}
                    </h4>
                    <p className="text-slate-600 text-sm">{insight.content}</p>
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

export default AgendaSlide
