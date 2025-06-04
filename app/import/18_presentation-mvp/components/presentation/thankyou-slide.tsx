import type React from "react"
import SlideLayout from "./slide-layout"
import { Rocket, Mail, Phone, User, Award } from "lucide-react"
import type { ThankYouData } from "@/lib/dummy-data"

interface ThankYouSlideProps extends ThankYouData {
  finalPageNumber: string
}

const ThankYouSlide: React.FC<ThankYouSlideProps> = ({
  thanksCategory,
  thanksEmoji,
  thanksTitle,
  thanksSubtitle,
  nextStepsTitle,
  nextSteps,
  contactTitle,
  contactName,
  contactRole,
  contactEmail,
  contactPhone,
  thanksMessage,
  author,
  date,
  finalPageNumber,
}) => {
  return (
    <SlideLayout
      slideId="slide-thanks"
      pageNumber={finalPageNumber}
      className="bg-gradient-to-br from-accent-gold-light via-accent-gold to-accent-gold-dark text-slate-800"
    >
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/60 backdrop-blur-md rounded-full border border-slate-300 text-wine-red shadow-sm">
            <Award size={16} /> {thanksCategory}
          </div>
        </div>

        <div className="text-7xl md:text-8xl mb-6 text-wine-red">{thanksEmoji}</div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 font-noto-serif text-wine-red">{thanksTitle}</h1>
        <p className="text-xl md:text-2xl text-slate-700/90 mb-10 max-w-3xl">{thanksSubtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-lg border border-slate-200 text-left shadow-subtle">
            <h3 className="text-xl font-semibold mb-4 flex items-center text-wine-red font-noto-serif">
              <Rocket size={22} className="mr-2" /> {nextStepsTitle}
            </h3>
            <ul className="space-y-2">
              {nextSteps.map((step, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-wine-red mr-2 mt-1">•</span>
                  <span className="text-slate-700 text-sm">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-6 rounded-lg border border-slate-200 text-left shadow-subtle">
            <h3 className="text-xl font-semibold mb-4 flex items-center text-wine-red font-noto-serif">
              <User size={22} className="mr-2" /> {contactTitle}
            </h3>
            <div className="space-y-1 text-sm">
              <p className="font-semibold text-slate-800">{contactName}</p>
              <p className="text-slate-600">{contactRole}</p>
              <p className="flex items-center text-slate-600">
                <Mail size={14} className="mr-2 opacity-70" /> {contactEmail}
              </p>
              <p className="flex items-center text-slate-600">
                <Phone size={14} className="mr-2 opacity-70" /> {contactPhone}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-lg text-slate-700/90 mb-1">{thanksMessage}</p>
          <p className="text-slate-600 text-sm">
            {author} | {date}
          </p>
        </div>
      </div>
    </SlideLayout>
  )
}

export default ThankYouSlide
