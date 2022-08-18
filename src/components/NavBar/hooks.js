import {useRouter} from 'next/dist/client/router'

const emptyObject = {}

const navLinkClassName = ({isActive}) => 'nav-link' + (isActive ? ' active' : '')

export const useNavLink = ({
  path,
  label,
}) => ({
  to: path,
  className: navLinkClassName,
  label,
})

export const useNavbarBrand = ({commonConsts}) => ({
  brandText: commonConsts?.brand_text,
})

export const useMainMenu = ({commonConsts}) => {
  const router = useRouter()
  const {pathname} = router
  return commonConsts?.main_menu.map(({path, label}, key) =>
    ({
      path,
      className: `nav-link${(pathname === path) || (`${pathname}/` === path) ? ' active' : ''}`,
      label,
    })
  )
}
