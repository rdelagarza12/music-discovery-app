import { useEffect, useCallback } from "react";
import { useAppContext } from "../Pages/context";
import { getArtistsFromGenres } from "../utilities";

export default function GetArtistByGenre() {
  const {
    artists,
    setArtists,
    setArtistsNames,
    searchGenre,
    selectedArtists,
    setSelectedArtists,
    maxSearch,
    setMaxSearch
  } = useAppContext();

  const handleOnClickArtists = useCallback(
    (artist) => {
      if (selectedArtists.includes(artist) && (maxSearch > 2)) {
        setSelectedArtists((prevSelectedArtists) =>
          prevSelectedArtists.filter(
            (artists_to_stay) => artists_to_stay !== artist
          )
        );
        setMaxSearch(maxSearch - 1) 
      } else {
        if (maxSearch < 5 && maxSearch >= 2) {
          setSelectedArtists((prevSelectedArtists) => [
            ...prevSelectedArtists,
            artist,
          ]);
          setMaxSearch(maxSearch + 1)          
        }

      }
    },
    [selectedArtists]
  );

  //GET ALL ARTISTS FROM GENRES
  useEffect(() => {
    const all_artists = async () => {
        try {
            const artist_data = await getArtistsFromGenres(searchGenre);
            const all_artist = [];
            for (const array of artist_data) {
                for (const array1 of array) {
                    all_artist.push(array1);
                }
            }
            const uniqueArtistNames = Array.from(new Set(all_artist.map(artist => artist.name)));
            const updatedArtists = uniqueArtistNames.map(name => {
                const correspondingArtist = all_artist.find(artist => artist.name === name);
                return { name: name, id: correspondingArtist.id };
            });

            if (artists.length === 0) {
                setArtists(prevArtists => [...prevArtists, ...updatedArtists]);
                const names = updatedArtists.map(name => name.name);
                setArtistsNames(names);
            }
        } catch (error) {
            console.error("Failed To Grab Artist", error);
        }
    };

    all_artists();
}, [searchGenre, setArtists, artists]);

  useEffect(() => {
    console.log(selectedArtists)
  }, [selectedArtists])

// | ---------------------------- MY RETURN

  return (
    <>
      <h4 style={{ textAlign: "center" }}>Select Three Artists {maxSearch}/5</h4>
      <div className="all-artists">
        {artists.map((artist) => (
          <div className={`artist ${selectedArtists.includes(artist) ? "selected-artist" : ""}`} onClick={() => handleOnClickArtists(artist)} key={`${artist.name}-${artist.id}`}>
            {artist.name}
          </div>
        ))}
      </div>
    </>
  );
}
