import { Link } from "react-router-dom";
import { useAppContext } from "../Pages/context";
import { useEffect, useState } from "react";
import { deletePlaylist } from "../utilities";

export default function Library() {
  const {library, setUpdatedLibrary, setSelectedPlaylist, playlistDelete, setPlaylistDelete } = useAppContext();

  const handleCheckboxChange = (e, playlistName) => {
    if (e.target.checked) {
      setPlaylistDelete(playlistName);
    } else {
      setPlaylistDelete("");
    }
  };


  return (
    <div className="library">
      <h5>Library</h5>
      <div className="playlistList">
        {library.map((list, index) => (
          <div className="individual-playlist" key={index}>
            <form className="button-and-playlist">
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e, list.playlist_name)}
              />
              <label
                onClick={() => setSelectedPlaylist(list.playlist_name)}
                className="listItem"
              >
                <Link to="single-playlist">
                  {list.playlist_name.replace("-", " ")}
                </Link>
              </label>
            </form>
            <button
              onClick={() => deletePlaylist(playlistDelete, library, setUpdatedLibrary)}
              style={{ marginRight: "1vw", height: "5vh" }}
              type="button"
              className="btn btn-primary"
            >
              DELETE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}