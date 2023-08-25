import { useEffect} from "react"
import { getSpecificSongs} from "../utilities"
import { useAppContext } from "../Pages/context"

export default function GetSongsForPlaylist() {
    const {songs, setSongs, selectedArtists, selectedGenres, acoustic, instrumental,
    speechiness, danceability, duration, energy, popularity, tempo} = useAppContext()

    useEffect(() => {
        const getSongRecommendation = () => {
            getSpecificSongs(selectedArtists, selectedGenres, acoustic, instrumental, speechiness, danceability, duration, energy, popularity, tempo).then((song) => {
                console.log(song)
                const all_tracks = song.tracks.map((track) => ({name : track.name, 
                                                                id : track.id,
                                                                artist : track.artists[0].name,
                                                                album : track.album.name,
                                                                album_cover : track.album.images[0].url,
                                                                album_release_date : track.album.release_date,
                                                                explicit : track.explicit,
                                                                duration_ms : track.duration_ms,
                                                                popularity : track.popularity,
                                                                uri : track.uri
                                                            }))
                setSongs(all_tracks)
            }
        )}
        getSongRecommendation() 
    }, [selectedArtists,selectedGenres, acoustic, instrumental, speechiness, danceability, duration, energy, popularity, tempo])
     

    return (
        <>
        <h4 style={{ textAlign: "center" }}>Your Personalized Playlist</h4>
        <div className="all-songs">
            {songs.map((song, index) => (
                <div className="song" key={index}>
                    <img className="album-cover" src={song.album_cover}/>
                    <h6>{song.name}</h6>
                </div>
            ))}
        </div>
        </>
 
    )
}