import {useEffect, useState} from "react"
import { api } from "../utilities"
import { useAppContext } from "../Pages/context"
import { Link } from "react-router-dom"


export default function SinglePlaylist() {

    const {selectedPlaylist, setSelectedPlaylist, selectedPlaylistSongs, setSelectedPlaylistSongs} = useAppContext()

    

    useEffect(() => {
        const getSinglePlaylist = async () => {
            if (!selectedPlaylist) return; 
            try {

                const response = await api.get(`/playlists/${selectedPlaylist}/`, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data);
                return response.data.playlist_song
            } catch (error) {
                console.log(error);
            }
        };

        getSinglePlaylist().then(songs => {
            setSelectedPlaylistSongs(songs)

        });
    }, [selectedPlaylist]);


    return (
        <div className="single-playlist-page">
            <h1>{selectedPlaylist.replace("-", " ")}</h1> 
            <div className="playlist-song-list">
            {selectedPlaylistSongs ? (
                <ul>
                    {selectedPlaylistSongs.map(song => (
                        <li className="individual-song" key={song.id}>
                            {song.actual_song.song_name}
                        </li>
                    ))}
                </ul>
            ) : (
                <h1>Loading...</h1>
            )}
            </div>
            <div>
            <button className="btn btn-primary"><Link to="/signin/profile/musicplayer">Play</Link></button>
            </div>

        </div>
    )
}