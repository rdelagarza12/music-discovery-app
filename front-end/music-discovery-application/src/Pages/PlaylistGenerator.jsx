import GenreGenerator from "../components/GenreGenerator"
import { useContext, useEffect, useState, useSyncExternalStore } from "react"
import appContext from "./context"

export default function PlaylistGenerator () {
    
    const {search, setSearch, selectedGenres} = useContext(appContext)
    let category = "genre"

    useEffect(() => {
        
        if (search.length === 0 ) {
            category = "genre"
        }
        else if (search.length === 1) {
            category = "album"
        }
    }, [search])

    useEffect(() => {
        console.log(selectedGenres)
    }, [selectedGenres])

    return (
        <div className="playlist">
            <h2>PLAYLIST GENERATOR</h2>
            {category === "genre" ? <GenreGenerator /> : <h1>hello</h1> }
            <button onSubmit={(e) => setSearch([...search, selectedGenres])}></button>
        </div>
    )
}