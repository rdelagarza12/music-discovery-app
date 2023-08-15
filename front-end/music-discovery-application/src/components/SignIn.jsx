import React from "react"
import { Link, useNavigate} from "react-router-dom"
import { useEffect, useContext } from "react"
import appContext from "../Pages/context"
import { api } from "../utilities.jsx"

export default function SignIn() {

    const navigate = useNavigate()
    const {loggedIn, setLoggedIn, userName, setUserName, password, setPassword, user, setUser} = useContext(appContext)
    
    const logInUser = async (e) => {
        e.preventDefault()
        let response = await api.post('users/login/', {
            email: userName,
            password: password
        })
        console.log(response.data)
        let my_user = response.data.user;
        let token = response.data.user_token;
        let spotify_access_token = response.data.access_token
        localStorage.setItem("token", token);
        localStorage.setItem("Bearer", spotify_access_token)
        api.defaults.headers.common['Authorization'] = `Token ${token}`;
        setUser(my_user)
        setLoggedIn(!loggedIn)
        navigate("/signin/profile")
    }

    return (
        <div className="register">
            <form onSubmit={logInUser}>
                <input 
                type="email"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Email Address" 
                style={{ marginBottom: "10px" , width: "20vw"}}/>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" 
                style={{ marginBottom: "10px", width: "20vw" }}/>
                <button type="submit" className="btn btn-primary">SIGN IN</button> 
            </form>
            
        </div>
    )
}