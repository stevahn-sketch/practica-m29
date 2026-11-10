import React from "react";

const Song = ({className, titulo, artista, duracion}) => {
    return(
        <div className={className}>
            <h2>{titulo}</h2>
            <p>Artista: {artista}</p>
            <p>Duración: {duracion}</p>
        </div>        
    )
}

export default Song;