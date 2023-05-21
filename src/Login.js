import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const navigateToPerfil = () => {
    navigate('/perfil');
  };

  const navigateToCadastro = () => {
    navigate('/cadastro');
  };

  return (
    <div>
      <div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<img src="logo.png" alt="Logo" />
					<h4 className="text-center text-secondary mb-4">Acesse sua conta Match Code</h4>
					<form>
						<div className="form-group">
							<label htmlFor="email">Email:</label>
							<input type="email" className="form-control" id="email" name="email"
								placeholder="Digite o seu e-mail" required />
						</div>

						<div className="form-group">
							<label htmlFor="password">Senha:</label>
							<input type="password" className="form-control" id="password" name="password"
								placeholder="Digite a sua senha" required />
						</div>

						<div>
							<a href="">Esqueci minha senha</a>
						</div>

						<div className="text-center p-3">
							<button type="submit" className="btn btn-secondary btn-lg" onClick={navigateToPerfil}>Entrar</button>
						</div>

						<div>
							<span>Ainda não tem conta?</span>
							  <button className="btn btn-sm" onClick={navigateToCadastro}>Criar conta</button>
						</div>
					</form>
				</div>
			</div>
		  </div>
    </div>
  );
}

export default Login;