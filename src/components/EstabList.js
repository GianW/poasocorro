import React from "react";

function EstabList(props){

    const {stabs} = props

    let imgDefault = "https://material-ui.com/static/images/grid/complex.jpg";

    return (
        stabs && stabs.map(stab =>
            <div key={stab.nome} className="card">
                <div className="cardContent">
                    <div className="cardImage">
                        <img src={stab.imagem ? stab.imagem : imgDefault} alt="teste" />
                    </div>
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