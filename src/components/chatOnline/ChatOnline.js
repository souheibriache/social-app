import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './ChatOnline.css'
function ChatOnline({ onlineUsers, currentId, setcurrentChat }) {

    const [friends, setFriends] = useState([])
    const [onlinefriends, setonlineFriends] = useState([])
    const pf = process.env.REACT_APP_PUBLIC_FOLDER
    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get('http://localhost:8800/api/users/friends/' + currentId);
            setFriends(res.data)
        }

        getFriends()
    }, [currentId])

    useEffect(() => {
        setonlineFriends(friends.filter(friend => onlineUsers.includes(friend._id)))
    }, [friends, onlineUsers]);

    const handleClick = async(user) => {
        try{
            const res = await axios.get(`http://localhost:8800/api/conversations/find/${currentId}/${user}`)
            console.log("res",res)
            setcurrentChat(res.data)
        }catch(err){
            console.log(err);
        }
    }
    // console.log(friends);
    return (
        <div className="chat__online" >

            {onlinefriends.map(onlineFriend => {
                return (
                    <div className="chat__online__friend" onClick={() => handleClick(onlineFriend._id)} >
                        <div className="chat__online__imgContainer" >
                            <img className="chat__online__image" alt="" src={onlineFriend?.profilePicture ? pf + onlineFriend.profilePicture : pf+ "person/noAvatar.png"}></img>
                            <div className="online__badge" ></div>
                        </div>
                        <span className="chat__online__username" >{onlineFriend?.username}</span>
                    </div>
                )
            })}

        </div>
    )
}

export default ChatOnline
