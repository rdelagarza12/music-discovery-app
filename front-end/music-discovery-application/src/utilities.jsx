import React from "react"
import axios from "axios"
export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
});


export const CLIENT_ID = '149f6f2b228f48b48db6a18ee5c0c42a';
export const REDIRECT_URI = 'http://localhost:5173/signin/profile/';

// GET CURRENT TIMES
export const getCurrentTime = () => {
    const now = new Date()
    return now
}



export const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  };

// get the users library
export const getLibrary = async (e) => {
    let response = await api.get('/libraries/', {
        headers: {
            'Authorization' : `Token ${localStorage.getItem('token')}`
        }
    })
    let user_library = response.data
    return user_library
}

// DELETES A PLAYLIST FROM MY LIBRARY

export const deletePlaylist = async (playlistName, library, setUpdatedLibrary) => {
    console.log(playlistName);
    try {
        const response = await api.delete('/libraries/', {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            data: {
                playlist_name: playlistName
            }
        });

        if (response.status === 204) {
             const updated = library.filter(playlist => playlist != playlistName)
             setUpdatedLibrary(updated)
        }   
    } catch (error) {
        console.error("Failed to delete playlist", error);
    }
}

export const resetPlaylistGenerator = (setSelectedGenres, setSelectedArtists, setArtists, setMaxSearch) => {
    setSelectedGenres([])
    setSelectedArtists([])
    setArtists([])
    setMaxSearch(0)
}

// ----- AXIIOS CALL TO GET ALL GENRES FROM SPOTIFY
export const getGenre = async (e) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api.spotify.com/v1/recommendations/available-genre-seeds',
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('Bearer')}`
            }
        };

        const response = await axios.request(config);
        const availableGenres = response.data.genres;
        return availableGenres
    } catch (error) {
        console.log(error);
    }
};


// AXIOS CALL TO GET ARTISTS BY GENRES

export const getArtistsFromGenres = async (search) => {
    let urlSearch = "";

    for (let genre in search) {
        urlSearch += `${search[genre]}%2C`;
    }
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.spotify.com/v1/recommendations?limit=100&seed_genres=${urlSearch}`, //https://api.spotify.com/v1/search?q=${urlSearch}type=artist&limit=49
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem("Bearer")}`
        }
    };

    try {
        const response = await axios.request(config);
        let data = response.data
        let all_tracks = data.tracks
        let filtered_data = all_tracks.map((track) => (track.artists))
        return filtered_data
    } catch (error) {
        console.error(error);
        throw error;
    }
};


    // ------------- AXIOS CALL BY SPECIFCS 
    export const getSpecificSongs = async (artists, genres, acoustic, instrumental, speechiness, danceability, duration, energy, popularity, tempo) => {
        let urlArtist = "";
        let urlGenre = "";
        for (let i = 0; i < artists.length; i++) {
            if (i === (artists.length - 1)) {
                urlArtist += `${artists[i].id}&`;
            } else {
                urlArtist += `${artists[i].id}%2C`;
            }
        }
        
        for (let i = 0; i < genres.length; i++) {
            if (i === (genres.length - 1)) {
                urlGenre += `${genres[i]}&`;
            } else {
                urlGenre += `${genres[i]}%2C`;
            }
        }
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.spotify.com/v1/recommendations?limit=100&seed_artists=${urlArtist}seed_genres=${urlGenre}target_acousticness=${acoustic}&target_danceability=${danceability}&target_duration_ms=${duration}&target_energy=${energy}&target_instrumentalness=${instrumental}&target_popularity=${popularity}&target_speechiness=${speechiness}&target_tempo=${tempo}`, 
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem("Bearer")}`
            }
        };
        try {
            const response = await axios.request(config);
            let data = response.data
            return data
        } catch (error) {
            console.error("There was an error in getSong axios call", error);
        }
    }
    

    // THIS FUNCTION CREATES ONLY THE PLAYLIST (WITHOUT SONGS). ADDS IT TO LIBRARY. That was there is an available instance
    export const createPlaylist = async (playlist_name) => {
        console.log(playlist_name)
        try {
            let response = await api.post('/libraries/', 
                {
                    "playlist_name": playlist_name  // Make sure to include the playlist_name in the request body
                },
                {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                }
            );
    
            return response.data;  // Return the response data if needed
        } catch (error) {
            // Handle error here
            console.error("Error creating playlist:", error);
            throw error; // Rethrow the error to be handled by the caller
        }
    };


    // THIS FUNCTION CREATES INSTANCES OF THE SONGS AND ADDS THEM TO MY BACKEND
    export const saveSongs = async (selectedGenres, song_list) => {
        for (const song of song_list) {
            try {
                const response = await api.post(`/songs/single-songs/`, {
                    "spotify_song_id" : song.id,
                    "song_name": song.name,
                    "artist": song.artist,
                    "album": song.album,
                    "genre": selectedGenres,
                    "image_cover": song.album_cover,
                    "uri" : song.uri
                }, {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("token")}`
                    }
                });
            } catch (error) {
                console.error("Error saving Song to Database", error);
            }

        }
        
    }

    export const savePlaylistSongs = async (playlist_name, songs) => {
        for (const song of songs) {
            try {
                let response = await api.post(`/playlists/${playlist_name.replace(" ", "-")}/`, {
                    "spotify_song_id" : song.id
                },
                {
                    headers: {
                        'Authorization' : `Token ${localStorage.getItem('token')}`
                    }
                })           
            } catch (error) {
                console.error('Error Saving Playlist Song', error)
            }            
        }

        return 
    }

    export const generatePlaylist = async (playlist_name, selectedGenres, song_list, library, setUpdatedLibrary, setPlaylistGenerated, navigate, setSelectedGenres, setSelectedArtists, setArtists, setMaxSearch) => {
        try {
            setPlaylistGenerated(true)
            console.log("Creating Playlist...");
            await createPlaylist(playlist_name);
            console.log("Playlist Created!");
            setUpdatedLibrary([...library, playlist_name])
        } catch (error) {
            console.error("Issue creating Playlist", error);
            throw error
        }
    
        try {
            console.log("Saving Songs...");
            await saveSongs(selectedGenres, song_list);
            console.log("Songs Saved!");
        } catch (error) {
            console.error("Failed to save Songs", error);
        }
    
        try {
            console.log("Saving Playlist Songs...");
            await savePlaylistSongs(playlist_name, song_list);
            console.log("Playlist Songs Saved!");
            console.log("Playlist has been successfully created")
            setPlaylistGenerated(false)
            resetPlaylistGenerator(setSelectedGenres, setSelectedArtists, setArtists, setMaxSearch)
            navigate("/signin/profile")            
        } catch (error) {
            console.error("Failed to save Playlist Songs", error);
            setPlaylistGenerated(false)

        }
    };

    export const getPlaybackState = async (e) => {
        try {
            let response = await axios.get('https://api.spotify.com/v1/me/player', {
                headers : {
                    'Authorization' : `Bearer ${localStorage.getItem('Bearer')}`
                }
            })
            return response
        } catch (error) {
            console.error("Failed to get playbackState", error)   
            return null
        }
        
    }
    
    export const getCurrentPlayingTrack = async () => {
        try {
            let response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
                headers : {
                    'Authorization' : `Bearer ${localStorage.getItem('Bearer')}`
                }
            })
            return response.data.item.album.images[0].url
            
        } catch (error) {
            console.error("Failed to get current playing track", error)
            return null
        }
    }
    

    export const getRandomPlaylists = async () => {
        try {
            let response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists?limit=20', {
                headers : {
                    'Authorization' : `Bearer ${localStorage.getItem('Bearer')}`
                }
            })
            return response.data.playlists.items
        } catch (error) {
            console.error("Failed to get random playlists", error)
            return null
        }
    }
