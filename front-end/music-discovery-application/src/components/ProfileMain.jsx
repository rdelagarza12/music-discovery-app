import { Link } from "react-router-dom"

export default function ProfileMain () {

    return (
       <div className="playlist" >
            <h1>This is my Profile Page</h1>
            <div className="playlist-buttons">
                <Link to="playlist-generator"><button type="button" className="btn btn-primary">CREATE NEW PLAYLIST</button></Link>
                <button type="button" className="btn btn-primary">GENERATE NEW PLAYLIST</button>
                
            </div>
        </div> 
    )
}
    