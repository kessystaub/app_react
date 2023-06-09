import React, { useCallback, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Menu from './Menu';
import axios from 'axios';
import FormacaoImagem from './images/education.png';
import ExperienciaImagem from './images/brain.png';
import UsuarioImagem from './images/user.png';
import SubImagem from './images/sub.png';
import AdicionarImagem from './images/plus.png';
import SoftskillImagem from './images/notes.png';
import HardskillImagem from './images/development.png';
import ExcluirImagem from './images/lixo.png';
import Footer from './Footer';


function Perfil() {
  const [user, setUser] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    address_number: '',
    address_neighborhood: '',
    address_complement: '',
  });
  const [userName, setUserName] = useState('');

  
  // formation states
  const [showAddFormation, setShowAddFormation] = useState(false)
  const [relationsFormation, setRelationsFormation] = useState([{ Formation: { course: '', date: '' } , Institution: {name: ''}}]);
  const [institution, setInstitution] = useState('');
  const [institutions, setInstitutions] = useState([]);
  const [curso, setCurso] = useState('');
  const [periodo, setPeriodo] = useState('');
  
  // experiencia states
  const [empresa, setEmpresa] = useState('');
  const [cargos, setCargos] = useState([]);
  const [cargo, setCargo] = useState('');
  const [periodoExperiencia, setPeriodoExperiencia] = useState('');
  const [showAddExperience, setShowAddExperience] = useState(false)
  const [relationsExperience, setRelationsExperience] = useState([{ Experience: { company: '', date: '' } , Position: {name: ''}}]);
  
  // softskills states
  const [softskills, setSoftskills] = useState([]);
  const [showAddSoftskill, setShowAddSoftskill] = useState(false)
  const [relationsSoftskill, setRelationsSoftskill] = useState([{ Softskill: { id: '', name: '' } }]);
  const [softskillsList, setSoftskillsList] = useState([]);
  
  
  // hardskills states
  const [hardskills, setHardskills] = useState([])
  const [showAddHardskill, setShowAddHardskill] = useState(false)
  const [relationsHardskill, setRelationsHardskill] = useState([{ Hardskill: { id: '', name: '' } }]);
  const [hardskillsList, setHardskillsList] = useState([]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, address_number, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value, [address_number]: value }));
  };

  const navigateToCurriculo = () => {
    navigate('/curriculo');
  };

  const updateUser = useCallback(() => {
    const userTemp = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      address_number: user.address_number,
      address_neighborhood: user.address_neighborhood,
      address_complement: user.address_complement,
    }

    setUserForm(userTemp)
    
    const update = {
      "parameter": {
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "address": user.address,
        "address_number": user.address_number,
        "address_neighborhood": user.address_neighborhood,
        "address_complement": user.address_complement,
        "city_id": 4
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
  
    fetch(`https://projeto_1-4-h0551544.deta.app/user/${user.id}`, options)
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
  }, [user.id, user.name, user.email, user.phone, user.address, user.address_number, user.address_neighborhood, user.address_complement])

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
  
    fetch(`https://projeto_1-4-h0551544.deta.app/formation`, options)
    .then(data => {
      if (!data.ok) {
        throw Error(data.status);
        }
        return data.json();
      }).then(create => {
        fetch(`https://projeto_1-4-h0551544.deta.app/institution/${institution}`)
          .then(response => response.json())
          .then(data => {
            const formationTemp = { Formation: { id: create.result.id, course: create.result.course, date: create.result.date } , Institution: {name: data.result.name}}
            setRelationsFormation([...relationsFormation, formationTemp]);
            console.log('relationsFormation', relationsFormation)
            addUserFormation(create.result.id)
        })
        .catch(error => {
          console.error('Erro:', error);
        });
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
  
    fetch(`https://projeto_1-4-h0551544.deta.app/user_formation`, options2)
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
  
  function addExperience() {
    let cargo_id = cargo

	  const create = {
      "parameter": {
        "company": empresa,
        "date": periodoExperiencia,
        "position_id": cargo_id
      }
	  }

    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(create),
      };

    fetch(`https://projeto_1-4-h0551544.deta.app/experience`, options)
    .then(data => {
      if (!data.ok) {
        throw Error(data.status);
        }
        return data.json();
      }).then(create => {
        fetch(`https://projeto_1-4-h0551544.deta.app/position/${cargo}`)
          .then(response => response.json())
          .then(data => {
            const experienceTemp = { Experience: { id: create.result.id, company: create.result.company, date: create.result.date } , Position: {name: data.result.name}}
            setRelationsExperience([...relationsExperience, experienceTemp]);
            console.log('relationsExperiencen', relationsExperience)
            addUserExperience(create.result.id)
        })
        .catch(error => {
          console.error('Erro:', error);
        });
        
      }).catch(e => {
      console.log(e);
      });
  }

  function addUserExperience(experience_id) {
    const relation = {
      "parameter": {
          "user_id": user.id,
          "experience_id": experience_id
        }
      };

    const options2 = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(relation),
      };

    fetch(`https://projeto_1-4-h0551544.deta.app/user_experience`, options2)
    .then(data => {
      if (!data.ok) {
        throw Error(data.status);
        }
        return data.json();
      }).then(create => {
      console.log(create);
      }).catch(e => {
      console.log(e);
      });
  }

  async function addSoftskill(softskill_id) {
		const create = {
			"parameter": {
					"user_id": user.id,
					"softskill_id": softskill_id
				}
			};

		const options = {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(create),
			};

		fetch(`https://projeto_1-4-h0551544.deta.app/user_softskill`, options)
		.then(data => {
			if (!data.ok) {
				throw Error(data.status);
				}
				return data.json();
			}).then(create => {
          fetch(`https://projeto_1-4-h0551544.deta.app/softskill/${softskill_id}`)
            .then(response => response.json())
            .then(data => {
              const experienceTemp = { Softskill: { id: softskill_id, name: data.result.name } }
              setRelationsSoftskill([...relationsSoftskill, experienceTemp]);
              console.log('relationsSoftskill', relationsSoftskill)
              console.log(create);
          })
          .catch(error => {
            console.error('Erro:', error);
          }); 
          
			}).catch(e => {
			console.log(e);
			});

	};

  async function addHardskill(hardskill_id) {
		const create = {
			"parameter": {
					"user_id": user.id,
					"hardskill_id": hardskill_id
				}
			};

		const options = {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(create),
			};

		fetch(`https://projeto_1-4-h0551544.deta.app/user_hardskill`, options)
		.then(data => {
			if (!data.ok) {
				throw Error(data.status);
				}
				return data.json();
			}).then(create => {
        fetch(`https://projeto_1-4-h0551544.deta.app/hardskill/${hardskill_id}`)
            .then(response => response.json())
            .then(data => {
              const experienceTemp = { Hardskill: { id: hardskill_id, name: data.result.name } }
              setRelationsHardskill([...relationsHardskill, experienceTemp]);
              console.log('relationsHardskill', relationsHardskill)
              console.log(create);
          })
          .catch(error => {
            console.error('Erro:', error);
          }); 
			console.log(create);
			}).catch(e => {
			console.log(e);
			});
	};

  async function deleteFormation(formation_id) {
    const novoArrayObjetos = relationsFormation.filter(objeto => objeto.Formation.id !== formation_id);
		axios.delete(`https://projeto_1-4-h0551544.deta.app/user_formation/deleteByUser/${user.id}/${formation_id}`)
		.then(response => {
			console.log(response);
		})
		.catch(error => {
			console.error(error);
		});

		axios.delete(`https://projeto_1-4-h0551544.deta.app/formation/${formation_id}`)
		.then(response => {
      setRelationsFormation(novoArrayObjetos)
			console.log(response);
		})
		.catch(error => {
			console.error(error);
		});
	};

  async function deleteExperience(experience_id) {
    const novoArrayObjetos = relationsExperience.filter(objeto => objeto.Experience.id !== experience_id);
    axios.delete(`https://projeto_1-4-h0551544.deta.app/user_experience/deleteByUser/${user.id}/${experience_id}`)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });

    axios.delete(`https://projeto_1-4-h0551544.deta.app/experience/${experience_id}`)
    .then(response => {
      setRelationsExperience(novoArrayObjetos)
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
  };

  async function deleteSoftskill(softskill_id) {
    const novoArrayObjetos = relationsSoftskill.filter(objeto => objeto.Softskill.id !== softskill_id);
		axios.delete(`https://projeto_1-4-h0551544.deta.app/user_softskill/deleteByUser/${user.id}/${softskill_id}`)
		.then(response => {
      setRelationsSoftskill(novoArrayObjetos)
			console.log(response);
		})
		.catch(error => {
			console.error(error);
		});
	};

  async function deleteHardskill(tecnicalskill_id) {
    const novoArrayObjetos = relationsHardskill.filter(objeto => objeto.Hardskill.id !== tecnicalskill_id);
		axios.delete(`https://projeto_1-4-h0551544.deta.app/user_hardskill/deleteByUser/${user.id}/${tecnicalskill_id}`)
		.then(response => {
      setRelationsHardskill(novoArrayObjetos)
			console.log(response);
		})
		.catch(error => {
			console.error(error);
		});
	};


  useEffect(() => {
    const storedValue = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : [];
    const user = storedValue.user;
    const softskillslist = storedValue.softskills;
    const hardskillslist = storedValue.hardskills;
    setUser(user)
    setSoftskills(softskillslist)
    setHardskills(hardskillslist)

    const fetchData = async () => {
      try {
        // user
        const response_user = await fetch(`https://projeto_1-4-h0551544.deta.app/user/${user.id}`);
        const data_user = await response_user.json();
        setUserForm(data_user.result)
        // setUserForm(user)

        // formacao

        const response = await fetch(`https://projeto_1-4-h0551544.deta.app/institution`);
        const data = await response.json();
        setInstitutions(data.result)

        const response3 = await fetch(`https://projeto_1-4-h0551544.deta.app/user_formation/getFormationsByUserId2/${user.id}`);
        const data3 = await response3.json();
        console.log(data3)
        setRelationsFormation(data3.result);

        // experiencias

        const response4 = await fetch(`https://projeto_1-4-h0551544.deta.app/position`);
        const data4 = await response4.json();
        setCargos(data4.result)

        const response6 = await fetch(`https://projeto_1-4-h0551544.deta.app/user_experience/getExperiencesByUserId2/${user.id}`);
        const data6 = await response6.json();
        setRelationsExperience(data6.result);

        // softskill

        const response7 = await fetch(`https://projeto_1-4-h0551544.deta.app/softskill`);
        const data7 = await response7.json();
        setSoftskillsList(data7.result)

        const response8 = await fetch(`https://projeto_1-4-h0551544.deta.app/user_softskill/getSoftskillsByUserId2/${user.id}`);
        const data8 = await response8.json();
        setRelationsSoftskill(data8.result)
        console.log(relationsSoftskill)

        // hardskill

        const response9 = await fetch(`https://projeto_1-4-h0551544.deta.app/hardskill`);
        const data9 = await response9.json();
        setHardskillsList(data9.result)

        const response10 = await fetch(`https://projeto_1-4-h0551544.deta.app/user_hardskill/getHardskillsByUserId2/${user.id}`);
        const data10 = await response10.json();
        setRelationsHardskill(data10.result)		
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Menu/>

      <div className="container mt-5">
        <div className='d-flex justify-content-center align-items-center'>    
            <div className="card mt-4 w-75 border-0">
              <div className="row">
                <div className="col-md-4">
                  <div className="card border-0 text-center">
                    <div className="card-body">
                      <img src={UsuarioImagem} className="card-img-top w-75 mb-5 mt-5" alt="User" />
                      <h5 className="card-title">{user.name}</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card border-0">
                    <div className="card-body">
                      <h5 className="card-title mb-4">Informações pessoais</h5>
                      {!showUserForm && (
                        <table className="table">
                          <tbody>
                            <tr>
                              <th className='text-secondary' scope="row">Nome</th>
                              <td>{userForm.name}</td>
                            </tr>
                            <tr>
                              <th className='text-secondary' scope="row">Email</th>
                              <td>{userForm.email}</td>
                            </tr>
                            <tr>
                              <th className='text-secondary' scope="row">Telefone</th>
                              <td>{userForm.phone}</td>
                            </tr>
                            <tr>
                              <th className='text-secondary' scope="row">Endereço</th>
                              <td>{userForm.address}</td>
                            </tr>
                            <tr>
                              <th className='text-secondary' scope="row">Número de endereço</th>
                              <td>{userForm.address_number}</td>
                            </tr>
                            <tr>
                              <th className='text-secondary' scope="row">Bairro</th>
                              <td>{userForm.address_neighborhood}</td>
                            </tr>
                            <tr>
                              <th className='text-secondary' scope="row">Complemento</th>
                              <td>{userForm.address_complement}</td>
                            </tr>
                            <tr>
                              <td colSpan="1">
                                <button className="btn btn-outline-secondary" onClick={navigateToCurriculo}>
                                  Visualizar currículo
                                </button>
                              </td>
                              <td colSpan="2">
                                {/* <button className="btn btn-outline-secondary text-end" onClick={() => setShowUserForm(true)}>
                                  Editar perfil
                                </button> */}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      )}

                      {showUserForm && (
                        <form>
                          <table className="table">
                            <tbody>
                              <tr>
                                <th className='text-secondary' scope="row">Nome</th>
                                <td>
                                  <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInputChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th className='text-secondary' scope="row">Email</th>
                                <td>
                                  <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th className='text-secondary' scope="row">Telefone</th>
                                <td>
                                  <input
                                    type="tel"
                                    name="phone"
                                    value={user.phone}
                                    onChange={handleInputChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th className='text-secondary' scope="row">Endereço</th>
                                <td>
                                  <input
                                    type="text"
                                    name="address"
                                    value={user.address}
                                    onChange={handleInputChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th className='text-secondary' scope="row">Número de endereço</th>
                                <td>
                                  <input
                                    type="text"
                                    name="address_number"
                                    value={user.address_number}
                                    onChange={handleInputChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th className='text-secondary' scope="row">Bairro</th>
                                <td>
                                  <input
                                    type="text"
                                    name="address_neighborhood"
                                    value={user.address_neighborhood}
                                    onChange={handleInputChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th className='text-secondary' scope="row">Complemento</th>
                                <td>
                                  <input
                                    type="text"
                                    name="address_complement"
                                    value={user.address_complement}
                                    onChange={handleInputChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="1">
                                </td>
                                <td colSpan="2">
                                  <button className="btn btn-outline-secondary m-1" onClick={() => setShowUserForm(false)}>
                                    Cancelar
                                  </button>
                                  <button className="btn btn-outline-success m-1" onClick={() => updateUser()}>
                                    Salvar
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="card-body">
                  <h4 className="card-title d-flex align-items-center justify-content-center m-3">Sobre</h4>

                  {/* formations */}

                  <hr className="my-4"></hr>
                  
                  <div className='card-title d-flex align-items-center justify-content-center m-3'>
                    <h4 className="m-2">Formação</h4>
                    <img src={FormacaoImagem} alt='formation' className="mb-3" />
                  </div>

                  <div className="row d-flex justify-content-center align-items-center">
                    {relationsFormation.map((item) => (
                      <div className="col-sm-3 d-flex justify-content-center">
                        {/* style={{ width: '200px', height: '200px'}} */}
                        <div className="card">
                          <div className="card-body text-center">
                            <h5 className="card-title">Curso: {item.Formation.course}</h5>
                            <p className="card-text text-secondary">Período: {item.Formation.date}</p>
                            <p className="card-text">Instituição: {item.Institution.name}</p>
                            <button className="btn" onClick={() => deleteFormation(item.Formation.id)}>
                              <img src={ExcluirImagem} alt='delete' className='w-75' />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className='d-flex justify-content-center align-items-center m-3'>
                      <button className="btn mt-2 border-0" onClick={() => setShowAddFormation(!showAddFormation)}>
                        {!showAddFormation && (<img src={AdicionarImagem} alt='formation' className="w-50" />)}
                        {showAddFormation && (<img src={SubImagem} alt='formation' className="w-50" />)}
                      </button>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                      {showAddFormation && (
                        <form >
                          <div className="row">
                            <div className='col'>
                              <div className="form-group m-3">
                                <label htmlFor="course">Curso:</label>
                                <input type="text" className="form-control" id="course" name="course" value={curso}
                                        placeholder="Digite seu curso" onChange={(event) => setCurso(event.target.value)} required />
                              </div>
                            </div>

                            <div className='col'>
                              <div className="form-group m-3">
                                <label htmlFor="date">Período:</label>
                                <input type="text" className="form-control" id="date" name="date" value={periodo}
                                        placeholder="Exemplo: 2019-2020" onChange={(event) => setPeriodo(event.target.value)} required />
                              </div>
                            </div>

                            <div className='col'>
                              <div className="form-group m-3">
                                <label htmlFor="name">Selecione a instituição</label>
                                <select className="form-control" id="softskill" name="softskill" value={institution}
                                  onChange={(event) => { 
                                    setInstitution(event.target.value)}} required>
                                  <option value="">Selecione...</option>
                                  {institutions.map((item) => (
                                    <option key={item.name} value={item.id}>{item.name}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className='d-flex justify-content-center align-items-center'>
                              <button type="button" className="btn btn-secondary m-2" onClick={() => setShowAddFormation(!showAddFormation)}>
                                Cancelar
                              </button>
                              <button type="button" className="btn btn-secondary m-2" onClick={addFormation}>
                                Adicionar
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>

                  {/* experiences */}

                  <hr className="my-4"></hr>

                  <div className='card-title d-flex align-items-center justify-content-center m-3'>
                    <h4 className="m-2">Experiência</h4>
                    <img src={ExperienciaImagem} alt='formation' className="mb-3" />
                  </div>

                  <div className="row d-flex justify-content-center align-items-center">
                    {relationsExperience.map((item) => (
                        <div className="col-sm-3 d-flex justify-content-center">
                          {/* style={{ width: '200px', height: '200px'}} */}
                          <div className="card">
                            <div className="card-body text-center">
                              <h5 className="card-title">Empresa: {item.Experience.company}</h5>
                              <p className="card-text text-secondary">Período: {item.Experience.date}</p>
                              <p className="card-text">Cargo: {item.Position.name}</p>
                              <button className="btn" onClick={() => deleteExperience(item.Experience.id)}>
                                <img src={ExcluirImagem} alt='delete' className='w-75' />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                    <div className='d-flex justify-content-center align-items-center m-3'>
                      <button className="btn mt-2 border-0" onClick={() => setShowAddExperience(!showAddExperience)}>
                        {!showAddExperience && (<img src={AdicionarImagem} alt='formation' className="w-50" />)}
                        {showAddExperience && (<img src={SubImagem} alt='formation' className="w-50" />)}
                      </button>
                    </div>

                    <div className='d-flex justify-content-center align-items-center'>
                      {showAddExperience && (
                        <form>
                          <div className='row'>
                            <div className='col'>
                              <div className="form-group m-3">
                                <label htmlFor="course">Empresa:</label>
                                <input type="text" className="form-control" id="course" name="course" value={empresa}
                                        placeholder="Digite o nome da empresa" onChange={(event) => setEmpresa(event.target.value)} required />
                              </div>
                            </div>

                            <div className='col'>
                              <div className="form-group m-3">
                                <label htmlFor="date">Período:</label>
                                <input type="text" className="form-control" id="date" name="date" value={periodoExperiencia}
                                        placeholder="Exemplo: 2019-2020" onChange={(event) => setPeriodoExperiencia(event.target.value)} required />
                              </div>
                            </div>

                            <div className='col'>
                              <div className="form-group m-3">
                                <label htmlFor="name">Selecione o cargo</label>
                                <select className="form-control" id="softskill" name="softskill" value={cargo}
                                  onChange={(event) => { setCargo(event.target.value)}} required>
                                  <option value="">Selecione...</option>
                                  {cargos.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className='d-flex justify-content-center align-items-center'>
                              <button type="button" className="btn btn-secondary m-2" onClick={() => setShowAddExperience(!showAddExperience)}>
                                Cancelar
                              </button>
                              <button type="button" className="btn btn-secondary m-2" onClick={() => addExperience()}>
                                Adicionar
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>

                  {/* softskills */}

                  <hr className="my-4"></hr>

                  <div className='card-title d-flex align-items-center justify-content-center m-3'>
                    <h4 className="m-2">Habilidades interpessoais</h4>
                    <img src={SoftskillImagem} alt='formation' className="mb-3" />
                  </div>

                  <div className="row d-flex justify-content-center align-items-center">
                    {relationsSoftskill.map((item) => (
                       <div className="col-sm-4 d-flex justify-content-center">
                       <div className="card">
                         <div className="card-body d-flex align-items-center justify-content-between">
                           <h5 className="card-title">{item.Softskill.name}</h5>
                           <button className="btn" onClick={() => deleteSoftskill(item.Softskill.id)}>
                             <img src={ExcluirImagem} alt="delete" className="w-75" />
                           </button>
                         </div>
                       </div>
                     </div>
                      ))}

                    <div className='d-flex justify-content-center align-items-center m-3'>
                      <button className="btn mt-2 border-0" onClick={() => setShowAddSoftskill(!showAddSoftskill)}>
                        {!showAddSoftskill && (<img src={AdicionarImagem} alt='formation' className="w-50" />)}
                        {showAddSoftskill && (<img src={SubImagem} alt='formation' className="w-50" />)}
                      </button>
                    </div>

                    <div className='d-flex justify-content-center align-items-center'>
                      {showAddSoftskill && (
                        <form>
                          <div className='row'>
                            <div className='col'>
                              <div className="form-group">
                                <label htmlFor="name">Selecione uma habilidade que possui</label>
                                <select className="form-control" id="softskill" name="softskill" value={softskills}
                                  onChange={(event) => { addSoftskill(event.target.value)}} required>
                                  <option value="">Selecione...</option>
                                  {softskillsList.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className='d-flex justify-content-center align-items-center'>
                              <button type="button" className="btn btn-secondary m-2" onClick={() => setShowAddSoftskill(!showAddSoftskill)}>
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>

                  {/* hardskills */}
                  
                  <hr className="my-4"></hr>

                  <div className='card-title d-flex align-items-center justify-content-center m-3'>
                    <h4 className="m-2">Habilidades técnicas</h4>
                    <img src={HardskillImagem} alt='formation' className="mb-3" />
                  </div>

                  <div className="row d-flex justify-content-center align-items-center">
                    {relationsHardskill.map((item) => (
                        <div className="col-sm-3 d-flex justify-content-center">
                          {/* style={{ width: '200px', height: '200px'}} */}
                          <div className="card">
                            <div className="card-body d-flex align-items-center justify-content-between">
                              <h5 className="card-title">{item.Hardskill.name}</h5>
                              <button className="btn" onClick={() => deleteHardskill(item.Hardskill.id)}>
                                <img src={ExcluirImagem} alt='delete' className='w-75' />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                    <div className='d-flex justify-content-center align-items-center m-3'>
                      <button className="btn mt-2 border-0" onClick={() => setShowAddHardskill(!showAddHardskill)}>
                        {!showAddHardskill && (<img src={AdicionarImagem} alt='formation' className="w-50" />)}
                        {showAddHardskill && (<img src={SubImagem} alt='formation' className="w-50" />)}
                      </button>
                    </div>

                    <div className='d-flex justify-content-center align-items-center'>
                      {showAddHardskill && (
                        <form>
                          <div className='row'>
                            <div className='col'>
                              <div className="form-group">
                                <label htmlFor="name">Selecione uma habilidade que possui</label>
                                <select className="form-control" id="hardskill" name="hardskill" value={hardskills}
                                  onChange={(event) => { addHardskill(event.target.value)}} required>
                                  <option value="">Selecione...</option>
                                  {hardskillsList.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className='d-flex justify-content-center align-items-center'>
                              <button type="button" className="btn btn-secondary m-2" onClick={() => setShowAddHardskill(!showAddHardskill)}>
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>

    <Footer />
    </div>
  );
}

export default Perfil;