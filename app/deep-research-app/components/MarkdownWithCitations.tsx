'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Citation } from './Citation'

interface Reference {
  number: number
  title: string
  url: string
  snippet?: string
}

interface MarkdownWithCitationsProps {
  content: string
  references: Reference[]
}

export function MarkdownWithCitations({ content, references }: MarkdownWithCitationsProps) {
  // 引用番号をCitationコンポーネントに置換
  const processContent = (text: string) => {
    const parts = text.split(/\[(\d+)\]/)
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        const refNumber = parseInt(part)
        const reference = references.find(ref => ref.number === refNumber)
        if (reference) {
          return (
            <Citation
              key={`citation-${index}`}
              number={reference.number}
              title={reference.title}
              url={reference.url}
              snippet={reference.snippet}
            />
          )
        }
      }
      return part
    })
  }

  return (
    <article className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p>{processContent(String(children))}</p>,
          li: ({ children }) => <li>{processContent(String(children))}</li>,
          td: ({ children }) => <td>{processContent(String(children))}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}