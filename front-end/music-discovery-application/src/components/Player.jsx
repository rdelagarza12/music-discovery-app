import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useAppContext } from "../Pages/context";

export default function Player() {
  const { selectedPlaylistSongs, setCurrentSong } = useAppContext();
  const [isPlayerLoading, setPlayerLoading] = useState(true);

  const handleCurrentSong = async (state) => {
    if (state?.track?.uri) {
      setCurrentSong({ name: state.track.name, image: state.track.image });
    }
  };

  const uris = selectedPlaylistSongs
    ? selectedPlaylistSongs.map((song) => song.actual_song.uri)
    : [];

  useEffect(() => {
    if (uris.length > 0) {
      setPlayerLoading(false);
    }
  }, [uris]);
  console.log(uris)

  if (!localStorage.getItem("Bearer") || isPlayerLoading) {
    return <p>Loading Player...</p>;
  }
  return (
    <SpotifyPlayer
      token={localStorage.getItem("Bearer")}
      uris={uris}
      play={true}
      magnifySliderOnHover={true}
      callback={handleCurrentSong}
    />
  );
}