import PropTypes from 'prop-types'
import React from 'react'
import Errors from '../Errors'

const User = ({
    initialValues: {
        username,
        email,
        first_name,
        last_name
    },
    errors
}) => <div className="card">
        {errors && <Errors errors={errors}/>}
        <div className="card-body">
            <h5 className="card-title">Профиль</h5>
            <div className="row">
                <div className="col-sm-2">
                    Имя пользователя:
                </div>
                <div className="col-sm-8">{username}</div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                    Email:
                </div>
                <div className="col-sm-8">{email}</div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                    Имя:
                </div>
                <div className="col-sm-8">{first_name}</div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                    Фамилия:
                </div>
                <div className="col-sm-8">{last_name}</div>
            </div>
        </div>
        {/* <div className="card-footer">
                <div className="row">
                    <div className="col-sm-3 offset-3">
                        <button className="btn btn-outline-primary btn-sm">
                            Выйти
                        </button>
                    </div>
                </div>
            </div> */}
    </div>

User.propTypes = {
    username: PropTypes.string,
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    errors: PropTypes.array
}

export default User