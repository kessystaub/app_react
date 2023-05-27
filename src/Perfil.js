import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Menu from './Menu';

function Perfil() {
  const [id, setId] = useState('');
  const [user, setUser] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [formations, setFormations] = useState([]);
  const [softskills, setSoftskills] = useState([]);
  const [hardskills, setHardskills] = useState([])
  const [nome, setNome] = useState('');
  const [formNome, setFormNome] = useState('');
  const [email, setEmail] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [disabled, setDisabled] = useState(true)
  const [mostraBotao, setMostraBotao] = useState(false)

  const navigate = useNavigate();

  const navigateToCurriculo = () => {
    navigate('/curriculo');
  };

  function updateUser() {
    setDisabled(true)

    if (formNome === ''){
      setFormNome(nome)
    }

    const update = {
      "parameter": {
        "phone": formPhone,
        "name": formNome,
        "email": formEmail,
        "address": formAddress
      }
    }
  
    console.log(update)

    const options = {
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
      };
  
    fetch(`http://localhost:8000/user/${id}`, options)
    .then(data => {
      if (!data.ok) {
        throw Error(data.status);
        }
        return data.json();
      }).then(update => {
      console.log(update);
      }).catch(e => {
      console.log(e);
      });
  }

  useEffect(() => {
    const storedValue = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : [];
    const user = storedValue.user;
    const formationslist = storedValue.formations;
    const experienceslist = storedValue.experiences;
    const softskillslist = storedValue.softskills;
    const hardskillslist = storedValue.hardskills;
    setUser(user)
    setFormations(formationslist)
    setExperiences(experienceslist)
    setSoftskills(softskillslist)
    setHardskills(hardskillslist)
  }, [setUser, setFormations, setExperiences]);

  return (
    <div>
      <Menu/>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img src="https://via.placeholder.com/150" className="card-img-top"
                alt="..." />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
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
                          placeholder={user.name} onChange={(event) => setFormNome(event.target.value)} disabled={disabled} />
                      </td>
                      <td>
                      <button className="btn my-2 my-sm-0"
                        type="button" onClick={() => {
                          setMostraBotao(true)
                          setDisabled(false)
                        }}>Editar</button>
                      </td>
                      <td>
                        {mostraBotao && (
                          <button className="btn my-2 my-sm-0"
                          type="button" onClick={() => {
                            setMostraBotao(false)
                            setDisabled(true)
                          }}>Salvar</button>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label htmlFor="form">Email</label>
                      </th>
                      <td>
                        <input type="text" className="form-control" id="form"
                          placeholder={user.email} onChange={(event) => setFormEmail(event.target.value)} disabled={disabled} />
                      </td>
                      <td>
                      <button className="btn my-2 my-sm-0"
                        type="button" onClick={() => {
                          setMostraBotao(true)
                          setDisabled(false)
                        }}>Editar</button>
                      </td>
                      <td>
                        {mostraBotao && (
                          <button className="btn my-2 my-sm-0"
                          type="button" onClick={() => {
                            setMostraBotao(false)
                            setDisabled(true)
                          }}>Salvar</button>
                        )}
                      </td>
                      
                    </tr>
                    <tr>
                      <th scope="row">
                        <label htmlFor="form">Telefone</label>
                      </th>
                      <td>
                        <input type="text" className="form-control" id="form"
                          placeholder={user.phone} onChange={(event) => setFormPhone(event.target.value)} disabled={disabled} />
                      </td>
                      <td>
                      <button className="btn my-2 my-sm-0"
                        type="button" onClick={() => {
                          setMostraBotao(true)
                          setDisabled(false)
                        }}>Editar</button>
                      </td>
                      <td>
                        {mostraBotao && (
                          <button className="btn my-2 my-sm-0"
                          type="button" onClick={() => {
                            setMostraBotao(false)
                            setDisabled(true)
                          }}>Salvar</button>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label htmlFor="form">Endereço</label>
                      </th>
                      <td>
                        <input type="text" className="form-control" id="form" onChange={(event) => setFormAddress(event.target.value)}
                          placeholder={user.address} disabled={disabled} />
                      </td>
                      <td>
                      <button className="btn my-2 my-sm-0"
                        type="button" onClick={() => {
                          setMostraBotao(true)
                          setDisabled(false)
                        }}>Editar</button>
                      </td>
                      <td>
                        {mostraBotao && (
                          <button className="btn my-2 my-sm-0"
                          type="button" onClick={() => {
                            setMostraBotao(false)
                            setDisabled(true)
                          }}>Salvar</button>
                        )}
                      </td>
                    </tr>

                  </tbody>
                </table>
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
                        <button className="btn btn-outline-secondary btn-sm m-2">
                                adicionar
                        </button>
                        {formations.map((item) => (
                          <div key={item.id} className="card">
                            <div className="card-body">
                              <h5 className="card-title">{item.course}</h5>
                              <h6 className="card-subtitle mb-2 text-muted">{item.date}</h6>
                              <p className="card-text">{item.institution_id}</p>
                              <button className="btn btn-outline-secondary btn-sm m-2">
                                excluir
                              </button>
                              <button className="btn btn-outline-secondary btn-sm m-2">
                                editar
                              </button>
                            </div>
                          </div>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label htmlFor="exp">Experiência</label>
                      </th>
                      <td>
                        <button className="btn btn-outline-secondary btn-sm m-2">
                                adicionar
                        </button>
                        {experiences.map((item) => (
                          <div key={item.id} className="card">
                            <div className="card-body">
                              <h5 className="card-title">{item.company}</h5>
                              <h6 className="card-subtitle mb-2 text-muted">{item.date}</h6>
                              <p className="card-text">{item.position_id}</p>
                              <button className="btn btn-outline-secondary btn-sm m-2">
                                excluir
                              </button>
                              <button className="btn btn-outline-secondary btn-sm m-2">
                                editar
                              </button>
                            </div>
                          </div>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label htmlFor="exp">Habilidades interpessoais</label>
                      </th>
                      <td>
                        <button className="btn btn-outline-secondary btn-sm m-2">
                                adicionar
                        </button>
                        {softskills.map((item) => (
                          <div key={item.id} className="card">
                            <div className="card-body">
                              <h5 className="card-title">{item.name}</h5>
                              <button className="btn btn-outline-secondary btn-sm m-2">
                                excluir
                              </button>
                              <button className="btn btn-outline-secondary btn-sm m-2">
                                editar
                              </button>
                            </div>
                          </div>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label htmlFor="exp">Habilidades técnicas</label>
                      </th>
                      <td>
                        <button className="btn btn-outline-secondary btn-sm m-2">
                                adicionar
                        </button>
                        
                        {hardskills.map((item) => (
                          <div key={item.id} className="card">
                            <div className="card-body">
                              <h5 className="card-title">{item.name}</h5>
                              <button className="btn btn-outline-secondary btn-sm m-2">
                                excluir
                              </button>
                              <button className="btn btn-outline-secondary btn-sm m-2">
                                editar
                              </button>
                            </div>
                          </div>
                        ))}
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