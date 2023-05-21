import React from 'react';
import {useNavigate} from 'react-router-dom';

function FormationForm() {
  const navigate = useNavigate();

  const navigateToPerfil = () => {
    navigate('/perfil');
  };

  const navigateToExperienceForm = () => {
    navigate('/experienceForm');
  };

  return (
    <div>
      <div className="container mt-5">
      	<div className="row justify-content-center">
		  <div className="col-md-6">
			<img src="logo.png" alt="Logo" />
			<h4 className="text-center text-secondary mb-4">Sua formação acadêmica</h4>
			<form>
				<div className="form-group">
				<button className="btn btn-secondary btn-lg"><img src="plus.png"
					width="25" /></button>
				<button className="btn btn-secondary btn-lg"><img src="edit.png"
					width="25" /></button>
				</div>

				<div className="card">
				<div className="card-header">
					Universidade do Vale do Itajaí
				</div>
				<div className="card-body">
					<blockquote className="blockquote mb-0">
					<p>Bacharelado, Ciência da Computação</p>
					<footer className="blockquote-footer">2019-2023</footer>
					</blockquote>
				</div>
				</div>

				<div className="justify-content-end row">
				<div className="text-center p-3">
					<button type="button" className="btn btn-outline-secondary btn-lg" onClick={navigateToPerfil}>Pular</button>
				</div>

				<div className="text-center p-3">
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