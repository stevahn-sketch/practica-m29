import React, { Fragment, useEffect } from "react";

const Library = ({ songs }) => {

    return (
        <Fragment>
            <h2>Mi biblioteca</h2>

            {songs.length === 0 ? (
                <p>Aún no has agregado canciones a tu biblioteca.</p>
                ) : (
                <section>
                    {songs.map((song) => {
                        const { id, titulo, artista, duracion } = song;

                        return (
                            <article key={id}>
                                <h3>{titulo}</h3>
                                <p>Artista: {artista}</p>
                                <p>Duración: {duracion}</p>
                            </article>
                        );
                    })}
                </section>
            )}
        </Fragment>
    );
};

export default Library;