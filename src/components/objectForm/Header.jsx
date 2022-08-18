import PropTypes from 'prop-types'
import React from 'react'
import {Row, Col} from 'reactstrap'
import SubmitButton from '../submitButton/SubmitButton'
import BackButton from '../backButton/BackButton'
import {useHeader} from './hooks'

const Header = (props) => {
  const {
    nameSingular,
    from,
    id,
    createdAt,
  } = useHeader(props)
  return <Row>
    <Col sm={2}>
      <BackButton {...props} />
    </Col>
    <Col sm={6}>
      <h4 aria-label={nameSingular}>
        {nameSingular} № {id} {from} {createdAt}
      </h4>
    </Col>
    <Col sm={2}>
      <SubmitButton {...props} />
    </Col>
  </Row>
}

Header.propTypes = {
  props: PropTypes.object,
}

export default Header
