import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import { useContext, useEffect } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "./context/AuthContext";
import {useHistory} from 'react-router';
import axios from 'axios';
import Messenger from "./pages/messenges/Messenger";
function App() {

  const {user , dispatch} = useContext(AuthContext);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getUser = async (userId) => {
      try{

        const userAccount = await axios.get('http://localhost:8800/api/users?userId='+JSON.parse(userId))
        dispatch({type : 'LOGIN_SUCCESS' , payload :userAccount.data})
      }catch(err) {
        console.log(err);
      }
    }
    
    if(userId){
      getUser(userId)
    }
  },[]);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            {user ? <Home/> : <Register/>}
          </Route>

          <Route path="/login" exact >
            {user ? <Redirect to="/" /> :<Login/>}
          </Route>

          <Route path="/register" exact >
            {/* <Register/> */}
            {user ? <Redirect to="/" /> :<Register/>}
          </Route>

          <Route path="/messenger" exact >
            {/* <Register/> */}
            {!user ? <Redirect to="/" /> :<Messenger/>}
          </Route>

          <Route path="/profile/:username" exact >
            <Profile/>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
