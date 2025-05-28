"use client"

interface FaceMapVisualizationProps {
  isActive?: boolean
}

export default function FaceMapVisualization({ isActive = false }: FaceMapVisualizationProps) {
  return (
    <div className="h-48 flex items-center justify-center relative">
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p className="text-gray-400 text-sm text-center">
            顔認識待機中...<br />
            <span className="text-xs">セッション開始時に表示されます</span>
          </p>
        </div>
      )}
      <svg 
        width="120" 
        height="140" 
        viewBox="0 0 120 140" 
        className={isActive ? "text-green-400" : "text-gray-300"}
        style={{ opacity: isActive ? 1 : 0.2 }}
      >
        {/* 顔の輪郭 */}
        <ellipse cx="60" cy="70" rx="40" ry="50" fill="none" stroke="currentColor" strokeWidth="1" />

        {/* 目 */}
        <ellipse cx="45" cy="55" rx="8" ry="4" fill="none" stroke="currentColor" strokeWidth="1" />
        <ellipse cx="75" cy="55" rx="8" ry="4" fill="none" stroke="currentColor" strokeWidth="1" />

        {/* 鼻 */}
        <path d="M60 65 L58 75 L62 75 Z" fill="none" stroke="currentColor" strokeWidth="1" />

        {/* 口 - ニュートラルな表情 */}
        <path d="M50 85 L70 85" fill="none" stroke="currentColor" strokeWidth="1" />

        {/* 特徴点 */}
        {isActive && (
          <>
            <circle cx="45" cy="55" r="1" fill="currentColor" className="animate-pulse" />
            <circle cx="75" cy="55" r="1" fill="currentColor" className="animate-pulse" />
            <circle cx="60" cy="65" r="1" fill="currentColor" />
            <circle cx="50" cy="85" r="1" fill="currentColor" />
            <circle cx="70" cy="85" r="1" fill="currentColor" />
            <circle cx="60" cy="90" r="1" fill="currentColor" />

            {/* 追加の特徴点 */}
            <circle cx="35" cy="60" r="0.5" fill="currentColor" />
            <circle cx="85" cy="60" r="0.5" fill="currentColor" />
            <circle cx="60" cy="40" r="0.5" fill="currentColor" />
            <circle cx="60" cy="100" r="0.5" fill="currentColor" />
          </>
        )}
      </svg>
    </div>
  )
}
