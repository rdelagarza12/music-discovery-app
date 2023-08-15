import React, { useEffect, useContext} from "react"
import { api } from "../utilities.jsx"
import { useNavigate } from "react-router-dom"
import appContext from "../Pages/context.jsx";



export default function SignUp() {
    const navigate = useNavigate();
    const {user, setUser, userName, setUserName, password, setPassword} = useContext(appContext)

    const registerUser = async (e) => {
        e.preventDefault();
        let response = await api.post("users/signup/", {
            email: userName,
            password: password
        })
        let my_user = response.data.user;
        let token = response.data.user_token;
        let spotify_access_token = response.data.spotify_token
        localStorage.setItem("token", token);
        localStorage.setItem("Bearer", spotify_access_token)
        api.defaults.headers.common['Authorization'] = `Token ${token}`;
        setUser(my_user)
        setLoggedIn(!loggedIn)
        navigate("/signin/profile")
    }

    return (
        <div className="register">
            <form onSubmit={registerUser}>
                <input 
                    type="email"
                    placeholder="Email Address"
                    value = {userName}
                    onChange={(e) => setUserName(e.target.value)}
                    style={{ marginBottom: "10px" , width: "20vw"}}/>
                <input 
                    type="password"
                    value = {password}
                    placeholder="Password"
                    onChange = {(e) => setPassword(e.target.value)} 
                    style={{ marginBottom: "10px", width: "20vw" }}/>
                <button type="submit" style={{ marginLeft: "20px"}}className="btn btn-primary">REGISTER</button>
            </form>
        </div>
    )
}