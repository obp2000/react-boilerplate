import SearchButton from "@/app/[lng]/_components/SearchButton"

function Field() {
  // return <Skeleton sx={{ fontSize: '1.5rem' }} />
  return <div className="flex animate-pulse">
    <span className='w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700' />
  </div>
}

export function Form() {
  return <div className='grid grid-cols-2 gap-4 p-2'>
    <Field />
    <Field />
    <Field />
    <Field />
    <Field />
  </div>
}

function Cell() {
  return <td className="whitespace-nowrap px-6 py-4">
    <Field />
  </td>
}

function Row() {
  return <tr className="border-b dark:border-neutral-500">
    <Cell />
    <Cell />
    <Cell />
    <Cell />
    <Cell />
    <Cell />
    <Cell />
  </tr>
}

export function ObjectsTableBody() {
  return <tbody>
    <Row />
    <Row />
    <Row />
    <Row />
    <Row />
    <Row />
    <Row />
    <Row />
  </tbody>
}

export function ObjectsTableBodyAndFooter() {
  return <>
    <tbody>
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
    </tbody>
    <tfoot>
      <tr className="border-b dark:border-neutral-500">
        <td className="whitespace-nowrap  px-6 py-4" />
        <td className="whitespace-nowrap  px-6 py-4"><Field /></td>
        <td className="whitespace-nowrap  px-6 py-4" />
        <td colSpan={4} align='right' className='whitespace-nowrap  px-6 py-4'>
          <Field />
        </td>
      </tr>
    </tfoot>
  </>
}

export function ObjectsTable() {
  // return <TableContainer component={Paper}>
  //   <Typography
  //     component="h1"
  //     variant="h5"
  //     color="inherit"
  //     align="center"
  //     noWrap
  //     sx={{ flex: 1 }}
  //   >
  //     <Field />
  //   </Typography>
  //   <Table sx={{ minWidth: 650 }} size="small">
  //     <TableHead>
  //       <Row />
  //     </TableHead>
  //     <TableBody>
  //       <Row />
  //       <Row />
  //       <Row />
  //       <Row />
  //       <Row />
  //       <Row />
  //       <Row />
  //       <Row />
  //     </TableBody>
  //   </Table>
  // </TableContainer>
  return <div className="flex flex-col">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <div className='text-xl'><Field /></div>
          <table className="min-w-full text-center text-sm font-light">
            <thead
              className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
              <Row />
            </thead>
            <tbody>
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
}

function NavLink() {
  return <div className='text-xl'>
    <Field />
  </div>
}

export function SearchForm() {
  return <div>
    <Field />
    <SearchButton />
  </div>
}

export function NavBar() {
  return <div className="flex w-full flex-wrap items-center justify-between px-3">
    <div className='md:flex hidden mr-5 font-mono text-neutral-700'>
      <Field />
    </div>
    <div className='md:flex hidden'>
      <NavLink />
      <NavLink />
      <NavLink />
      <NavLink />
      <NavLink />
    </div>
    <div className='relative'>
      <SearchForm />
      <div className='flex'>
        <Field />
      </div>
    </div>
  </div>
}

function LocaleSwitcher() {
  return <div className='mt-2'>
    <Field />:
    <div className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-blue-700 bg-blue-100 border border-blue-300 ">
      <div className="text-xs font-normal leading-none max-w-full flex-initial">
      </div>
    </div>
  </div>
}

export function RootLayout() {
  return <div className='container'>
    <header>
      <NavBar />
    </header>
    <main>
      <ObjectsTable />
    </main>
    <footer>
      <LocaleSwitcher />
    </footer>
  </div>
}

function UserRow() {
  return <div className='grid grid-cols-6'>
    <div>
      <Field />
    </div>
    <div>
      <Field />
    </div>
  </div>
}

export function User() {
  return <>
    <UserRow />
    <UserRow />
    <UserRow />
    <UserRow />
  </>
}
