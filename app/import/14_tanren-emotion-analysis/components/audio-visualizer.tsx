"use client"

import { useAudioVisualizer } from "@/hooks/use-audio-visualizer"

interface AudioVisualizerProps {
  isActive: boolean
  stream?: MediaStream | null
}

export default function AudioVisualizer({ isActive, stream }: AudioVisualizerProps) {
  const { setCanvasRef } = useAudioVisualizer(stream || null, isActive)

  return (
    <div className="w-full h-16 bg-black/20 rounded-lg p-2">
      <canvas
        ref={setCanvasRef}
        width={400}
        height={48}
        className="w-full h-full"
      />
    </div>
  )
}