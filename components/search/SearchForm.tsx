'use client'

import Input from '@/formInput/Input'
import { Field, Form } from 'react-final-form'
import { useForm } from './hooks'
import { AiOutlineSearch } from 'react-icons/ai'
import SearchButton from '@/buttons/SearchButton'

export default function SearchForm({
  searchLabel,
}: { searchLabel: string }) {
  return <Form {...useForm()}>
    {(props) => <form onSubmit={props.handleSubmit} className='mr-3'>
      <label htmlFor="term" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        {searchLabel}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <AiOutlineSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <Field
          name='term'
          id='term'
          type="search"
          placeholder={`${searchLabel}...`}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          component={Input} />
        <SearchButton {...{ searchLabel }} />
      </div>
    </form>}
  </Form>
}
