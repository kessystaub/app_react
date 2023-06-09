import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

function TecnicalskillForm() {
	const [tecnicalskills, setTecnicalskills] = useState([]);
	const [relations, setRelations] = useState([]);
	const [id, setId] = useState('');
	const [relationsHardskill, setRelationsHardskill] = useState([]);


	const navigate = useNavigate();

	const navigateToPerfil = () => {
	navigate('/perfil');
	};

	const navigateToFormation = () => {
	navigate('/formationForm');
	};

	async function addTecnicalskill(tecnicalskill_id) {
		const create = {
			"parameter": {
					"user_id": id,
					"hardskill_id": tecnicalskill_id
				}
			};

		const options = {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(create),
			};

		fetch(`http://localhost:8000/user_hardskill`, options)
		.then(data => {
			if (!data.ok) {
				throw Error(data.status);
				}
				return data.json();
			}).then(create => {
				fetch(`http://localhost:8000/hardskill/${tecnicalskill_id}`)
            .then(response => response.json())
            .then(data => {
              const experienceTemp = { Hardskill: { id: tecnicalskill_id, name: data.result.name } }
              setRelationsHardskill([...relationsHardskill, experienceTemp]);
              console.log(create);
          })
          .catch(error => {
            console.error('Erro:', error);
          }); 
			}).catch(e => {
			console.log(e);
			});
	};

	async function deleteTecnicalskill(tecnicalskill_id) {
		const novoArrayObjetos = relationsHardskill.filter(objeto => objeto.Hardskill.id !== tecnicalskill_id);
			axios.delete(`http://localhost:8000/user_hardskill/deleteByUser/${id}/${tecnicalskill_id}`)
			.then(response => {
		  setRelationsHardskill(novoArrayObjetos)
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
			const response = await fetch(`http://localhost:8000/hardskill`);
			const data = await response.json();
			setTecnicalskills(data.result)

			const response2 = await fetch(`http://localhost:8000/user_hardskill/getHardskillsByUserId/${id}`);
			const data2 = await response2.json();
			setRelations(data2.result)					
			
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
						<h4 className="text-center text-secondary mb-4">Suas habilidades técnicas</h4>
						<form>
							<div className="form-group">
								<label htmlFor="name">Selecione as habilidades que possui</label>
								<select className="form-control" id="softskill" name="softskill" value={tecnicalskills}
									onChange={(event) => { addTecnicalskill(event.target.value)}} required>
									<option value="">Selecione...</option>
									{tecnicalskills.map((item) => (
										<option key={item.id} value={item.id}>{item.name}</option>
									))}
								</select>
							</div>
							
							{/* buscar softskill pelo nome e retornar um objeto com nome e id*/}
							{relationsHardskill.map((item) => (
								<div key={item} className="card m-2">
									<div className="card-header">
										<p>{item.Hardskill.name}</p>
										<button className="btn btn-outline-secondary btn-sm" onClick={() => deleteTecnicalskill(item.Hardskill.id)}>
											excluir
										</button>
									</div>
								</div>
							))}


							<div className="justify-content-end row">
								<div className="text-center p-3">
									{/* <button type="button" className="btn btn-outline-secondary btn-lg m-1" onClick={navigateToPerfil}>Pular</button> */}
									<button type="submit" className="btn btn-secondary btn-lg m-1" onClick={navigateToFormation}>Continuar</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TecnicalskillForm;