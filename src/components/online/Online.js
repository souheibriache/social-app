import React from 'react'
import './Online.css'
function Online({user}) {
    const pf = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <li className="rightbar__friend" >
            <div className="rightbar__profile__imgContainer" >
                <img alt="" className="rightbar__profile__profileImg" src={pf+user.profilePicture}></img>
                <span className="rightbar__online" ></span>
            </div>
            <span className="rightbar__friend__username" >{user.username}</span>
        </li>
    )
}

export default Online
