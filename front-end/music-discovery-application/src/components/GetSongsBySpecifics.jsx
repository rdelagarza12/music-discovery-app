import { useAppContext } from "../Pages/context"


export default function GetSongsBySpecifics () {

    const {acoustic, setAcoustic, instrumental, setInstrumental, speechiness, setSpeechiness, danceability, setDanceability, tempo, setTempo,
    duration, setDuration, energy, setEnergy, popularity, setPopularity} = useAppContext()
        
    return (
        <div>
            <h4>Fine tune your search</h4>
            <div >
                <form className="song-form">
                    <div className="column-song-form">
                        <label htmlFor="customRange1" className="form-label">{`Acousticness ${acoustic}`}</label>
                            <input onChange={(e) => setAcoustic(e.target.value)} min="0.00" max="1.00" type="range" step="0.01" className="form-range" id="customRange1"/>
                        <label htmlFor="customRange1" className="form-label">{`Instrumentalness ${instrumental}`}</label>
                            <input onChange={(e) => setInstrumental(e.target.value)} min="0.00" max="1.00" step="0.01" type="range" className="form-range" id="customRange1"/>
                        <label htmlFor="customRange1" className="form-label">{`Speechiness ${speechiness}`}</label>
                            <input onChange={(e) => setSpeechiness(e.target.value)} min="0.00" max="1.00" step="0.01" type="range" className="form-range" id="customRange1"/>
                        <label htmlFor="customRange1" className="form-label">{`Danceability ${danceability}`}</label>
                            <input onChange={(e) => setDanceability(e.target.value)} min="0.00" max="1.00" step="0.01" type="range" className="form-range" id="customRange1"/>  
                    </div>

                    <div className="column-song-form" >
                        <label htmlFor="customRange1" className="form-label">{`Tempo BPM${tempo}`}</label>
                            <input onChange={(e) => setTempo(e.target.value)}type="range" min="20.00" max="1000.00" step="1.00" className="form-range" id="customRange1"/>
                        <label htmlFor="customRange1" className="form-label">{`Track Duration in ms ${duration}`}</label>
                            <input onChange={(e) => setDuration(e.target.value)} min="00000" max="1000000" type="range" className="form-range" id="customRange1"/>
                        <label htmlFor="customRange1" className="form-label">{`Energy ${energy}`}</label>
                            <input onChange={(e) => setEnergy(e.target.value)} min="0.00" max="1.00" step="0.01" type="range" className="form-range" id="customRange1"/>
                        <label htmlFor="customRange1" className="form-label">{`Popularity ${popularity}`}</label>
                            <input onChange={(e) => setPopularity(e.target.value)} min="0" max="100" step="1"type="range" className="form-range" id="customRange1"/>
                    </div>
                </form>   
            </div>

        </div>
    )
}