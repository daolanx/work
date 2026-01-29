import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';

export function MarkdownWrapper({ children }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {children}
    </ReactMarkdown>
  )
}