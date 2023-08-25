import {Link, useNavigate} from "react-router-dom"
import {useEffect} from "react"
import { useAppContext } from "./context"
import { getCurrentTime } from "../utilities"


export default function Header () {
    const navigate = useNavigate()

    const {currentTime,
           setCurrentTime,
           token, 
           setToken,
           tokenTime,
           setTokenTime,
           loggedIn, 
           setLoggedIn, 
           setMaxSearch,
           setSelectedArtists,
           setSelectedGenres,
           setAcoustic,
           setInstrumental,
           setSpeechiness,
           setDanceability,
           setTempo,
           setDuration,
           setEnergy,
           setPopularity,
           setSongs,
            } = useAppContext()
    
            // THIS FUNCTION RESETS THE GENERATOR WHEN YOU NAVIGATE OUT OF THE PLAYLIST
    const resetGenerator = () => {
        setMaxSearch(0)
        setSelectedArtists([])
        setSelectedGenres([])
        setAcoustic(.5)
        setInstrumental(.5)
        setSpeechiness(.5)
        setDanceability(.5)
        setTempo(.5)
        setDuration(180000)
        setEnergy(.5)
        setPopularity(100)
        setSongs([])
    }
    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            setToken(storedToken)
            setLoggedIn(true)
        }
        
    }, [setLoggedIn, setToken, loggedIn])

    useEffect(() => {
        const time = getCurrentTime()
        setCurrentTime(time)
        console.log(time)
    }, [tokenTime])

    const logout = async (e) => {
        setToken("")
        localStorage.removeItem("token")
        localStorage.removeItem("Bearer")
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('expires_in')
        localStorage.removeItem('token expiration time')
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
                    {!loggedIn ? (<Link to="signup"><button type="button" className="btn btn-primary">SIGN UP</button></Link>) : <Link to="signin/profile"><button type="button" onClick={resetGenerator} className="btn btn-primary">Profile</button></Link>}
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