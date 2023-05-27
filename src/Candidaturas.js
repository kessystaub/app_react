import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import { useNavigate } from 'react-router-dom';

function Candidaturas() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);

  function navigateToVaga(vaga_id) {
    localStorage.setItem("vaga_id", vaga_id)
    navigate(`/vaga`);
  };

  const navigateToVagas = () => {
    navigate('/search');
  };

  useEffect(() => {
    const storedValue = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : [];
    console.log(storedValue)
    setApplications(storedValue.applications)
  }, [setApplications]);

  return (
    <div>
      <Menu/>

        <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <img src="logo.png" alt="Logo" />
            <h4 className="text-center text-secondary mb-4">Candidaturas</h4>
          </div>
        </div>

        <div className="form-inline justify-content-center">

        {applications.map((item) => (
          <div className="card m-3" key={item.id}>
            <div className="card-body">
              <div className="form-inline">
                <h5 className="card-title">Pessoa Desenvolvedora Full Stack</h5>
              </div>
              <p className="card-text">Situação: {item.status_id}</p>
              <div className="progress">
                <div className="progress-bar progress-bar-striped
                  progress-bar-animated" role="progressbar" aria-valuenow="75"
                  aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">São Paulo, São Paulo, Brasil Remoto
              </li>
              <li className="list-group-item">Data da candidatura: {item.date}</li>
            </ul>
            <div className="card-body">
              <button className="btn btn-outline-success my-2 my-sm-0 m-3" onClick={() => navigateToVaga(item.joboffer_id)}>Descrição completa</button>
              <button className="btn btn-outline-success my-2 my-sm-0 m-3" onClick={navigateToVagas}>Outras
                vagas</button>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Candidaturas;