import React from "react"
import {useNavigate} from "react-router-dom"

import { useAppContext } from "../Pages/context"
import { api, generateRandomString, CLIENT_ID, REDIRECT_URI, getCurrentTime} from "../utilities.jsx"

export default function SignIn() {

    const navigate = useNavigate()
    const {loggedIn, setLoggedIn, userName, setUserName, password, setPassword, user, setUser, currentTime, tokenExpirationTime, setTokenExpirationTime} = useAppContext()
    
    const logInUser = async (e) => {
        e.preventDefault()
        let response = await api.post('users/login/', {
            email: userName,
            password: password
        })
        setLoggedIn(!loggedIn)
        let token = response.data.token;
        localStorage.setItem("token", token);
        const current_time = getCurrentTime()
        const expiration_time = new Date(current_time.setHours(current_time.getHours() + 1))
        setTokenExpirationTime(expiration_time)
        localStorage.setItem("token expiration time", expiration_time)
        const state = generateRandomString(16);
        const scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming user-read-playback-position user-top-read user-read-recently-played';

        const queryParams = new URLSearchParams({
            response_type: 'code',
            client_id : CLIENT_ID,
            scope : scope,
            redirect_uri : REDIRECT_URI,
            state : state,
          });
        const authorizationUrl = `https://accounts.spotify.com/authorize?${queryParams}`;
        window.location.href = authorizationUrl;
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