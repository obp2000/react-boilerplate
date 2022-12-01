import 'server-only'

import NavbarToggler from '@/client/NavbarToggler'

export default function Toggler() {
  return <NavbarToggler
    className="me-2"
    data-bs-toggle="collapse"
    data-bs-target="#navbarContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation" />
}
