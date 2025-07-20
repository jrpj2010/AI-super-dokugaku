'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from './AnimatedSection'
import { 
  reportStructure, 
  ReportSection, 
  SectionStatus,
  GenerationPhase,
  animationConfig 
} from '@/lib/report-structure'
import { parseReportContent, formatSectionContent } from '@/lib/content-parser'

interface ReportStructureMapProps {
  phase: GenerationPhase
  currentSection?: string
  content?: string
  onSectionClick?: (sectionId: string) => void
}

export function ReportStructureMap({ phase, currentSection, content, onSectionClick }: ReportStructureMapProps) {
  const [visibleSections, setVisibleSections] = useState<string[]>([])
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [sectionStatuses, setSectionStatuses] = useState<Record<string, SectionStatus>>({})
  const [sectionContentMap, setSectionContentMap] = useState<Map<string, string>>(new Map())

  // フェーズ1: 大テーマを順番に表示
  useEffect(() => {
    if (phase === GenerationPhase.STRUCTURE_BUILDING) {
      const timer = setTimeout(() => {
        reportStructure.forEach((section, index) => {
          setTimeout(() => {
            setVisibleSections(prev => [...prev, section.id])
          }, index * animationConfig.phaseOneDelay)
        })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [phase])

  // フェーズ2: サブセクションを展開
  useEffect(() => {
    if (phase === GenerationPhase.SUBSECTION_EXPANDING || phase === GenerationPhase.CONTENT_STREAMING) {
      const sectionsWithSubs = reportStructure.filter(s => s.subsections)
      sectionsWithSubs.forEach((section, index) => {
        setTimeout(() => {
          setExpandedSections(prev => [...prev, section.id])
        }, index * animationConfig.phaseTwoDelay * 3)
      })
    }
  }, [phase])

  // 現在のセクションの状態を更新
  useEffect(() => {
    if (currentSection) {
      setSectionStatuses(prev => ({
        ...prev,
        [currentSection]: SectionStatus.IN_PROGRESS
      }))
    }
  }, [currentSection])

  // コンテンツをパースしてセクションごとに分割（ストリーミング中も更新）
  useEffect(() => {
    if (content && (phase === GenerationPhase.CONTENT_STREAMING || phase === GenerationPhase.COMPLETED)) {
      const parsedContent = parseReportContent(content, reportStructure)
      setSectionContentMap(parsedContent)
      
      // ストリーミング中にコンテンツが追加されたセクションのステータスを更新
      parsedContent.forEach((value, key) => {
        if (value && value.length > 0) {
          setSectionStatuses(prev => ({
            ...prev,
            [key]: phase === GenerationPhase.COMPLETED ? SectionStatus.COMPLETED : SectionStatus.IN_PROGRESS
          }))
        }
      })
    }
  }, [content, phase])

  const getSectionStatus = (sectionId: string): SectionStatus => {
    if (sectionStatuses[sectionId]) return sectionStatuses[sectionId]
    if (phase === GenerationPhase.COMPLETED) return SectionStatus.COMPLETED
    return SectionStatus.PENDING
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto p-6"
    >
      <AnimatePresence mode="wait">
        {phase === GenerationPhase.ANALYZING && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <span className="text-6xl">🔍</span>
            </motion.div>
            <h2 className="mt-4 text-2xl font-semibold text-gray-700">
              テーマを分析中...
            </h2>
          </motion.div>
        )}

        {(phase !== GenerationPhase.IDLE && phase !== GenerationPhase.ANALYZING) && (
          <motion.div
            key="structure"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {reportStructure.map((section, index) => {
              const isVisible = visibleSections.includes(section.id)
              const isExpanded = expandedSections.includes(section.id)
              
              return isVisible ? (
                <AnimatedSection
                  key={section.id}
                  section={section}
                  status={getSectionStatus(section.id)}
                  delay={index * 0.1}
                  content={sectionContentMap.get(section.id) ? formatSectionContent(sectionContentMap.get(section.id)!) : undefined}
                  onExpand={() => onSectionClick?.(section.id)}
                >
                  {isExpanded && section.subsections && (
                    <div className="space-y-2">
                      {section.subsections.map((subsection, subIndex) => (
                        <AnimatedSection
                          key={subsection.id}
                          section={subsection}
                          status={getSectionStatus(subsection.id)}
                          delay={subIndex * animationConfig.phaseTwoDelay / 1000}
                          content={sectionContentMap.get(subsection.id) ? formatSectionContent(sectionContentMap.get(subsection.id)!) : undefined}
                          onExpand={() => onSectionClick?.(subsection.id)}
                        />
                      ))}
                    </div>
                  )}
                </AnimatedSection>
              ) : null
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* プログレスインジケーター */}
      {phase === GenerationPhase.CONTENT_STREAMING && currentSection && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-2xl">⚡</span>
            </motion.div>
            <div>
              <p className="text-sm text-blue-600 font-medium">
                現在生成中のセクション
              </p>
              <p className="text-lg font-semibold text-blue-800">
                {reportStructure.find(s => s.id === currentSection)?.title ||
                  reportStructure.flatMap(s => s.subsections || []).find(sub => sub.id === currentSection)?.title}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}