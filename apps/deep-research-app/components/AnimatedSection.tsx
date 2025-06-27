'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2, ChevronDown, ChevronRight } from 'lucide-react'
import { ReportSection, SectionStatus } from '@/lib/report-structure'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface AnimatedSectionProps {
  section: ReportSection
  status: SectionStatus
  delay: number
  children?: React.ReactNode
  content?: string
  onExpand?: () => void
}

export function AnimatedSection({ section, status, delay, children, content, onExpand }: AnimatedSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true) // デフォルトで開いた状態
  
  const handleClick = () => {
    setIsExpanded(!isExpanded)
    onExpand?.()
  }
  
  const springConfig = {
    type: "spring" as const,
    damping: 15,
    stiffness: 300,
  }

  const variants = {
    hidden: { 
      scale: 0, 
      opacity: 0,
      y: 20,
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      transition: {
        ...springConfig,
        delay,
        scale: {
          type: "spring" as const,
          damping: 10,
          stiffness: 200,
          restDelta: 0.001,
        }
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`
        relative rounded-lg border-2 p-4 cursor-pointer
        ${status === SectionStatus.COMPLETED 
          ? 'border-green-500 bg-green-50' 
          : status === SectionStatus.IN_PROGRESS
          ? 'border-blue-500 bg-blue-50 animate-pulse'
          : 'border-gray-300 bg-white hover:border-gray-400'
        }
        transition-colors duration-300
      `}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {section.icon && (
            <span className="text-2xl">{section.icon}</span>
          )}
          <h3 className="font-semibold text-lg">{section.title}</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          {status === SectionStatus.COMPLETED && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <Check className="w-5 h-5 text-green-600" />
            </motion.div>
          )}
          {status === SectionStatus.IN_PROGRESS && (
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          )}
          {content && (
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </motion.div>
          )}
        </div>
      </div>

      {/* コンテンツ表示 */}
      <AnimatePresence>
        {isExpanded && content && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 overflow-hidden"
          >
            <div className="prose prose-sm max-w-none p-4 bg-gray-50 rounded-lg">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* サブセクション */}
      <AnimatePresence>
        {children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 ml-8 space-y-2 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}