import React, { useContext } from 'react'
import './Topbar.css'
import {Search , Person, Chat , Notifications} from '@material-ui/icons'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
function Topbar() {

    const {user} = useContext(AuthContext);
    const pf = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <div className="topbar__container">
            <div className="topbar__left" >
                <Link style={{textDecoration: "none"}} to="/" > <span className="topbar__logo" >RiaSocial</span></Link>
            </div>
            <div className="topbar__center" >
                <div className="searchbar" >
                    <Search className="search__icon" />
                    <input className="search__input" placeholder='Search for friend, post or a video' >
                    </input>
                </div>
            </div>
            <div className="topbar__right" >
                <div className="topbar__links" >
                    <span className="topbar__link" >Homepage</span>
                    <span className="topbar__link" >Timeline</span>

                </div>
                <div className='topbar__icons' >
                    <div className="topbaricon__item" >
                        <Person/>
                        <span className="topbar__icon__badge" >1</span>
                    </div>

                    <div className="topbaricon__item" >
                        <Chat/>
                        <span className="topbar__icon__badge" >2</span>
                    </div>

                    <div className="topbaricon__item" >
                        <Notifications/>
                        <span className="topbar__icon__badge" >1</span>
                    </div>
                </div>
                <Link to={`/profile/${user?.username}`} >
                <img className="profile__pic" src={user?.profilePicture ?  pf+ user.profilePicture: pf+'person/noAvatar.png '} alt="" ></img>
                </Link>
            </div>
        </div>
    )
}

export default Topbar
