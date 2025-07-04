import ReactMarkdown from 'react-markdown';

export default function MarkdownRenderer({ markdownText }) {
  return (
    <article className="prose max-w-none">
      <ReactMarkdown>{markdownText}</ReactMarkdown>
    </article>
  );
}
