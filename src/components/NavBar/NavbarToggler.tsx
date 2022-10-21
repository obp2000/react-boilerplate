import { FC } from 'react'
import { NavbarToggler } from 'reactstrap'

const Toggler: FC = () => <NavbarToggler
  className="me-2"
  data-bs-toggle="collapse"
  data-bs-target="#navbarContent"
  aria-controls="navbarSupportedContent"
  aria-expanded="false"
  aria-label="Toggle navigation" />

export default Toggler
