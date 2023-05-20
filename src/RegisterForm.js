import React, { useState } from 'react';

function RegisterForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('senha:', password);
    console.log('telefone', phone);
    console.log('endereço:', address);
    console.log('cidade:', city);
    console.log('estado:', state);

    const create = {
      "parameter": {
            "name": nome,
            "password": password,
            "email": email,
            "phone": phone,
            "address_number": "88",
            "address_neighborhood": "meia praia",
            "address": address,
            "address_complement": "502",
            "city_id": 1,
            "formation_id": 1,
            "experience_id": 2
          }
      };

    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(create),
      };

    fetch('http://localhost:8000/user', options)
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

  return (
    <div className="container">
      <div className="row justify-content-center">
				<div className="col-md-6">
          <img src="logo.png" alt="Logo" />
          <h4 className="text-center text-secondary mb-4">Crie sua conta Match Code</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome Completo:</label>
							<input type="text" className="form-control" id="name" name="name" value={nome}
								placeholder="Digite seu nome completo" onChange={(event) => setNome(event.target.value)} required />
            </div>
            <div className="form-group">
							<label htmlFor="email">Email:</label>
							<input type="email" className="form-control" id="email" name="email"
								value={email}
                onChange={(event) => setEmail(event.target.value)} placeholder="Digite seu e-mail" required />
						</div>
            <div className="form-group">
							<label htmlFor="email-confirmation">Confirme o Email:</label>
							<input type="email" className="form-control" id="email-confirmation"
								name="email-confirmation" placeholder="Confirme seu e-mail" required />
						</div>

						<div className="form-group">
							<label htmlFor="password">Senha:</label>
							<input type="password" className="form-control" id="password" name="password"
								placeholder="Digite sua senha" value={password}
                onChange={(event) => setPassword(event.target.value)} required />
						</div>

						<div className="form-group">
							<label htmlFor="password-confirmation">Confirme a Senha:</label>
							<input type="password" className="form-control" id="password-confirmation"
								name="password-confirmation" placeholder="Confirme sua senha" required />
						</div>

						<div className="form-group">
							<label htmlFor="phone">Telefone:</label>
							<input type="text" className="form-control" id="phone" name="phone"
								placeholder="Digite seu número de telefone" value={phone}
                onChange={(event) => setPhone(event.target.value)} required />
						</div>

						<div className="form-group">
							<label htmlFor="address">Endereço:</label>
							<input type="text" className="form-control" id="address" name="address"
								placeholder="Digite seu endereço" value={address}
                onChange={(event) => setAddress(event.target.value)} required />
						</div>

						<div className="form-group">
							<label htmlFor="city">Cidade:</label>
							<input type="text" className="form-control" id="city" name="city"
								placeholder="Digite sua cidade" value={city}
                onChange={(event) => setCity(event.target.value)} required />
						</div>

						<div className="form-group">
							<label htmlFor="state">Estado:</label>
							<select className="form-control" id="state" name="state" value={state}
                onChange={(event) => setState(event.target.value)} required>
								<option value="">Selecione...</option>
								<option value="SP">São Paulo</option>
							</select>
						</div>

						<div className="text-center p-3">
							<button type="submit" className="btn btn-secondary btn-lg">Enviar</button>
						</div>

						<div>
							<span>Já tem uma conta?</span>
							<a href="http://127.0.0.1:5500/LoginForm/index.html">Entrar</a>
						</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;