import { CircularProgress } from '@material-ui/core'
import React, { useContext, useEffect, useRef } from 'react'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import './Login.css'

function Login() {
    const email = useRef()
    const password = useRef()
    const {user, isFetching , error, dispatch} = useContext(AuthContext);


    const handleClick = (e) => {
        e.preventDefault()
        
        loginCall({email: email.current.value, password : password.current.value} , dispatch)
        
    }

    useEffect(() => {
        console.log(isFetching);
    },[isFetching])

    console.log(user);
    return (
        <div className="login" >
            <div className="login__wrapper" >
                <div className="login__left" >
                    <h3 className="login__logo" >RiaSocial</h3>
                    <span className="login__desc" >Connect with friends and the world around you on RiaSocial.</span>
                </div>

                <div className="login__left" >
                    <form className="login__box" onSubmit={e => handleClick(e)}>
                        <input className="login__input" type="email" required placeholder="Email" ref={email} ></input>
                        <input className="login__input" type="password" required minLength={6} placeholder="Password" ref={password}></input>
                        <button className="login__button" disabled={isFetching} >{isFetching ? <CircularProgress color="white" size="20px" />  : "Log In"}</button>
                        <span className="login__forgot" >Forgot password?</span>
                        <button className="login__register__button" >Create a New Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
