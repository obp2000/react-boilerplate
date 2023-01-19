import { BiSearch } from 'react-icons/bi'

export default function SearchButton({ searchLabel }: { searchLabel: string }) {
  return <button
    type="submit"
    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    <BiSearch className="w-5 h-5" />
    <span className="sr-only">{searchLabel}</span>
  </button>
}
