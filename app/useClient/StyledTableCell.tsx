'use client'

import { styled } from '@mui/material/styles'
import { tableCellClasses } from '@mui/material/TableCell'
import TableCell from'./TableCell'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))

export default StyledTableCell
