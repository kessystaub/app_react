import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Menu from './Menu';
import axios from 'axios';

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
  const [nomeIns, setNomeIns] = useState('')
  const [nomePos, setNomePos] = useState('')
  const [showAddFormation, setShowAddFormation] = useState(false)
  const [institution, setInstitution] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [institutions, setInstitutions] = useState([]);
  const [curso, setCurso] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [formationId, setFormationId] = useState(0);
  const [relations, setRelations] = useState([{ Formation: { course: '' } , Institution: {name: ''}}]);
  const [formationslist, setFormationsList] = useState([]);
  const [experienceslist, setExperiencesList] = useState([]);


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

  function addFormation() {
    let institution_id = institution
  
    const create = {
      "parameter": {
        "course": curso,
        "date": periodo,
        "institution_id": institution_id
      }
      }
  
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(create),
      };
  
    fetch(`http://localhost:8000/formation`, options)
    .then(data => {
      if (!data.ok) {
        throw Error(data.status);
        }
        return data.json();
      }).then(create => {
        console.log('create.result.id',create.result.id)
        addUserFormation(create.result.id)
      }).catch(e => {
      console.log(e);
      });
  
      
  }

  function addUserFormation(formation_id) {
    const relation = {
      "parameter": {
          "user_id": user.id,
          "formation_id": formation_id
        }
      };

      console.log(relation)
  
    const options2 = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(relation),
      };
  
    fetch(`http://localhost:8000/user_formation`, options2)
    .then(data => {
      if (!data.ok) {
        throw Error(data.status);
        }
        return data.json();
      }).then(create => {
      console.log('create.result', create.result);
      }).catch(e => {
      console.log(e);
      });
  }
  

  async function deleteFormation(formation_id) {
		axios.delete(`http://localhost:8000/user_formation/deleteByUser/${user.id}/${formation_id}`)
		.then(response => {
			console.log(response);
		})
		.catch(error => {
			console.error(error);
		});

		axios.delete(`http://localhost:8000/formation/${formation_id}`)
		.then(response => {
			console.log(response);
		})
		.catch(error => {
			console.error(error);
		});
	};

  async function deleteExperience(experience_id) {
    axios.delete(`http://localhost:8000/user_experience/deleteByUser/${user.id}/${experience_id}`)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });

    axios.delete(`http://localhost:8000/experience/${experience_id}`)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
  };

  async function deleteSoftskill(softskill_id) {
		axios.delete(`http://localhost:8000/user_softskill/deleteByUser/${user.id}/${softskill_id}`)
		.then(response => {
			console.log(response);
		})
		.catch(error => {
			console.error(error);
		});
	};

  async function deleteHardskill(tecnicalskill_id) {
		axios.delete(`http://localhost:8000/user_hardskill/deleteByUser/${user.id}/${tecnicalskill_id}`)
		.then(response => {
			console.log(response);
		})
		.catch(error => {
			console.error(error);
		});
	};


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

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/institution`);
        const data = await response.json();
        setInstitutions(data.result)

        const response2 = await fetch(`http://localhost:8000/formation`);
        const data2 = await response2.json();
        setFormationsList(data2.result)

        const response3 = await fetch(`http://localhost:8000/user_formation/getFormationsByUserId2/${user.id}`);
        const data3 = await response3.json();
        console.log(data3)
        setRelations(data3.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setUser, setFormations, setExperiences, setInstitutions, setRelations, setFormationsList]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response3 = await fetch(`http://localhost:8000/user_formation/getFormationsByUserId2/${user.id}`);
        const data3 = await response3.json();
        console.log(data3)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, [user, setRelations, relations])

  function returnPositionName(position_id) {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/position/${position_id}`);
        const data = await response.json();
        setNomePos(data.result.name)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    fetchData();
    return nomePos
  }

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
                <p className="card-text">{user.description}</p>
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
                    </tr>
                    <tr>
                      <th scope="row">
                        <label htmlFor="form">Email</label>
                      </th>
                      <td>
                        <input type="text" className="form-control" id="form"
                          placeholder={user.email} onChange={(event) => setFormEmail(event.target.value)} disabled={disabled} />
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
                    </tr>
                    <tr>
                      <th scope="row">
                        <label htmlFor="form">Endereço</label>
                      </th>
                      <td>
                        <input type="text" className="form-control" id="form" onChange={(event) => setFormAddress(event.target.value)}
                          placeholder={user.address} disabled={disabled} />
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
                        <button className="btn btn-outline-secondary btn-sm m-2" onClick={() => setShowAddFormation(true)}>
                                adicionar
                        </button>
                        {showAddFormation && (
                          <form >
                            <div className="form-group">
                    
                            <div className="form-group m-3">
                              <label htmlFor="course">Curso:</label>
                              <input type="text" className="form-control" id="course" name="course" value={curso}
                                      placeholder="Digite seu curso" onChange={(event) => setCurso(event.target.value)} required />
                            </div>
                    
                            <div className="form-group m-3">
                              <label htmlFor="date">Período:</label>
                              <input type="text" className="form-control" id="date" name="date" value={periodo}
                                      placeholder="Digite o período do curso" onChange={(event) => setPeriodo(event.target.value)} required />
                            </div>
                    
                            <div className="form-group m-3">
                              <label htmlFor="name">Selecione a instituição</label>
                              <select className="form-control" id="softskill" name="softskill" value={institution}
                                onChange={(event) => { setInstitution(event.target.value)}} required>
                                <option value="">Selecione...</option>
                                {institutions.map((item) => (
                                  <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                              </select>
                            </div>
                    
                            <button type="button" className="btn btn-secondary mb-2" onClick={addFormation}>
                              Adicionar
                            </button>
                            </div>
                          </form>
                        )}
                        {relations.map((item) => (
                          <div key={item.id} className="card m-2">
                            <div className="card-body">
                              <h5 className="card-title">{item.Formation.course}</h5>
                              {/* <h6 className="card-subtitle mb-2 text-muted">{item.date}</h6> */}
                              <p className="card-text">{item.Institution.name}</p>
                              <button className="btn btn-outline-secondary btn-sm m-2" onClick={() => deleteFormation(item.Formation.id)}>
                                excluir
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
                              <p className="card-text">{returnPositionName(item.position_id)}</p>
                              <button className="btn btn-outline-secondary btn-sm m-2" onClick={() => deleteExperience(item.id)}>
                                excluir
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
                              <button className="btn btn-outline-secondary btn-sm m-2" onClick={() => deleteSoftskill(item.id)}>
                                excluir
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
                              <button className="btn btn-outline-secondary btn-sm m-2" onClick={() => deleteHardskill(item.id)}>
                                excluir
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