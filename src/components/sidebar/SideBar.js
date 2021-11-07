import { Bookmark, Chat, Event, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline } from '@material-ui/icons'
import React from 'react'
import './SideBar.css'
import {Users} from '../../dummyData'
import CloseFriends from '../closeFriends/CloseFriends'
import { Link } from 'react-router-dom'
function SideBar() {
    return (
        <div className="sidebar" >
            <div className="sidebar__wrapper" >
                <ul className="sidebar__list" >
                    <li className="sidebar__list__item" >
                        <RssFeed className="sidebarListItem__icon" />
                        <span className="sidebarListItem__text" >Feed</span>
                    </li>

                    <li className="sidebar__list__item" >
                        <Link to='/messenger' style={{textDecoration : "none" , color: "black" , display: "flex" , alignItems: "center"}} >
                        <Chat className="sidebarListItem__icon" />
                        <span className="sidebarListItem__text" >Chat</span>
                        </Link>
                    </li>

                    <li className="sidebar__list__item" >
                        <PlayCircleFilledOutlined className="sidebarListItem__icon" />
                        <span className="sidebarListItem__text" >Videos</span>
                    </li>

                    <li className="sidebar__list__item" >
                        <Bookmark className="sidebarListItem__icon" />
                        <span className="sidebarListItem__text" >Bookmarks</span>
                    </li>

                    <li className="sidebar__list__item" >
                        <HelpOutline className="sidebarListItem__icon" />
                        <span className="sidebarListItem__text" >Questions</span>
                    </li>

                    <li className="sidebar__list__item" >
                        <WorkOutline className="sidebarListItem__icon" />
                        <span className="sidebarListItem__text" >Jobs</span>
                    </li>

                    <li className="sidebar__list__item" >
                        <Event className="sidebarListItem__icon" />
                        <span className="sidebarListItem__text" >Events</span>
                    </li>

                    <li className="sidebar__list__item" >
                        <School className="sidebarListItem__icon" />
                        <span className="sidebarListItem__text" >Courses</span>
                    </li>
                </ul>

                <button className="sidebar__button" >
                    Show more
                </button>
                <hr className="sidebar__hr" />

                <ul className="sidebar__friendList">

                    {Users.map((user) => {
                        return(
                            <CloseFriends key={user.id} user={user}/>
                        )
                    })
                    }

                </ul>

            </div>
        </div>
    )
}

export default SideBar
