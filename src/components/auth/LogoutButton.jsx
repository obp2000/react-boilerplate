import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'reactstrap'
import Loader from 'react-loader'
import {useLogoutButton} from './hooks'

const LogoutButton = ({label}) => {
    const {loaded, ...buttonAttrs} = useLogoutButton(label)
    return <Loader loaded={loaded}>
        <Button
            color='primary'
            className='btn-outline-light'
            aria-label='auth'
            {...buttonAttrs}
        />
    </Loader>
}

LogoutButton.propTypes = {
  label: PropTypes.string,
}

export default LogoutButton
