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

  const navigateToLogin = () => {
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <h4 className='m-2'>Match Code</h4>
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
                <button className="btn" onClick={navigateToPerfil}>Perfil</button>
              </li>
            </div>
            <div className='m-1'>
              <li className="nav-item">
                <button className="btn" onClick={navigateToVaga}>Vagas</button>
              </li>
            </div>
          </ul>
          <div className='m-1'>
            <button className="btn my-2 my-sm-0" onClick={navigateToCandidaturas} type="button">Candidaturas</button>
          </div>
          <div className='m-1'>
            <button className="btn my-2 my-sm-0" onClick={navigateToLogin} type="button">Sou Empresa</button>
          </div>
        </div>
      </div>
      </nav>
    </div>
  );
}

export default Menu;