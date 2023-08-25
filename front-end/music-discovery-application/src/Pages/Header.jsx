import {Link, useNavigate} from "react-router-dom"
import { useState, useEffect } from "react"
import { useContext } from "react"
import appContext from "./context"
import { api } from "../utilities.jsx"


export default function Header () {
    const navigate = useNavigate()
    const {token, setToken, loggedIn, setLoggedIn} = useContext(appContext)

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            setToken(storedToken)
            setLoggedIn(true)
        }
    }, [setLoggedIn, setToken, loggedIn])

    const logout = async (e) => {
        setToken("")
        localStorage.removeItem("token")
        localStorage.removeItem("Bearer")
        setLoggedIn(false)
        navigate('/')
  
    }


    return (
        <div className="Home">
            <div className="Header">
                <div className="homeButton">
                    <Link to="/"><button type="button" className="btn btn-primary">Home</button></Link>
                </div>
                <h1>Lucid Streaming</h1>
                <div className="HeaderButtons">
                    {!loggedIn ? (<Link to="signup"><button type="button" className="btn btn-primary">SIGN UP</button></Link>) : <Link to="signin/profile"><button type="button" className="btn btn-primary">Profile</button></Link>}
                    {!loggedIn ? <Link to="signin"><button type="button" className="btn btn-primary">LOG IN</button></Link> : <button type="button" className="btn btn-primary" onClick={logout}>LOG OUT</button>}

                </div>
            </div>
        </div>
    )
}





    // const CLIENT_ID = '149f6f2b228f48b48db6a18ee5c0c42a'
    // const REDIRECT_URI = "http://localhost:5173/"
    // const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    // const RESPONSE_TYPE = "token"

    // useEffect(() => {
    //     const hash = window.location.hash 
    //     let token = window.localStorage.getItem("token")
    //     if (!token && hash) {
    //         token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    //         window.location.hash = ""
    //         window.localStorage.setItem("token", token)
    //         setToken(token)
    //     }
    // }, []) 