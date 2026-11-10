
import React, { useState } from 'react';
import './styles.css'

const SearchBar = ({ onSearch }) => {
    const [artist, setArtist] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (artist.trim() === '') {
            return;
        }

        onSearch(artist.trim());
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Escribe el nombre de un artista"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
            />

            <button type="submit">
                Buscar
            </button>
        </form>
    );
};

export default SearchBar;