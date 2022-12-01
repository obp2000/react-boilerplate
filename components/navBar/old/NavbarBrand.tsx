import 'server-only'

import NavbarBrand from '@/client/NavbarBrand'
import Badge from '@/client/Badge'
// import { getOptions } from '@/services/api/options'
// import { IndexUrl } from '@/interfaces/index'
import { CommonConstsType } from '@/interfaces/commonConsts'

export default async function NavbarBrandComp({
  commonConsts
}: CommonConstsType) {
  return <NavbarBrand href="/">
    <h3>
      <Badge pill size='lg'>
        {commonConsts?.brand_text}
      </Badge>
    </h3>
  </NavbarBrand>
}
