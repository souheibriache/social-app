import React, { useContext, useEffect, useRef, useState } from 'react'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversations from '../../components/conversations/Conversations'
import Message from '../../components/message/Message'
import Topbar from '../../components/topbar/Topbar'
import { AuthContext } from '../../context/AuthContext'
import './Messenger.css'
import axios from 'axios'
import io from 'socket.io-client'
function Messenger() {

    const {user} = useContext(AuthContext);
    const [conversation, setconversation] = useState([]);
    const [currentChat, setcurrentChat] = useState(null);
    const [messages, setmessages] = useState([]);
    const socket = useRef()
    const [newMessage, setnewMessage] = useState('');
    const [arrivalMessage, setarrivalMessage] = useState(null);
    const [onlineUsers, setonlineUsers] = useState([]);
    const scrollRef = useRef()

    useEffect(() => {
        socket.current = io('ws://localhost:8900');
        socket.current.on('getMessage' , data => {
            setarrivalMessage({
                sender : data.senderId,
                text : data.text,
                createdAt : Date.now(),
            })
        })
    },[])

    useEffect(() => {
        socket.current.emit('adduser', user._id)
        socket.current.on("getusers", users => {
            setonlineUsers(user.following.filter(f => users.some(u => u.userId === f)))
        })
    },[user])


    useEffect(() => {
        const getConversations = async () =>{
            try{
                if(user){

                    const res = await axios.get('http://localhost:8800/api/conversations/'+user._id)
                    setconversation(res.data)
                }
            }catch(err){
                console.log(err);
            }
        }

        getConversations();
    },[user]);


    useEffect(() => {
        const getMessages = async() => {
            try{
                const res = await axios.get("http://localhost:8800/api/messages/"+currentChat._id)
                setmessages(res.data)
            }catch(err){
                console.log(err)
            }
        }

        getMessages()
    }, [currentChat])



    const handleSubmit = async(e) => {
        e.preventDefault();
        const message = {
            sender : user._id, 
            text : newMessage,
            conversationId : currentChat._id
        };

        const receiverId = currentChat.members.find(member => member !== user._id)
        socket.current.emit('sendMessage' , {
            senderId : user._id,
            receiverId : receiverId,
            text : newMessage
        })
        try{
            const res = await axios.post('http://localhost:8800/api/messages', message)
            setmessages([...messages , res.data])
            setnewMessage('')
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({behavior : 'smooth'})
    }, [messages]);

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        setmessages(prev => [...prev, arrivalMessage])
    } ,[arrivalMessage , currentChat])

    return (
        <>
            <Topbar />
            <div className="messenger" >
                <div className="chat__menu" >
                    <div className="chat__menu__wrapper" >
                        <input placeholder="Search for friends" className="chat__menu__search"></input>
                        {conversation?.map(conversation => {
                            return(
                            <div onClick={() => setcurrentChat(conversation)} >
                            <Conversations conversation={conversation} currentUser={user} />
                            </div>)
                        })}
                    </div>
                </div>
                <div className="chat__box" >
                <div className="chat__box__wrapper" >
                    { currentChat ? 
                    <>

                        <div className="chat__box__top" >
                            {
                                messages.map(message => {
                                    return(
                                        <div ref={scrollRef}>
                                        <Message own={message.sender === user._id} message={message} user={user} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <form onSubmit={(e) => handleSubmit(e)} className="chat__box__bottom" >
                            <textarea 
                                className="chat__message__input" 
                                name="message" placeholder="write something" 
                                onChange={(e) => setnewMessage(e.target.value)}
                                value={newMessage}

                            ></textarea>
                            <button type="submit" className="chat__submit__button" >Send</button>
                        </form>
                    
                    </> : <span className="chat__noconversation__text" >Open a conversation to start a chat</span>}
                    </div>
                </div>
                <div className="chat__online" >
                    <div className="chat__online__wrapper" >
                        
                        <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setcurrentChat={setcurrentChat} />
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger
