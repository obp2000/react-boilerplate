import parse from 'html-react-parser'

export default function FormTextList({ helpText }: { helpText: string }) {
  if (!helpText) { return null }
  return <div className="text-xs text-gray-500 dark:text-gray-400">
    {parse(helpText)}
  </div>
}
