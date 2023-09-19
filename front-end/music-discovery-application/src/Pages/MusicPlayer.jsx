import React from "react";
import Player from "../components/Player.jsx";
import { useAppContext } from "./context.jsx";

export default function MusicPlayer() {

  const {currentSong} = useAppContext()
 

  return (
    <div className="music-player">
      <div>
        <h2>{currentSong.name}</h2>
      </div>
      <div>
        <img className="music-player-image" src={currentSong.image}/>
      </div>   
      <div style={{width:"80vw"}}>
       <Player /> 
      </div>
    </div>
  );
}





