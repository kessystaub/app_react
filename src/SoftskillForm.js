import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

function SoftskillForm() {
	const [softskills, setSoftskills] = useState([]);
	const [userSoftskills, setUserSoftskills] = useState([]);
	const [userSoftskillsnames, setUserSoftskillsNames] = useState([]);
	const [softskill, setSoftskill] = useState();
	const [id, setId] = useState('');

	const navigate = useNavigate();

	const navigateToPerfil = () => {
	navigate('/perfil');
	};

	const navigateToTecnicalskillForm = () => {
	navigate('/tecnicalskillForm');
	};


	async function addSoftskill(softskill_id) {
		const create = {
			"parameter": {
					"user_id": id,
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

		fetch(`http://localhost:8000/user_softskill`, options)
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

	async function deleteSoftskill(softskill_id) {
		console.log(softskill_id)
		console.log(id)

		const options = {
			method: 'DELETE',
		};

		const response = await fetch(`http://localhost:8000/user_softskill/deleteByUser/${id}/${softskill_id}`, options)
		console.log(response)
	};


	useEffect(() => {
		const storedValue = localStorage.getItem('user-info');
		const jsonObject = JSON.parse(storedValue);
		const userId = jsonObject.result;
		setId(userId)

		const fetchData = async () => {
		try {
			const response = await fetch(`http://localhost:8000/softskill`);
			const data = await response.json();
			setSoftskills(data.result)

			const response2 = await fetch(`http://localhost:8000/user_softskill/getSoftskillsByUserId/${id}`);
			const data2 = await response2.json();
			setUserSoftskills(data2.result)					
			
		} catch (error) {
			console.error('Error fetching data:', error);
		}
		};

		fetchData();
	}, []); // Empty dependency array ensures the effect runs only once

	function returnNames() {
		const result = []

		softskills?.forEach((item) => {
			userSoftskills?.forEach((names) => {
				if (item.id === names.softskill_id) {
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
						<h4 className="text-center text-secondary mb-4">Suas habilidades interpessoais</h4>
						<form>
							<div className="form-group">
								<label htmlFor="name">Selecione as habilidades que possui</label>
								<select className="form-control" id="softskill" name="softskill" value={softskills}
									onChange={(event) => { addSoftskill(event.target.value)}} required>
									<option value="">Selecione...</option>
									{softskills.map((item) => (
										<option key={item.id} value={item.id}>{item.name}</option>
									))}
								</select>
							</div>
							
							{returnNames().map((item) => (
								<div key={item} className="card m-2">
									<div className="card-header">
										<p>{item}</p>
										<button className="btn btn-outline-secondary btn-sm" onClick={() => deleteSoftskill(item.id)}>
											excluir
										</button>
									</div>
								</div>
							))}


							<div className="justify-content-end row">
								<div className="text-center p-3">
									<button type="button" className="btn btn-outline-secondary btn-lg" onClick={navigateToPerfil}>Pular</button>
									<button type="submit" className="btn btn-secondary btn-lg" onClick={navigateToTecnicalskillForm}>Continuar</button>
								</div>
							</div>
						</form>
					</div>
				</div>
				</div>
		</div>
	);
}

export default SoftskillForm;