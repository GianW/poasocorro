import React from "react";

function EstabDetail(props){

    const {stab} = props

    return (
        <div key={stab.nome} className='card'>
            <button onClick={props.onDesElectEstab}>X</button>
            <p><b>Nome:</b> {stab.nome}</p>
            <p><b>Endereço:</b> {stab.endereco}</p>
            <p><b>Telefone:</b> {stab.telefone}</p>
            <p><b>Tipo:</b> {stab.tipo}</p>
            <p><b>Funcionamento:</b> {stab.hr_funcionamento}</p>
            <p><b>Administração:</b> {stab.adm}</p>
            <p><b>Especialidades:</b> {stab.especialidades.toString()}</p>
        </div>

    );
  }

export default EstabDetail