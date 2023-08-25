import { useEffect } from "react";
import { getGenre } from "../utilities";
import {useAppContext} from "../Pages/context";


export default function GenreGenerator() {
    const { allGenres, setAllGenres, searchGenre, setSearchGenre, selectedGenres, setSelectedGenres, maxSearch, setMaxSearch} = useAppContext()
    
        // handles clicking of genres 
    const handleGenreClick = (genre) => {
        if (selectedGenres.includes(genre) && (maxSearch > 0 && maxSearch <= 2)) {
            // this updates useState of selectedgenres to remove them
            setSelectedGenres(selectedGenres.filter(selectedGenre => selectedGenre !== genre));
            setSearchGenre(searchGenre.filter(search_item => search_item !== genre))
            setMaxSearch(maxSearch - 1)   
            
        } else {
            if (maxSearch < 2) {
                setMaxSearch(maxSearch + 1)
                setSelectedGenres([...selectedGenres, genre]);
                setSearchGenre([...searchGenre, genre])   
            }
            

            
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

    useEffect(() => {
        console.log(selectedGenres)
    }, [selectedGenres])

    return (
            <form>
                <h4 style={{ textAlign: "center" }}>Select Two Genres {maxSearch}/5</h4>
                <div className="all-genres">
                    {allGenres.map((genre, index) => (
                        <div
                            className={`genre ${selectedGenres.includes(genre) ? "selected-genre" : ""}`}
                            key={index}
                            onClick={() => handleGenreClick(genre)}
                        >
                            {genre.toUpperCase()}
                        </div>
                    ))}
                </div>
            </form>
    );
}