import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

function SoftskillForm() {
  const [softskills, setSoftskills] = useState([]);
  const [userSoftskills, setUserSoftskills] = useState([]);
  const [softskill, setSoftskill] = useState();

  const navigate = useNavigate();

  const navigateToPerfil = () => {
    navigate('/perfil');
  };

  const navigateToTecnicalskillForm = () => {
    navigate('/tecnicalskillForm');
  };

  function getSoftskillsByUser(user_id) {
		fetch(`http://localhost:8000/user_softskill/getSoftskillsByUserId/${user_id}`)
		.then(response => response.json())
		.then(data => {
		setUserSoftskills(data.result)
	})
	.catch(error => {
		console.error('Erro:', error);
	});
	}
	

	function getSoftskillsById(id) {
		fetch(`http://localhost:8000/softskill/${id}`)
		.then(response => response.json())
		.then(data => {
			setSoftskill(data.result)
			return softskill.name
	})
	.catch(error => {
		console.error('Erro:', error);
	});
	}

	const addSoftskill = (event) => {
		event.preventDefault();
	
		const update = {
		  "parameter": {
				"formation_id": 1,
				"experience_id": 2
			  }
		  };
	
		const options = {
		  method: 'PATCH',
		  headers: {
		  'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(update),
		  };
	
		fetch(`http://localhost:8000/user/10`, options)
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
	  };
	


useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/softskill`);
        const data = await response.json();
		setSoftskills(data.result)
		getSoftskillsByUser('10')
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
									<option key={item.id} value={item.name}>{item.name}</option>
								))}
							</select>
						</div>

						{userSoftskills.map((item) => (
							<div key={item.id} className="card">
								<div className="card-header">
									{/* {getSoftskillsById(item.softskill_id)} */}
								</div>
							</div>
						))}


						<label htmlFor="name">Já possui uma carta de recomedação? Você pode anexá-la
							aqui</label>
						<div className="custom-file">
							<input type="file" className="custom-file-input" id="customFile" />
						</div>

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