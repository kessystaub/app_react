import React from 'react';
import {useNavigate} from 'react-router-dom';

function SoftskillForm() {
  const navigate = useNavigate();

  const navigateToPerfil = () => {
    navigate('/perfil');
  };

  const navigateToTecnicalskillForm = () => {
    navigate('/tecnicalskillForm');
  };

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
							<select className="form-control" id="softskill" name="softskill" required>
								<option value="">Selecione...</option>
								<option value="teamwork">Trabalho em equipe</option>
							</select>
						</div>

						<label htmlFor="name">Já possui uma carta de recomedação? Você pode anexá-la
							aqui</label>
						<div className="custom-file">
							<input type="file" className="custom-file-input" id="customFile" />
							<label className="custom-file-label" htmlFor="customFile">Anexar</label>
						</div>

						<div className="justify-content-end row">
							<div className="text-center p-3">
								<button type="button" className="btn btn-outline-secondary btn-lg"
									onClick={navigateToPerfil}>Pular</button>
							</div>

							<div className="text-center p-3">
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