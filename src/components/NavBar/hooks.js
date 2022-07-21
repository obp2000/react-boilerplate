import { useOutletContext } from 'react-router-dom'
import AuthButton from '../auth/AuthButton'
import LogoutButton from '../auth/LogoutButton'

const emptyObject = {}

export const useNavBar = ({
    commonConsts: {
        brand_text: brandText,
        main_menu: mainMenu,
        auth_menu_item: {
            label: authButtonLabel
        } = emptyObject,
        search: searchLabel,
    } = emptyObject,
    isLoadingOptions,
    isAuthenticated,
}) => {
    const AuthButtonComp = isAuthenticated ? LogoutButton : AuthButton
    return {
        brandText,
        mainMenu,
        isLoadingOptions,
        AuthButtonComp,
        authButtonLabel,
        searchLabel,
    }
}
