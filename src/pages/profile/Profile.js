import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Feed from '../../components/feed/Feed'
import RightBar from '../../components/rightbar/RightBar'
import SideBar from '../../components/sidebar/SideBar'
import Topbar from '../../components/topbar/Topbar'
import './Profile.css'

function Profile() {
    const [user, setuser] = useState({});
    const {username} = useParams();
    useEffect(() => {
        const fetchUser = async() => {
            const res = await axios.get('http://localhost:8800/api/users?username='+username)
            setuser(res.data)
            console.log(user) 
        }
        fetchUser()
    }, [username])
    const pf = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
            <Topbar />
            <div className="profile__container" >
                <SideBar />
                <div className="profile__right" >
                    <div className="profileRight__top" >
                        <div className="profile__cover" >
                            <img alt="" src={user.coverPicture ? pf+user.coverPicture : pf+"person/noCover.png"} className="profile__coverImage" ></img>
                            <img alt="" src={user.profilePicture ? pf+user.profilePicture : pf+"person/noAvatar.png"} className="profile__userImage" ></img>
                        </div>

                        <div className="profile__info" >
                            <h4 className="profile__info__name" >{user.username}</h4>
                            <span className="profile__info__derc" >{user.desc}</span>
                        </div>

                    </div>

                    <div className="profileRight__bottom" >
                        <Feed username={username} />
                        <RightBar user={user}/>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Profile
