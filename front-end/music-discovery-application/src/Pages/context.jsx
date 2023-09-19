import { createContext, useContext, useState, useRef} from "react"

const appContext = createContext(null)

export const AppProvider = ({children}) => {
    const [isTokenAvailable, setIsTokenAvailable] = useState(false);
    const [playlistName, setPlaylistName] = useState("")
    const [currentTime, setCurrentTime] = useState("")
    const [tokenExpirationTime, setTokenExpirationTime] = useState("")
    const [token, setToken] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName]  = useState("");
    const [password, setPassword] = useState("");
    const [library, setLibrary] = useState([]);
    const [updatedLibrary, setUpdatedLibrary] = useState([])
    const [maxSearch, setMaxSearch] = useState(0);
    const [allGenres, setAllGenres] = useState([]);
    const [searchGenre, setSearchGenre] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [artists, setArtists] = useState([])
    const [artistsNames, setArtistsNames] = useState([])
    const [selectedArtists, setSelectedArtists] = useState([])
    const [songs, setSongs] = useState([])
    const [acoustic, setAcoustic] = useState(.5)
    const [instrumental, setInstrumental] = useState(.5)
    const [speechiness, setSpeechiness] = useState(.5)
    const [danceability, setDanceability] = useState(.5)
    const [tempo, setTempo] = useState(50.00)
    const [duration, setDuration] = useState(180000)
    const [energy, setEnergy] = useState(.5)
    const [popularity, setPopularity] = useState(100)
    const [selectedPlaylist, setSelectedPlaylist] = useState("")
    const [selectedPlaylistSongs, setSelectedPlaylistSongs] = useState([])
    const [currentSong, setCurrentSong] = useState({})
    const [playlistDelete, setPlaylistDelete] = useState("")
    const isMounted = useRef(false)

    return (
        <appContext.Provider value={{isTokenAvailable, setIsTokenAvailable, 
                                    playlistName, setPlaylistName, 
                                    currentTime, setCurrentTime, 
                                    token, setToken, 
                                    tokenExpirationTime, setTokenExpirationTime, 
                                    loggedIn, setLoggedIn,
                                    userName, setUserName, 
                                    password, setPassword, 
                                    library, setLibrary, 
                                    allGenres, setAllGenres, 
                                    updatedLibrary, setUpdatedLibrary, 
                                    playlistDelete, setPlaylistDelete, 
                                    searchGenre, setSearchGenre, 
                                    selectedGenres, setSelectedGenres, 
                                    artists, setArtists, 
                                    artistsNames, setArtistsNames, 
                                    selectedArtists, setSelectedArtists, 
                                    isMounted, 
                                    songs, setSongs, 
                                    acoustic, setAcoustic, 
                                    instrumental, setInstrumental, 
                                    speechiness, setSpeechiness, 
                                    danceability, setDanceability, 
                                    tempo, setTempo, 
                                    duration, setDuration, 
                                    energy, setEnergy, 
                                    popularity, setPopularity, 
                                    maxSearch, setMaxSearch, 
                                    selectedPlaylist, setSelectedPlaylist, 
                                    currentSong, setCurrentSong, 
                                    selectedPlaylistSongs, 
                                    setSelectedPlaylistSongs}}>
            {children}
        </appContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(appContext)
}