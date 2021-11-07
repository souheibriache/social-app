import { Cancel, EmojiEmotions, Label, PermMedia, Room } from '@material-ui/icons'
import React, { useContext, useRef, useState } from 'react'
import './Share.css'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
function Share() {
    const { user } = useContext(AuthContext)
    const pf = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef();
    const [file, setfile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.image = fileName;
            console.log(newPost);
            try {
                await axios.post('http://localhost:8800/api/upload', data)
            } catch (err) {
                console.log(err)
            }
        }

        try {
            await axios.post('http://localhost:8800/api/posts', newPost).then(result => window.location.reload())
        } catch (err) { console.log(err) }
    }
    return (
        <div className="share" >
            <div className="share__wrapper" >
                <div className="sharetop" >
                    <img src={user.profilePicture ? pf + user.profilePicture : pf + 'person/noAvatar.png'} className="share__profile__img" alt="" ></img>
                    <input className="share__input" ref={desc} placeholder={"What's in your mind " + user.username} ></input>
                </div>
                <hr className="share__hr" />
                {
                    file && (
                        <div className="share__img__container" >
                            <img  className="share__img" src={URL.createObjectURL(file)} ></img>
                            <Cancel className="share__cancel__img" onClick={() => setfile(null)}/>
                        </div>
                    )
                }
                <form className="share__bottom" onSubmit={e => submitHandler(e)} >
                    <label htmlFor='file' className="share__options" >
                        <div className="share__option" >
                            <PermMedia htmlColor="tomato" className="share__icon" />
                            <span className="share__option__text" >Photo or Video</span>
                            <input style={{ display: "none" }} type='file' id="file" accept='.png,.jpeg,.jpg' onChange={(e) => setfile(e.target.files[0])} ></input>
                        </div>

                        <div className="share__option" >
                            <Label htmlColor="blue" className="share__icon" />
                            <span className="share__option__text" >Tag</span>
                        </div>

                        <div className="share__option" >
                            <Room htmlColor="green" className="share__icon" />
                            <span className="share__option__text" >Location</span>
                        </div>

                        <div className="share__option" >
                            <EmojiEmotions htmlColor="goldenrod" className="share__icon" />
                            <span className="share__option__text" >Feelings</span>
                        </div>

                    </label>
                    <button className="share__button" type='submit' >
                        Share
                    </button>
                </form>

            </div>

        </div>
    )
}

export default Share
