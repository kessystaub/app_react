import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

function FormationForm() {
  const navigate = useNavigate();
  const [formation, setFormation] = useState([]);
  const [institution, setInstitution] = useState('');

  const navigateToPerfil = () => {
    navigate('/perfil');
  };

  const navigateToExperienceForm = () => {
    navigate('/experienceForm');
  };

  function getInstitution(id) {
    fetch(`http://localhost:8000/institution/${id}`)
      .then(response => response.json())
      .then(data => {
      setInstitution(data.result.name)
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/formation');
        const data = await response.json();
        setFormation(data.result);
		getInstitution(data.result[0].institution_id)
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
			<h4 className="text-center text-secondary mb-4">Sua formação acadêmica</h4>
			<form>
				<div className="form-group">
				<button className="btn btn-secondary btn-lg">
					<img src="plus.png" alt="plus" width="25" />
				</button>
				<button className="btn btn-secondary btn-lg">
					<img src="edit.png" alt="edit" width="25" />
				</button>
				</div>

				{formation.map((item) => (
					<div className="card">
						<div className="card-header">
							{institution}
						</div>
						<div className="card-body">
							<blockquote className="blockquote mb-0">
							<p>{item.course}</p>
							<footer className="blockquote-footer">{item.date}</footer>
							</blockquote>
						</div>
					</div>
				))}

				

				<div className="justify-content-end row">
				<div className="text-center p-3">
					<button type="button" className="btn btn-outline-secondary btn-lg" onClick={navigateToPerfil}>Pular</button>
					<button type="button" className="btn btn-secondary btn-lg" onClick={navigateToExperienceForm}>Continuar</button>
				</div>
				</div>
			</form>
			</div>
		  </div>'
    	</div>
    </div>
  );
}

export default FormationForm;