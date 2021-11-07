import React, { useEffect, useState } from 'react'
import './Message.css'
import {format} from 'timeago.js'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Message({own , message , user}) {

    const [sender, setsender] = useState(null)

    useEffect(() => {
        const getUser = async (friendId) => {
            try{
              const userAccount = await axios.get('http://localhost:8800/api/users?userId='+friendId)
              setsender(userAccount.data)
            
            }catch(err) {
              console.log(err);
            }
          }

          getUser(message.sender);
    },[])

    return (
        <div className={own ? "message own" : 'message'} >
            <div className="message__top" >
                <Link to={'/profile/' + sender?.username} >
                <img className="message__img"  alt=""  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" ></img>
                </Link>
                <p className="message__text" >{message.text}</p>
            </div>

            <div className="message__bottom" >
                {format(message.createdAt)}
            </div>
        </div>
    )
}

export default Message
