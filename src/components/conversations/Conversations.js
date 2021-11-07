import React, { useEffect, useState } from 'react'
import './Conversations.css'
import axios from 'axios'
function Conversations({conversation , currentUser}) {
    const [user,setuser] = useState(null);
    const pf = process.env.REACT_APP_PUBLIC_FOLDER
    useEffect(() => {
        const friendId = conversation.members?.find((m) => m !== currentUser._id)

        const getUser = async (friendId) => {
            try{
              const userAccount = await axios.get('http://localhost:8800/api/users?userId='+friendId)
              setuser(userAccount.data)
            
            }catch(err) {
              console.log(err);
            }
          }
          getUser(friendId);
        
    },[currentUser, conversation])

    useEffect(() => {
        console.log("User credintials" , currentUser , conversation);
    },[])



    return (
        <div className="conversation" >
            <img className="conversation__image" src={user?.profilePicture ? pf+user.profilePicture : pf+'person/noAvatar.png'} alt="profile"></img>
            <span className="conversation__text" >{user?.username}</span>
        </div>
    )
}

export default Conversations
