import { useEffect} from "react";
import {useAppContext} from "../Pages/context";
import { getLibrary } from "../utilities";

import Library  from "./Library.jsx"

export default function ProfileHeader () {

    const {setLibrary, updatedLibrary} = useAppContext()
        
    
        useEffect(() => {
            getLibrary()
                .then(my_library => {
                    setLibrary(my_library.playlist);
                })
                .catch(error => {
                    console.error("Error fetching library:", error);
                });
        }, [updatedLibrary]);    


    return (
        <div className="profile">
            <Library />
        </div>
    )
}