import PropTypes from 'prop-types'
import React from 'react'

const Profile = ({name, email, username}) => {
    return <div className="card">
        <div className="card-body">
            <h5 className="card-title">Профиль</h5>
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
                <div className="col-sm-8">{name}</div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                    Ник: 
                </div>
                <div className="col-sm-8">{username}</div>
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
}

Profile.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    // nickname: PropTypes.string,
    username: PropTypes.string
}

export default Profile
