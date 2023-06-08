import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

function FormationForm() {
  const navigate = useNavigate();
  const [institution, setInstitution] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [institutions, setInstitutions] = useState([]);
  const [curso, setCurso] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [id, setId] = useState('');
  const [formationId, setFormationId] = useState(0);
  const [formations, setFormations] = useState([]);
  const [relations, setRelations] = useState([]);
  const [relationsFormation, setRelationsFormation] = useState([]);
  

  const navigateToPerfil = () => {
    navigate('/perfil');
  };

  const navigateToExperienceForm = () => {
    navigate('/experienceForm');
  };

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
			fetch(`http://localhost:8000/institution/${institution}`)
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
          "user_id": id,
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
      console.log(create);
      }).catch(e => {
      console.log(e);
      });
  }

  async function deleteFormation(formation_id) {
    const novoArrayObjetos = relationsFormation.filter(objeto => objeto.Formation.id !== formation_id);
		axios.delete(`http://localhost:8000/user_formation/deleteByUser/${id}/${formation_id}`)
		.then(response => {
			console.log(response);
		})
		.catch(error => {
			console.error(error);
		});

		axios.delete(`http://localhost:8000/formation/${formation_id}`)
		.then(response => {
      setRelationsFormation(novoArrayObjetos)
			console.log(response);
		})
		.catch(error => {
			console.error(error);
		});
	};


  useEffect(() => {
	const storedValue = localStorage.getItem('user-info');
	const jsonObject = JSON.parse(storedValue);
	const userId = jsonObject.user.id;
	setId(userId)
	
    const fetchData = async () => {
      try {
		const response = await fetch(`http://localhost:8000/institution`);
		const data = await response.json();
		setInstitutions(data.result)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once



  return (
    <div>
      <div className="container mt-5">
      	<div className="row justify-content-center">
		  <div className="col-md-6 row justify-content-center align-items-center mt-5">
			<img src="logo.png" alt="Logo" className='w-75'/>
			<h4 className="text-center text-secondary mb-4">Sua formação acadêmica</h4>
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

				<div className="justify-content-end row">
				<div className="text-center p-3">
					<button type="button" className="btn btn-outline-secondary mb-2" onClick={() => addFormation()}>
						Adicionar
					</button>
				</div>
				</div>

				</div>

				{
					relationsFormation.map((item) => (
						<div key={item.id} className="card mb-3">
							<div className="card-header">
								{item.Formation.course}
							</div>
							<div className="card-body">
								<blockquote className="blockquote mb-0">
								<p>{item.Institution.name}</p>
								<footer className="blockquote-footer">{item.Formation.date}</footer>
								</blockquote>
	
								<button className="btn btn-outline-secondary btn-sm m-2" onClick={() => deleteFormation(item.Formation.id)}>
									excluir
								</button>
							</div>
							
						</div>
					))
				}

				<div className="justify-content-end row">
				<div className="text-center p-3">
					<button type="button" className="btn btn-outline-secondary btn-lg m-1" onClick={navigateToPerfil}>Pular</button>
					<button type="button" className="btn btn-secondary btn-lg m-1" onClick={navigateToExperienceForm}>Continuar</button>
				</div>
				</div>
			</form>
			</div>
		  </div>
    	</div>
    </div>
  );
}

export default FormationForm;