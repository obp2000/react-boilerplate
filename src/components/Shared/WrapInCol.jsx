import PropTypes from 'prop-types'
import React from 'react'
import { Col } from 'reactstrap'

const WrapInCol = (Comp) => params =>
	<Col sm={params.size}>
		<Comp {...params} />
	</Col>

export default WrapInCol
