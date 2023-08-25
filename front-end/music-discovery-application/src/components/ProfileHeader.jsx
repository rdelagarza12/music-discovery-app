import { useContext, useEffect} from "react";
import appContext from "../Pages/context";
import { getLibrary } from "../utilities";
import ProfileMain from "./ProfileMain";

export default function ProfileHeader () {

    const {library, setLibrary} = useContext(appContext)
        
    
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
        </div>
    )
}