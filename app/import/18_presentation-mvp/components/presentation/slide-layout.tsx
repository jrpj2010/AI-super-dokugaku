import type React from "react"

interface SlideLayoutProps {
  children: React.ReactNode
  pageNumber?: string
  slideId?: string
  className?: string
  style?: React.CSSProperties
}

const SlideLayout: React.FC<SlideLayoutProps> = ({ children, pageNumber, slideId, className = "", style }) => {
  return (
    <div
      id={slideId}
      className={`slide-container w-full h-full bg-white text-slate-800 flex flex-col overflow-hidden ${className}`}
      style={style}
    >
      <div className="slide-content flex-1 flex flex-col p-6 sm:p-10 md:p-12 relative">
        {children}
        {pageNumber && (
          <div className="page-number absolute bottom-3 right-5 text-xs bg-light-canvas/70 backdrop-blur-sm text-wine-red/80 px-3 py-1 rounded-full font-medium">
            {pageNumber}
          </div>
        )}
      </div>
    </div>
  )
}

export default SlideLayout
