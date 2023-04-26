import Paper from '@/app/useClient/Paper'
import Skeleton from '@/app/useClient/Skeleton'
import Table from '@/app/useClient/Table'
import TableBody from '@/app/useClient/TableBody'
import TableCell from '@/app/useClient/TableCell'
import TableContainer from '@/app/useClient/TableContainer'
import TableFooter from '@/app/useClient/TableFooter'
import TableHead from '@/app/useClient/TableHead'
import TableRow from '@/app/useClient/TableRow'
import Typography from '@/app/useClient/Typography'
import Grid from '@/app/useClient/Unstable_Grid2'
import Container from '@/app/useClient/Container'
import AppBar from '@/app/useClient/AppBar'
import Toolbar from '@/app/useClient/Toolbar'
import Box from '@/app/useClient/Box'
import { Search, SearchIconWrapper } from '@/app/components/navBar/SearchForm'
import SearchIcon from '@/app/useClient/SearchIcon'
import Chip from '@/app/useClient/Chip'

function Field() {
  return <Skeleton sx={{ fontSize: '1.5rem' }} />
}

export function Form() {
  return <Grid container spacing={2} sx={{ p: 2 }}>
    <Grid xs={4}>
      <Field />
    </Grid>
    <Grid xs={8}>
      <Field />
    </Grid>
    <Grid xs={5}>
      <Field />
    </Grid>
    <Grid xs={7}>
      <Field />
    </Grid>
    <Grid>
      <Skeleton sx={{ fontSize: '1.5rem' }} />
    </Grid>
  </Grid>
}

function Cell() {
  return <TableCell><Field /></TableCell>
}

function Row() {
  return <TableRow>
    <Cell />
    <Cell />
    <Cell />
    <Cell />
    <Cell />
    <Cell />
    <Cell />
  </TableRow>
}

export function ObjectsTableBody() {
  return <TableBody>
    <Row />
    <Row />
    <Row />
    <Row />
    <Row />
    <Row />
    <Row />
    <Row />
  </TableBody>
}

export function ObjectsTableBodyAndFooter() {
  return <>
    <TableBody>
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell />
        <TableCell><Skeleton sx={{ fontSize: '1.5rem' }} /></TableCell>
        <TableCell />
        <TableCell colSpan={4} align='right'>
          <Skeleton sx={{ fontSize: '1.5rem' }} />
        </TableCell>
      </TableRow>
    </TableFooter>
  </>
}

export function ObjectsTable() {
  return <TableContainer component={Paper}>
    <Typography
      component="h1"
      variant="h5"
      color="inherit"
      align="center"
      noWrap
      sx={{ flex: 1 }}
    >
      <Field />
    </Typography>
    <Table sx={{ minWidth: 650 }} size="small">
      <TableHead>
        <Row />
      </TableHead>
      <TableBody>
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
      </TableBody>
    </Table>
  </TableContainer>
}

function NavLink() {
  return <Typography variant="h6" component="div" sx={{
    flexGrow: 1,
  }}>
    <Typography variant='button' sx={{
      color: 'white',
    }}>
      <Field />
    </Typography>
  </Typography>
}

function SearchForm() {
  return <Search>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <Field />
  </Search>
}

function NavBar() {
  return <AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 5,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <Field />
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <NavLink />
          <NavLink />
          <NavLink />
          <NavLink />
          <NavLink />
        </Box>
        <SearchForm />
        <Box sx={{ flexGrow: 0 }}>
          <Field />
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
}

function LocaleSwitcher() {
  return <Box sx={{ mt: 2 }}>
    <Field />:
    <span>
      <Chip label='' />
    </span>
  </Box>
}

export function RootLayout() {
  return <Container>
    <header>
      <NavBar />
    </header>
    <main>
      <ObjectsTable />
    </main>
    <footer>
      <LocaleSwitcher />
    </footer>
  </Container>
}