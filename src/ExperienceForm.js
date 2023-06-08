import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

function ExperienceForm() {
  const [periodo, setPeriodo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [experiences, setExperiences] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [cargo, setCargo] = useState('');
  const [id, setId] = useState('');
  const [relations, setRelations] = useState([]);
  const [relationsExperience, setRelationsExperience] = useState([{ Experience: { company: '', date: '' } , Position: {name: ''}}]);


  const navigate = useNavigate();

  const navigateToPerfil = () => {
    navigate('/perfil');
  };

  const navigateToLogin = () => {
    localStorage.clear()
    navigate('/');
  };

  function addExperience() {
    let cargo_id = cargo

	  const create = {
      "parameter": {
        "company": empresa,
        "date": periodo,
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

    fetch(`http://localhost:8000/experience`, options)
    .then(data => {
      if (!data.ok) {
        throw Error(data.status);
        }
        return data.json();
      }).then(create => {
        console.log(create)
        addUserExperience(create.result.id)
      }).catch(e => {
      console.log(e);
      });
  }

  function addUserExperience(experience_id) {
    const relation = {
      "parameter": {
          "user_id": id,
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

    fetch(`http://localhost:8000/user_experience`, options2)
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

  useEffect(() => {
    const storedValue = localStorage.getItem('user-info');
    const jsonObject = JSON.parse(storedValue);
    const userId = jsonObject.user.id;
    setId(userId)
    
      const fetchData = async () => {
        try {
          const response1 = await fetch(`http://localhost:8000/position`);
          const data1 = await response1.json();
          setCargos(data1.result)

          const response2 = await fetch(`http://localhost:8000/experience`);
          const data2 = await response2.json();
          setExperiences(data2.result)
      
          const response3 = await fetch(`http://localhost:8000/user_experience/getExperiencesByUserId/${id}`);
          const data3 = await response3.json();
          setRelations(data3.result);

          const response6 = await fetch(`http://localhost:8000/user_experience/getExperiencesByUserId2/${id}`);
          const data6 = await response6.json();
          setRelationsExperience(data6.result);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
      };
  
      fetchData();
    }, [id, relations, setExperiences, cargos]); // Empty dependency array ensures the effect runs only once


    async function deleteExperience(experience_id) {
      console.log(experience_id)
      axios.delete(`http://localhost:8000/user_experience/deleteByUser/${id}/${experience_id}`)
      .then(response => {
        // Manipule a resposta da API, se necessário
        console.log(response);
      })
      .catch(error => {
        // Manipule erros da solicitação, se houver
        console.error(error);
      });
  
      axios.delete(`http://localhost:8000/experience/${experience_id}`)
      .then(response => {
        // Manipule a resposta da API, se necessário
        console.log(response);
      })
      .catch(error => {
        // Manipule erros da solicitação, se houver
        console.error(error);
      });
    };

  return (
    <div>
      <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 row justify-content-center align-items-center mt-5">
          <img src="logo.png" alt="Logo" className='w-75'/>
          <h4 className="text-center text-secondary mb-4">Sua experiência
            profissional</h4>
          <form>
            <div className="form-group m-3">
              <label htmlFor="course">Empresa:</label>
              <input type="text" className="form-control" id="course" name="course" value={empresa}
                      placeholder="Digite o nome da empresa em que trabalhou" onChange={(event) => setEmpresa(event.target.value)} required />
            </div>

          <div className="form-group m-3">
              <label htmlFor="date">Período:</label>
              <input type="text" className="form-control" id="date" name="date" value={periodo}
                      placeholder="Digite o período de experiência" onChange={(event) => setPeriodo(event.target.value)} required />
          </div>

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

          <div className="justify-content-end row">
				<div className="text-center p-3">
          <button type="button" className="btn btn-outline-secondary mb-2" onClick={() => addExperience()}>
            Adicionar
          </button>
          </div>
          </div>

          {relationsExperience && (  
            relationsExperience.map((item) => (
              <div key={item.id} className="card">
                <div className="card-header">
                  {item.Experience.company}
                </div>
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>{item.Experience.date}</p>
                    <footer className="blockquote-footer">{item.Position.name}</footer>
                  </blockquote>
                  
                  <button className="btn btn-outline-secondary btn-sm m-2" onClick={() => deleteExperience(item.Experience.id)}>
                    excluir
                  </button>
                </div>
              </div>
            ))
          )}
            

            <div className="justify-content-end row">
              <div className="text-center p-3">
                <button type="button" className="btn btn-outline-secondary btn-lg m-1" onClick={navigateToPerfil}>Pular</button>
                <button type="button" className="btn btn-secondary btn-lg m-1" onClick={navigateToLogin}>Continuar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ExperienceForm;