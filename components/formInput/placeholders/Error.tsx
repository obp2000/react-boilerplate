export default function ErrorPlaceholder() {
  return <div role="status" className="space-y-4 animate-pulse max-w-lg">
      <div className="flex items-center w-full space-x-2 max-w-[480px]">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      </div>
      <span className="sr-only">Loading error message...</span>
  </div>
}
