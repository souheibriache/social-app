import { useContext, useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'
import './Feed.css'

function Feed({username}) {
    const [posts, setposts] = useState([]);
    const {user} = useContext(AuthContext)
    useEffect(() => {
        const fetchPosts = async() => {
            const res = username ? await axios.get('http://localhost:8800/api/posts/profile/'+username) : await axios.get('http://localhost:8800/api/posts/timeline/'+user._id)
            setposts(res.data.sort((p1,p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            })) 
        }
        fetchPosts()
    }, [username , user?._id])
    return (
        <div className="feed" >
            <div className="feed_wrapper" >
                {!username ? <Share/> : username === user?.username ? <Share/> : <></>}
                
                {posts.map((post) => {
                    return(
                        <Post post={post} key={post._id} />
                    )
                })}
                
            </div>
        </div>
    )
}

export default Feed
