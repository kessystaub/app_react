import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

  const navigate = useNavigate();


  const navigateToCadastroEmpresa = () => {
    navigate('/cadastroempresa');
  };

  const navigateToCadastro = () => {
    navigate('/cadastro');
  };
  
  const navigateToTalentos = () => {
    navigate('/talentos');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

	let item = {email, password}
    fetch(`http://localhost:8000/company/loginempresa?username=${email}&password=${password}`, {
		method: 'POST',
		headers: {
			"Content-Type":"application/json",
			"Accept":"application/json"
		},
		body: JSON.stringify(item)
	})
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
         }
         return data.json();
        }).then(login => {
			localStorage.setItem("user-info", JSON.stringify(login))
            console.log(login)
            navigateToTalentos()
        console.log(login);
        }).catch(e => {
        console.log(e);
        });
  };

  return (
    <div>
      <div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6 row justify-content-center align-items-center mt-5">
					<img src="logo.png" alt="Logo" className='w-75'/>
					<h4 className="text-center text-secondary mb-4 mt-3">Acesse sua conta empresarial Match Code</h4>
					<form>
						<div className="form-group">
							<label htmlFor="email">Email:</label>
							<input type="email" className="form-control" id="email" name="email"
								onChange={(event) => setEmail(event.target.value)} placeholder="Digite o seu e-mail" required />
						</div>

						<div className="form-group">
							<label htmlFor="password">Senha:</label>
							<input type="password" className="form-control" id="password" name="password"
								onChange={(event) => setPassword(event.target.value)} placeholder="Digite a sua senha" required />
						</div>

						{/* <div>
							<a href="">Esqueci minha senha</a>
						</div> */}

						<div className="text-center p-3">
							<button className="btn btn-secondary btn-lg" onClick={handleSubmit}>Entrar</button>
						</div>

						<div>
							<span>Ainda não tem conta?</span>
							  <button className="btn btn-sm" onClick={navigateToCadastroEmpresa}>Criar conta</button>
						</div>

                        <div>
                            <span>Procurando emprego?</span>
							<button className="btn btn-sm" type="button" onClick={navigateToCadastro}>Cadastre-se</button>
						</div>
					</form>
				</div>
			</div>
		  </div>
    </div>
  );
}

export default Login;