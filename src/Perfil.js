import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Perfil() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [courseformation, setCourseformation] = useState('');
  const [companyname, setCompanyName] = useState('');


  const navigate = useNavigate();

  const navigateToCurriculo = () => {
    navigate('/curriculo');
  };

  function getUser() {
    fetch('http://localhost:8000/user/8')
      .then(response => response.json())
      .then(data => {
      // console.log('data: ', data);
      // console.log('result: ', data.result);
      setId(data.result.id)
      setNome(data.result.name)
      setEmail(data.result.email)
      setPassword(data.result.password)
      setPhone(data.result.phone)
      setAddress(data.result.address)
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  }

  function getFormations() {
    fetch('http://localhost:8000/formation/1')
      .then(response => response.json())
      .then(data => {
      // console.log('data: ', data);
      // console.log('result: ', data.result);
      setCourseformation(data.result.course)
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  }

  function getExperiences() {
    fetch('http://localhost:8000/experience/2')
      .then(response => response.json())
      .then(data => {
      // console.log('data: ', data);
      // console.log('result: ', data.result);
      setCompanyName(data.result.company)
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  }
  
  getUser()
  getFormations()
  getExperiences()

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
            <a className="nav-link" href="http://127.0.0.1:5500/Perfil/index.html">Perfil
              <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://127.0.0.1:5500/Search/index.html">Vagas</a>
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

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img src="https://via.placeholder.com/150" className="card-img-top"
                alt="..." />
              <div className="card-body">
                <h5 className="card-title">{nome}</h5>
                <p className="card-text">Software Developer</p>
              </div>
            </div>
            <div className="mt-5">
              <button className="btn btn-outline-success my-2 my-sm-0"
                type="button" onClick={navigateToCurriculo}>Currículo</button>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Informações pessoais</h5>
                <table className="table">
                  <tbody>
                    <tr>
                      <th scope="row">
                        <label htmlFor="form">Nome</label>
                      </th>
                      <td>
                        <input type="text" className="form-control" id="form"
                          placeholder={nome} disabled />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label htmlFor="form">Email</label>
                      </th>
                      <td>
                        <input type="text" className="form-control" id="form"
                          placeholder={email} disabled />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label htmlFor="form">Telefone</label>
                      </th>
                      <td>
                        <input type="text" className="form-control" id="form"
                          placeholder={phone} disabled />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label htmlFor="form">Endereço</label>
                      </th>
                      <td>
                        <input type="text" className="form-control" id="form"
                          placeholder={address} disabled />
                      </td>
                    </tr>

                  </tbody>
                </table>
                <button className="btn btn-outline-success my-2 my-sm-0"
                  type="button">Editar</button>
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title">Sobre</h5>
                <table className="table">
                  <tbody>
                    <tr>
                      <th scope="row">
                        <label htmlFor="form">Formação</label>
                      </th>
                      <td>
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{courseformation}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Card
                              subtitle</h6>
                            <p className="card-text">Some quick example text to build
                              on the card title and make up the bulk of the card's
                              content.</p>
                            <div className="row">
                              <div className="m-1">
                                <button className="btn btn-outline-success my-2
                                  my-sm-0"
                                  type="button">Editar</button>
                              </div>
                              <div className="m-1">
                                <button className="btn btn-outline-success my-2
                                  my-sm-0"
                                  type="button">Excluir</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label htmlFor="exp">Experiência</label>
                      </th>
                      <td>
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{companyname}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Card
                              subtitle</h6>
                            <p className="card-text">Some quick example text to build
                              on the card title and make up the bulk of the card's
                              content.</p>
                            <div className="row">
                              <div className="m-1">
                                <button className="btn btn-outline-success my-2
                                  my-sm-0"
                                  type="button">Editar</button>
                              </div>
                              <div className="m-1">
                                <button className="btn btn-outline-success my-2
                                  my-sm-0"
                                  type="button">Excluir</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;