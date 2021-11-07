import React, { useRef } from 'react'
import './Register.css'
import axios from 'axios'
import { useHistory } from 'react-router'
function Register() {
    const email = useRef()
    const password = useRef()
    const username = useRef()
    const passwordAgain = useRef()
    const history = useHistory()

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            password.current.setCustomValidity("Passwords don't match");
        } else {
            // const user = {
            //     username : username.current.value,
            //     email : email.current.value,
            //     password : password.current.value,

            // }
            // try{
            //     await axios.post('http://localhost:8800/api/auth/register', {
            //         body: user
            //     });
            //     history.push('/')
            // }catch(err){
            //     console.log(err)
            // }

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("email", email.current.value);
            urlencoded.append("password", password.current.value);
            urlencoded.append("username", username.current.value);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            fetch("http://localhost:8800/api/auth/register", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result)
                    history.push('/')
                })
                .catch(error => console.log('error', error));
        }

    }

    return (
        <div className="login" >
            <div className="login__wrapper" >
                <div className="login__left" >
                    <h3 className="login__logo" >RiaSocial</h3>
                    <span className="login__desc" >Connect with friends and the world around you on RiaSocial.</span>
                </div>

                <div className="login__left" >
                    <form className="login__box" onSubmit={(e) => handleClick(e)} >
                        <input className="login__input" ref={username} placeholder="Username" required ></input>
                        <input className="login__input" ref={email} type="email" placeholder="Email" required></input>
                        <input className="login__input" ref={password} type="password" min="6" placeholder="Password" required></input>
                        <input className="login__input" ref={passwordAgain} type="password" min="6" placeholder="Confirm Password" required></input>
                        <button className="login__button" >Sign up</button>
                        <button className="login__register__button" onClick={() => history.push('/login')} >Log into your account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
