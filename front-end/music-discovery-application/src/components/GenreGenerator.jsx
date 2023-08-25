import { useEffect, useContext, useState } from "react";
import { getGenre } from "../utilities";
import appContext from "../Pages/context";


export default function GenreGenerator() {
    const { allGenres, setAllGenres, search, setSearch } = useContext(appContext);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const handleGenreClick = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(selectedGenre => selectedGenre !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    useEffect(() => {
        getGenre()
            .then((availableGenres) => {
                setAllGenres(availableGenres);
            })
            .catch((error) => {
                console.error("Error fetching genres:", error);
            });
    }, [setAllGenres]);

    return (
        <div>
            <form>
                <h2 style={{ textAlign: "center" }}>Select A Genre</h2>
                <div className="all-genres">
                    {allGenres.map((genre, index) => (
                        <div
                            className={`genre ${selectedGenres.includes(genre) ? "selected-genre" : ""}`}
                            key={index}
                            onClick={() => handleGenreClick(genre)}
                        >
                            {genre}
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
}