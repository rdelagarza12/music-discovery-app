import GenreGenerator from "../components/GenreGenerator"
import {useEffect, useState} from "react"
import { useAppContext } from "../Pages/context.jsx"
import GetArtistByGenre from "../components/GetArtistsFromGenre"
import GetSongsBySpecifics from "../components/GetSongsBySpecifics"
import GetSongsForPlaylist from "../components/GetSongsForPlaylist"
import { generatePlaylist } from "../utilities"
import { useNavigate } from "react-router-dom"


export default function PlaylistGenerator () {
    const navigate = useNavigate()
    const { songs, selectedGenres, library, setUpdatedLibrary, setSelectedGenres, setSelectedArtists, setArtists, setMaxSearch} = useAppContext()
    const [category, setCategory] = useState("genre")
    const [page, setPage] = useState(0)
    const [playlistName, setPlaylistName] = useState("")
    const [playlistGenerated, setPlaylistGenerated] = useState(false)

    useEffect(() => {
        if (page === 0) {
            setCategory(0)
        } else if (page === 1) {
            setCategory(1)
        } else if (page === 2) {
            setCategory(2)
        } else if (page === 3) {
            setCategory(3)
        }
    }, [page])

    return ( <>{playlistGenerated ? <div><h1>Generating your playlist... Be patient</h1></div> : 
        <div className="playlist">
            <div className="page">
            <h4>PLAYLIST GENERATOR</h4>  
                {page === 0 ? <GenreGenerator /> : page === 1 ? <GetArtistByGenre /> : page === 2? <GetSongsBySpecifics /> : <GetSongsForPlaylist />}
            </div>
            <div className="nav-buttons">
                <button style={{width: "9vw", height: "5vh", marginTop: "2vh"}} onClick={(e) => setPage(page - 1)}className="btn btn-primary">
                    PREVIOUS
                </button>
                {page < 3 ? <button style={{width: "9vw", height: "5vh", marginTop: "2vh"}} onClick={(e) => setPage(page + 1)}className="btn btn-primary">
                    NEXT 
                </button> :
                <><button style={{width: "12vw", height: "5vh", marginTop: "2vh"}} onClick={(e) => generatePlaylist(playlistName, selectedGenres, songs, library, setUpdatedLibrary, setPlaylistGenerated, navigate, setSelectedGenres, setSelectedArtists, setArtists, setMaxSearch)} className="btn btn-primary">SAVE PLAYLIST</button><input onChange={(e) => setPlaylistName(e.target.value)} placeholder="playlist name"/></>}
            </div>
        </div>                
                }</>

    )
}