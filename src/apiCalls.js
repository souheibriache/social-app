import axios from 'axios'
export const loginCall = async (userCredintials , dispatch) => {
    dispatch({type : 'LOGIN_START'});
    try{
        const res = await axios.post('http://localhost:8800/api/auth/login', userCredintials);
        dispatch({type : 'LOGIN_SUCCESS' , payload:res.data} )
        localStorage.setItem("userId", JSON.stringify(res.data._id))
    }catch(err){
        dispatch({type : 'LOGIN_FAILURE' , payload:err} )
    }
}

export const registerCall = async (userCredintials , dispatch) => {
    dispatch({type : 'LOGIN_START'});
    try{
        const res = await axios.post('http://localhost:8800/api/auth/register', userCredintials);
        dispatch({type : 'LOGIN_SUCCESS' , payload:res.data} )
    }catch(err){
        dispatch({type : 'LOGIN_START' , payload:err} )
    }
}