import React from 'react';
import {useNavigate} from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();

  const navigateToVaga = () => {
    navigate('/vaga');
  };

  const navigateToPerfil = () => {
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Match Code</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <button className="btn btn-outline-primary" onClick={navigateToPerfil}>Perfil</button>
          </li>
          <li className="nav-item">
            <button className="btn btn-outline-primary" onClick={navigateToVaga}>Vagas</button>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
              role="button" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              Configurações
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
        <button className="btn btn-outline-success my-2 my-sm-0" type="button">Candidaturas</button>
      </div>
      </nav>
    </div>
  );
}

export default Menu;