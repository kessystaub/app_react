import React from 'react';
import {useNavigate} from 'react-router-dom';

function TecnicalskillForm() {
  const navigate = useNavigate();

  const navigateToPerfil = () => {
    navigate('/perfil');
  };

  const navigateToFormation = () => {
    navigate('/formationForm');
  };

  return (
    <div>
      <div className="container mt-5">
		<div className="row justify-content-center">
			<div className="col-md-6">
			<img src="logo.png" alt="Logo" />
			<h4 className="text-center text-secondary mb-4">Suas habilidades técnicas</h4>
			<form>
				<div className="form-group">
				<button className="btn btn-secondary btn-lg">
					<img src="plus.png" width="25" />
				</button>
				<button className="btn btn-secondary btn-lg">
					<img src="edit.png" width="25" />
				</button>
				</div>

				<div className="card">
				<div className="card-header">
					Linguagens
				</div>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">Python</li>
					<li className="list-group-item">C++</li>
					<li className="list-group-item">Typescript</li>
				</ul>
				</div>

				<div className="justify-content-end row">
				<div className="text-center p-3">
					<button type="button" className="btn btn-outline-secondary btn-lg" onClick={navigateToPerfil}>Pular</button>
				</div>

				<div className="text-center p-3">
					<button type="button" className="btn btn-secondary btn-lg" onClick={navigateToFormation}>Continuar</button>
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