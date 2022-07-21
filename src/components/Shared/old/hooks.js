import React from 'react'
import {
	useOutletContext,
	useNavigate,
	useParams,
	useLocation,
} from 'react-router-dom'
import {toastSuccess, toastError} from './Toast'
// import confirmAction from '../confirmation/ConfirmAction'
import {useObjects, useObjectsData} from '../../services/entityAdapter'

const emptyObject = {}

