import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const SearchResults = ({
    albums,
    loading,
    error,
    addToLibrary,
    retryFetch
}) => {
    if(loading) {
        return <p>Cargando...</p>;
    }

    if(error) {
        return (
            <div>
                <p>Ocurrio un error: {error}</p>
                <p>Intenta realizar la busqueda nuevamente.</p>
                <button onClick={retryFetch}>
                    Reintentar busqueda
                </button>
            </div>
        );
    }

    if(!albums && albums.length === 0) {
        return <p>No se encontraron albumes.</p>
    }

    return (
        <Fragment>
            <h2 className="results">
                Resultados de la busqueda
            </h2>

            <section>
                {albums.map((album) =>{
                    const song = {
                        id: album.idAlbum,
                        titulo: album.strAlbum,
                        artista: album.strArtist,
                        duracion: 'No disponible'
                    };

                    return (
                        <article key={album.idAlbum}>
                            <h2>{album.strAlbum}</h2>

                            <p>Artista: {album.strArtist}</p>

                            <p>Año: {album.intYearReleased || 'No disponible'}</p>

                            <button
                                onClick={() => addToLibrary(song)}
                            >
                                Agregar a la biblioteca
                            </button>

                            <Link className='detalles' to={`/song/${album.idAlbum}`}>
                                Ver detalles
                            </Link>

                        </article>
                    );
                })}
            </section>
        </Fragment>
    );
};

export default SearchResults;