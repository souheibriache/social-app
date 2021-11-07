import './RightBar.css'
import { Users } from '../../dummyData'
import Online from '../online/Online'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';
function RightBar({ user }) {
    const [friends, setFriends] = useState([])
    const pf = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser  , dispatch} = useContext(AuthContext)
    const [followed, setFollowed] = useState(false)
    const [following, setFollowing] = useState(false)

    useEffect(() => {
        setFollowed(currentUser?.following.includes(user?.id))
    }, [currentUser, user?.id])
    const HomeRightBar = () => {
        return (
            <>

                <div className="birthday__container" >
                    <img src={pf + "gift.png"} className="birthday__img" alt="" ></img>
                    <span className="birthday__text" >
                        <b>Pola foster</b> and <b>3 other friends</b> have their birthday today
                    </span>
                </div>

                <img src={pf + "ad.png"} className="rightbat__ad" alt=""></img>
                <h4 className="rightbar__title" >Online friends </h4>
                <ul className="rightbar__frield__list" >
                    {Users.map((user) => {
                        return (
                            <Online key={user.id} user={user} />
                        )
                    })
                    }

                </ul>
            </>
        )
    }

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get('http://localhost:8800/api/users/friends/' + user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err)
            }
        }

        getFriends()
    }, [user])

    const followHandler = async () => {
        setFollowing(true)
        try {
            if(followed){
                await axios.put('http://localhost:8800/api/users/'+user._id+'/unfollow' , {userId : currentUser._id});
                dispatch({type: "UNFOLLOW" , payload: user._id})
            }else{
                await axios.put('http://localhost:8800/api/users/'+user._id+'/follow', {userId : currentUser._id})
                dispatch({type: "UNFOLLOW" , payload: user._id})
            }
        } catch (err) {
            console.log(err)
        }
        setFollowed(!followed)
        setFollowing(false)
    }

    const ProfileRightBar = () => {
        return (
            <>
                {user.username !== currentUser?.username ? (
                    <button className="rightbar__follow__button" onClick={followHandler} >
                        {following ? <CircularProgress color="white" size="20px"/> 
                        :followed ? (<>{"Unfollow"} <Remove/></>) :  (<>{"Follow"} <Add/></>)
                        }
                    </button>) : (
                    <></>)}
                <h4 className="rightbar__title" >User information</h4>
                <div className="rightbar__info" >
                    <div className="rightbar__info__item" >
                        <span className="rightbar__info__key" >City: </span>
                        <span className="rightbar__info__value" >{user.city}</span>
                    </div>

                    <div className="rightbar__info__item" >
                        <span className="rightbar__info__key" >From: </span>
                        <span className="rightbar__info__value" >{user.from}</span>
                    </div>

                    <div className="rightbar__info__item" >
                        <span className="rightbar__info__key" >Relationship: </span>
                        <span className="rightbar__info__value" >{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "Complicated"}</span>
                    </div>

                </div>

                <h4 className="rightbar__title" >User friends</h4>
                <div className="rightbar__followings" >
                    {
                        friends ?
                            friends.map(friend => {
                                return (
                                    <Link key={friend._id} to={"/profile/" + friend.username} style={{ textDecoration: "none", color: "black" }}>
                                        <div className="rightbar__following"  >
                                            <img className="rightbar__following__img" alt="" src={friend.profileImage ? pf + friend.profileImage : pf + 'person/noAvatar.png'} ></img>
                                            <span className="rightbar__following__name" >{friend.username}</span>
                                        </div>
                                    </Link>
                                )
                            }) : (<></>)
                    }




                </div>
            </>
        )
    }

    return (
        <div className="rightbar" >
            <div className="rightbar__wrapper" >
                {user ? <ProfileRightBar /> : <HomeRightBar />}
            </div>
        </div>
    )
}

export default RightBar
