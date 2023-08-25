import { Link } from "react-router-dom";
import { useAppContext } from "../Pages/context";
import { resetPlaylistGenerator, getRandomPlaylists } from "../utilities";
import { useEffect, useState } from "react";

export default function ProfileMain() {
  const { setSelectedGenres, setSelectedArtists, isTokenAvailable, setIsTokenAvailable, setCurrentSong, setSelectedPlaylistSongs } = useAppContext();
  const [randomPlaylists, setRandomPlaylists] = useState([]);

//   const handleOnClick = (playlist) => {
//     const selectedSongs = playlist.uri;
//     console.log(playlist)
//     setSelectedPlaylistSongs([selectedSongs]);
//     setCurrentSong({ name: playlist.name, image: playlist.images[0].url });
//   };

  useEffect(() => {
    const fetchRandomPlaylists = async () => {

      const token = localStorage.getItem("Bearer");
      if (token) {
        setIsTokenAvailable(true);

        try {
          const playlists = await getRandomPlaylists(token);
          setRandomPlaylists(playlists);
          console.log(playlists)
        } catch (error) {
          console.error("Failed to fetch random playlists", error);
        }
      }
    };

    fetchRandomPlaylists();
  }, [isTokenAvailable]);

  return (
    <div className="playlist">
      <h1>Welcome!</h1>
      <div className="playlist-buttons">
        <div className="profile-buttons">
          <Link to="playlist-generator">
            <button
              type="button"
              onClick={(e) =>
                resetPlaylistGenerator(setSelectedGenres, setSelectedArtists)
              }
              className="btn btn-primary"
            >
              CREATE NEW PLAYLIST
            </button>
          </Link>
          <button type="button" className="btn btn-primary">
            GENERATE RANDOM PLAYLIST
          </button>
        </div>

        <div className="random-playlists">
          {randomPlaylists.length > 0 ? (
            randomPlaylists.map((playlist) => (
            //   <Link key={playlist.uri} to="/signin/profile/musicplayer">
                <div onClick={() => handleOnClick(playlist)}>
                  <img
                    className="random-playlist-image"
                    src={playlist.images[0].url}
                    alt="Playlist Cover"
                  />
                </div>
            //   </Link>
            ))
          ) : (
            <p>{isTokenAvailable ? "No playlists found" : "LOADING..."}</p>
          )}
        </div>
      </div>
    </div>
  );
}