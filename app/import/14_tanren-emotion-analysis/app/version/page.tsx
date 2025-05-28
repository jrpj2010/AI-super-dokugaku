import { VERSION_DISPLAY } from '@/lib/version'

export default function VersionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">TANREN Emotion Analysis</h1>
        <p className="text-2xl">{VERSION_DISPLAY}</p>
        <p className="text-gray-600 mt-2">Version 1.1.3 - All 14 issues fixed</p>
        <div className="mt-4 text-left max-w-md mx-auto">
          <h2 className="font-bold mb-2">Fixed in v1.1.3:</h2>
          <ul className="list-disc list-inside text-sm">
            <li>Start/stop button functionality</li>
            <li>Console error resolution</li>
            <li>UI overflow fixes</li>
            <li>Real-time module initialization</li>
            <li>Emotion graph implementation</li>
            <li>MediaPipe face mapping</li>
            <li>Japanese translation</li>
            <li>Session action buttons</li>
            <li>Report data integration</li>
            <li>CSV/PDF export</li>
            <li>Version display</li>
            <li>Gauge metric descriptions</li>
            <li>MP4 video format</li>
            <li>SSR navigator fixes</li>
          </ul>
        </div>
        <a href="/" className="mt-4 inline-block text-blue-500 hover:underline">
          Back to main app
        </a>
      </div>
    </div>
  )
}