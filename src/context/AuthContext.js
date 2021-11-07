import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
//     user: {
//         coverPicture: "",
// createdAt: "2021-10-29T18:50:09.287Z",
// email: "gs_riache@esi.dz",
// followers: (2) ['617485fb4d1f93509fd5f322', '6172d2b8efb22eabefa430b7'],
// following: (2) ['617485fb4d1f93509fd5f322', '6172d2b8efb22eabefa430b7'],
// isAdmin: false,
// profilePicture: "",
// username: "souheib_riache"
// __v: 0,
// _id: "617c4261f7999f6a730ca5b8",
//     },
    user: null,
    isFetching: false,
    error: false,
}

export const AuthContext = createContext(INITIAL_STATE);


export const AuthContextProvider = ({children}) =>{
    const [state , dispatch] = useReducer(AuthReducer , INITIAL_STATE);
    return(
        <AuthContext.Provider value={{user: state.user , isFetching: state.isFetching , error : state.error , dispatch}} >
            {children}
        </AuthContext.Provider>
    )
}