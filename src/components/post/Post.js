import { MoreVert } from '@material-ui/icons'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {format} from 'timeago.js'
import {AuthContext} from '../../context/AuthContext'
import './Post.css'
function Post({post}) {
    const [like , setlike] = useState(post.likes.length)
    const [isLiked , setisLiked] = useState(false)
    const {user:currentUser} = useContext(AuthContext)
    const [user, setuser] = useState({})
    // const user = Users.filter(user => user.id === post.userId)[0]
    const pf = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(() => {
        setisLiked(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes])

    const likeHandler = () => {
        try{    
            axios.put(`http://localhost:8800/api/posts/${post._id}/like`, {userId : currentUser._id})
                .then(result => {
                    console.log('post has been liked')

                })
        }catch(err){
            console.log(err)
        }
        setlike(isLiked ? like-1 : like+1)
        setisLiked(!isLiked)
    }

    useEffect(() => {
        const fetchUser = async() => {
            const res = await axios.get('http://localhost:8800/api/users?userId='+post.userId)
            setuser(res.data) 
        }
        fetchUser()
    }, [post.userId])

    return (
        <div className="post" >
            <div className="post__wrapper" >
                <div className="post__top" >
                    <div className="top__left" >
                        <img alt="" src={user.profilePicture? pf+ user.profilePicture : pf+"person/noAvatar.png"} className="post__profile__img" ></img>
                        <Link style={{textDecoration : "none" , color : '#000000'}} to={`/profile/${user.username}`} >
                        <span className="post__username" >{user.username}</span>
                        </Link>
                        <span className="post__date" >{format(post.createdAt)}</span>
                    </div>

                    <div className="top__right" >
                        <MoreVert />
                    </div>
                </div>

                <div className="post__center" >
                    <span className="post__text" >{post?.desc}</span>
                    <img className="post__image" src={pf+post.image} alt="" ></img>
                </div>

                <div className="post__bottom" >
                    <div className="post__bottomo__left" >
                        <img alt="" className="like__icon" src={pf+"/like.png"} onClick={likeHandler} ></img>
                        <img alt="" className="like__icon" src={pf+"/heart.png"} onClick={likeHandler} ></img>
                        <span className="like__counter" >{like} people like it</span>
                    </div>


                    <div className="post__bottomo__right" >
                        <span className="post__comment__text" >{post.comment } comments</span>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default Post
