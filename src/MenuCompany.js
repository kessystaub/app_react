import React from 'react';
import {useNavigate} from 'react-router-dom';

function MenuCompany() {
  const navigate = useNavigate();

  const navigateToCadastroVaga = () => {
    navigate('/cadastrovaga');
  };

  const navigateToVagas = () => {
    navigate('/vagas')
  };

  const navigateToPerfil = () => {
    navigate('/perfilempresa');
  };

  const navigateToCandidatos = () => {
    navigate('/talentos');
  };

  const exit = () => {
    localStorage.clear()
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <h4 className='text-secondary m-2'>Match Code</h4>
      <div className='pl-2'>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <div className='m-1'>
              <li className="nav-item active">
                <button className="btn text-secondary" onClick={navigateToPerfil}><strong>Perfil</strong></button>
              </li>
            </div>
            <div className='m-1'>
              <li className="nav-item">
                <button className="btn text-secondary" onClick={navigateToCadastroVaga}><strong>Cadastrar vaga</strong></button>
              </li>
            </div>
            <div className='m-1'>
              <li className="nav-item">
                <button className="btn text-secondary" onClick={navigateToVagas}><strong>Suas vagas</strong></button>
              </li>
            </div>
          </ul>
          <div className='m-1'>
            <button className="btn text-secondary my-2 my-sm-0" onClick={navigateToCandidatos} type="button"><strong>Candidatos</strong></button>
          </div>
          <div className='m-1'>
            <button className="btn text-secondary my-2 my-sm-0" onClick={exit} type="button">Sair</button>
          </div>
        </div>
      </div>
      </nav>
    </div>
  );
}

export default MenuCompany;