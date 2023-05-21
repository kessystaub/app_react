import React, { useState } from 'react';
import Menu from './Menu';

function Vaga() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  function getjobOffers() {
    fetch('http://localhost:8000/joboffer/1')
      .then(response => response.json())
      .then(data => {
      // console.log('data: ', data);
      // console.log('result: ', data.result);
      setNome(data.result.name)
      setEmail(data.result.email)
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  }

  getjobOffers()

  return (
    <div>
      <Menu/>

      <div className="card text-center">
        <div className="card-header">
          Vaga
        </div>
        <div className="card-body">
          <h5 className="card-title">{nome}</h5>
          <p>
              Empresa: WK Technology 
          </p>
          <p>
              Local:  Florianópolis, Santa Catarina, Brasil Remoto
          </p>
          <p className="card-text">Missão do cargo:
            Atuar no desenvolvimento de acordo com a necessidade da Empresa.
            
            Requisitos e qualificações
            
            Para o bom desempenho do seu trabalho é importante que você tenha:
            Experiência avançado em desenvolvimento Python;
            Experiência avançada em banco de dados.
            Experiência com ERP, Cloud;
            
            Será um diferencial ter:
            Conhecimento em outras linguagens de programação </p>
        <button type="button" className="btn btn-outline-primary">Voltar</button>
        <button href="#" className="btn btn-primary">Aplicar</button>
        </div>
        <div className="card-footer text-muted">
          há 2 dias
        </div>
      </div>
    </div>
  );
}

export default Vaga;