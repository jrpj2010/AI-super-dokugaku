import { MedicalTTS } from './components/MedicalTTS'

export default function MedicalTTSPage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">医療用語音声合成システム</h1>
      <MedicalTTS />
    </div>
  )
}