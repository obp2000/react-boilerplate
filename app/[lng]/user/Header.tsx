import 'server-only'

export default function Header({ label }: { label: string }) {
  return <div className='columns-3'>
    <div className='text-center text-2xl text-gray-900'>
      {label}
    </div>
  </div>
}
