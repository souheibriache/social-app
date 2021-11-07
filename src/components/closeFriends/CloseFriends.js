import React from 'react'
import './CloseFriends.css'

function CloseFriends({user}) {
    const pf = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <li className="sidebar__friend" >
            <img src={pf+user.profilePicture} className="sidebarFriend__img" alt="" ></img>
            <span className="sidebarFriendName" >{user.username}</span>
        </li>
    )
}

export default CloseFriends
