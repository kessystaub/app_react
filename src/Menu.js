import React from 'react';
import {useNavigate} from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();

  const navigateToVaga = () => {
    navigate('/search');
  };

  const navigateToPerfil = () => {
    navigate('/perfil');
  };

  const navigateToCandidaturas = () => {
    navigate('/candidaturas');
  };

  const exit = () => {
    localStorage.clear()
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <h4 className='m-2 text-secondary'>Match Code</h4>
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
                <button className="btn text-secondary" onClick={navigateToVaga}><strong>Vagas</strong></button>
              </li>
            </div>
            <div className='m-1'>
              <li className="nav-item">
                <button className="btn text-secondary my-2 my-sm-0" onClick={navigateToCandidaturas} type="button"><strong>Candidaturas</strong></button>
              </li>
            </div>
            <div className='m-1'>
              <li className="nav-item">
                <button className="btn text-secondary my-2 my-sm-0" onClick={exit} type="button">Sair</button>
              </li>
            </div>
          </ul>
        </div>
      </div>
      </nav>
    </div>
  );
}

export default Menu;