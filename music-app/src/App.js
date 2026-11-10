
import './App.css';
import React, { useEffect, useState } from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import Header from './components/Header/Header';
import './components/Header/styles.css';
import SearchResults from './components/SearchResults/SearchResults';
import './components/SearchResults/styles.css';
import SongDetails from './components/SongDetails/SongDetails';

import Library from './components/Library/Library';
import './components/Library/styles.css';
import SearchBar from './components/SearchBar/SearchBar';
import useFetch from './hooks/useFetch';

function AppContent() {
    const [library, setLibrary] = useState([]);
    const [searchedArtist, setSearchedArtist] = useState('');
    const apiUrl = searchedArtist ? `https://www.theaudiodb.com/api/v1/json/123/searchalbum.php?s=${encodeURIComponent(searchedArtist)}`:null;
    const {data, loading, error, refetch} = useFetch(apiUrl);
    const albums = data?.album || [];

    useEffect(() => {
        console.log('La app se ha cargado correctamente.');
    }, []);

    useEffect(() => {
        console.log('La biblioteca ha sido actualizada');
    }, [library]);

    const addToLibrary = (song) => {
        setLibrary((prevLibrary) => {
            const alreadyExists = prevLibrary.some(
                (item) => item.id === song.id
            );

            if (alreadyExists) {
                return prevLibrary;
            }

            return [...prevLibrary, song];
        });
    };

    return (
        <div className="App">
            <Header />

            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <SearchBar onSearch={setSearchedArtist} />

                            <SearchResults
                                albums={albums}
                                loading={loading}
                                error={error}
                                addToLibrary={addToLibrary}
                                retryFetch={refetch}
                            />
                        </>
                    }
                />

                <Route
                    path="/song/:id"
                    element={<SongDetails />}
                />

                <Route
                    path="/library"
                    element={<Library songs={library} />}
                />

            </Routes>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
