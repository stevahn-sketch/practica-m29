import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './styles.css'

function SongDetails() {
    const {id} = useParams();

    const albumUrl = `https://www.theaudiodb.com/api/v1/json/123/album.php?m=${id}`;
    const {
        data: albumData,
        loading: albumLoading,
        error: albumError,
        refetch: retryAlbum
    } = useFetch(albumUrl);

    const tracksUrl = `https://www.theaudiodb.com/api/v1/json/123/track.php?m=${id}`;
    const {
        data: tracksData,
        loading: tracksLoading,
        error: tracksError,
        refetch: retryTracks
    } = useFetch(tracksUrl);

    const album = albumData?.album?.[0];
    const tracks = tracksData?.track || [];

    if (albumLoading || tracksLoading) {
        return <p>Cargando detalles del album y sus canciones...{albumLoading}</p>
    }

    if (albumError) {
        return (
            <div>
                <p>Error al consultar el album: {albumError}</p>

                <button onClick={retryAlbum}>
                    Reintentar consulta de album
                </button>
            </div>
        )
    }

    if (!album) {
        return <p>No se encontro informacion del album.</p>;
    }

    return (
        <main className="song-details">

            <header className="song-details-header">
                <h2>Detalles del álbum</h2>
                <h3>{album.strAlbum}</h3>
                <p>{album.strArtist}</p>
            </header>

            <section className="album-info">
                <p>
                    <strong>Año:</strong>{' '}
                    {album.intYearReleased || 'No disponible'}
                </p>

                <p>
                    <strong>Género:</strong>{' '}
                    {album.strGenre || 'No disponible'}
                </p>

                <p>
                    <strong>Descripción:</strong>{' '}
                    {album.strDescriptionEN || 'No hay descripción disponible.'}
                </p>
            </section>

            <section className="tracks-section">
                <h3>Canciones del álbum</h3>

                {tracksError ? (
                    <div>
                        <p>No fue posible cargar las canciones: {tracksError}</p>

                        <button onClick={retryTracks}>
                            Reintentar consulta de canciones
                        </button>
                    </div>
                ) : tracks.length === 0 ? (
                    <p>No se encontraron canciones para este álbum.</p>
                ) : (
                    <ol className="tracks-list">
                        {tracks.map((track) => {
                            const duration = Number(track.intDuration);

                            const durationText =
                                Number.isFinite(duration) && duration > 0
                                    ? `${Math.floor(duration / 60000)}:${String(
                                        Math.floor((duration % 60000) / 1000)
                                    ).padStart(2, '0')}`
                                    : 'No disponible';

                            return (
                                <li key={track.idTrack}>
                                    <strong>{track.strTrack}</strong>
                                    <span className="track-duration">
                                        {' '} — Duración: {durationText}
                                        {' '} — Pista: {track.intTrackNumber || 'No disponible'}
                                    </span>
                                </li>
                            );
                        })}
                    </ol>
                )}
            </section>

        </main>
    );
}

export default SongDetails;