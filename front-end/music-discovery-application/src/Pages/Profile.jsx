import React from "react"
import { useState, useEffect, useContext} from "react"
import appContext from "./context"
import { getLibrary } from "../utilities.jsx"

export default function Profile () {
    const [library, setLibrary] = useState([])
    const {loggedIn, setLoggedIn, token, setToken} = useContext(appContext)
    

    useEffect(() => {
        getLibrary()
            .then(my_library => {
                setLibrary(my_library.playlist);
            })
            .catch(error => {
                console.error("Error fetching library:", error);
            });
    }, []);

    return (
        <div className="profile">
            <div className="library">
                <h5>Library</h5>
                <div className="playlistList">
                    {library.map((list, index) => (
                    <li key={index} className="listItem">{list.playlist_name}</li>
                    ))}   
                </div>
            </div>
            <div className="playlist" >
                <h1>This is my Profile Page</h1>
            </div>
            
        </div>
    )
}