import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

function TecnicalskillForm() {
	const [tecnicalskills, setTecnicalskills] = useState([]);
	const [relations, setRelations] = useState([]);
	const [id, setId] = useState('');

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
			console.log(create);
			}).catch(e => {
			console.log(e);
			});
	};

	async function deleteTecnicalskill(tecnicalskill_id) {
		axios.delete(`http://localhost:8000/user_hardskill/deleteByUser/${id}/${tecnicalskill_id}`)
		.then(response => {
			// Manipule a resposta da API, se necessário
			console.log(response);
		})
		.catch(error => {
			// Manipule erros da solicitação, se houver
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
	}, [id, relations]); // Empty dependency array ensures the effect runs only once

	async function getTecnicalByName(name) {
		const response = await fetch(`http://localhost:8000/hardskill/getByName/${name}`);
		const data = await response.json();
		console.log(data)
		deleteTecnicalskill(data.result.id)
	}

// id """
// 	SELECT name,intitution,formation FROM users 
// 	inner join userformations on userformations.uid= user.id
// 	inner join formation on formation.id=formations.id
// 	inner join institution on instituition.id = formation.intitutionid
// 	where user.id = {id}


// """
	function returnNames() {
		const result = []

		tecnicalskills?.forEach((item) => {
			relations?.forEach((names) => {
				if (item.id === names.hardskill_id) {
					result.push(item.name)
				}
			});
		});
		return result
	}


	return (
		<div>
			<div className="container mt-5">
				<div className="row justify-content-center">
					<div className="col-md-6">
						<img src="logo.png" alt="Logo" />
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
							{returnNames().map((item) => (
								<div key={item} className="card m-2">
									<div className="card-header">
										<p>{item}</p>
										<button className="btn btn-outline-secondary btn-sm" onClick={() => getTecnicalByName(item)}>
											excluir
										</button>
									</div>
								</div>
							))}


							<div className="justify-content-end row">
								<div className="text-center p-3">
									<button type="button" className="btn btn-outline-secondary btn-lg" onClick={navigateToPerfil}>Pular</button>
									<button type="submit" className="btn btn-secondary btn-lg" onClick={navigateToFormation}>Continuar</button>
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