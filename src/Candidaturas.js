import React from 'react';
import Menu from './Menu';

function Candidaturas() {
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
          <div className="card m-3">
            <div className="card-body">
              <div className="form-inline">
                <h5 className="card-title">Pessoa Desenvolvedora Full Stack</h5>
              </div>
              <p className="card-text">Situação: em progresso</p>
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

          <div className="card m-3">
            <div className="card-body">
              <h5 className="card-title">Desenvolvedor Back-End - REMOTE</h5>
              <p className="card-text">Situação: em progresso.</p>
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

          <div className="card m-3">
            <div className="card-body">
              <h5 className="card-title">Analista desenvolvedor PYTHON</h5>
              <p className="card-text">Situação: recusado</p>
              <div className="progress">
                <div className="progress-bar progress-bar-striped bg-danger"
                  role="progressbar" aria-valuenow="100"
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
              <a href="#" className="card-link">Outras vagas</a>
            </div>
          </div>
        </div>

        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a className="page-link" href="#" tabindex="-1">Previous</a>
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