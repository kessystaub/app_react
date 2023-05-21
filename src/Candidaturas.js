import React, { useEffect, useState } from 'react';
import Menu from './Menu';

function Candidaturas() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/application');
        const data = await response.json();
        setApplications(data.result);
        console.log(applications)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once

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
              <li className="list-group-item">Tempo integral</li>
            </ul>
            <div className="card-body">
              <a href="#" className="card-link">Descrição completa</a>
              <br />
              <a href="http://127.0.0.1:5500/Search/index.html" className="card-link">Outras
                vagas</a>
            </div>
          </div>
          ))}
        </div>

        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a className="page-link" href="#" tabIndex="-1">Previous</a>
            </li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Candidaturas;