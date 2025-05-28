"use client"

import FaceMapCanvas from './face-map-canvas'

interface FaceMapVisualizationProps {
  isActive?: boolean
  landmarks?: any[] | null
}

export default function FaceMapVisualization({ isActive = false, landmarks = null }: FaceMapVisualizationProps) {
  return (
    <div className="h-48 flex items-center justify-center relative bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
      <FaceMapCanvas landmarks={isActive ? landmarks : null} width={320} height={240} />
    </div>
  )
}
