import React from "react";

function EstabList(props){

    const {stabs} = props

    return (
        stabs && stabs.map(stab =>
            <div key={stab.nome} className={stab.mouseHover ? stab.mouseHover : 'card' }
                 onClick={(event) => props.onselectEstab(stab.nome)} >
                <div className="cardContent">
                    <div className="cardText">
                        <h4>{stab.nome}</h4>
                        <p>{stab.endereco}</p>
                        <p>{stab.telefone}</p>
                    </div>
                </div>

            </div>
        )
    );

  }

export default EstabList