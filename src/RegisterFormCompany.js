import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function RegisterFormCompany() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [cityId, setCityId] = useState('');
  const [state, setState] = useState('');
  const [addressNeighborhood, setAddressNeighborhood] = useState('');
  const [addressComplement, setAddressComplement] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [description, setDescription] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cities, setCities] = useState([]);


  const navigate = useNavigate();

  const navigateToLoginCompany = () => {
    navigate('/loginempresa');
  };

  const navigateToTalentos = () => {
    navigate('/talentos');
  };

  function getCityByName(city_name) {
      fetch(`https://projeto_1-1-h0551544.deta.app/city/getCityByName/${city_name}`)
      .then(response => response.json())
      .then(data => {
        console.log('data.result.id', data.result.id)
        setCityId(data.result.id)
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const create = {
        "parameter": {
          "name": nome,
          "description": description,
          "cnpj": cnpj,
          "password": password,
          "email": email,
          "phone_number": phone,
          "address_number": addressNumber,
          "address_neighborhood": addressNeighborhood,
          "address": address,
          "address_complement": addressComplement,
          "city_id": cityId
        }
      };

    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(create),
      };

    fetch('https://projeto_1-1-h0551544.deta.app/company', options)
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
         }
         return data.json();
        }).then(create => {
          console.log(create)
          localStorage.setItem("user-info", JSON.stringify(create))
          navigateToLoginCompany()
        console.log(create);
        }).catch(e => {
        console.log(e);
        });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://projeto_1-1-h0551544.deta.app/city`);
        const data = await response.json();
        setCities(data.result)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 row justify-content-center align-items-center mt-5">
          <img src="logo.png" alt="Logo" className='w-75'/>
          <h4 className="text-center text-secondary mb-4">Crie sua conta Match Code</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome da empresa:</label>
							<input type="text" className="form-control" id="name" name="name" value={nome}
								placeholder="Digite o nome da empresa" onChange={(event) => setNome(event.target.value)} required />
            </div>
            <div className="form-group p-1">
							<label htmlFor="cnpj">CNPJ:</label>
							<input type="text" className="form-control" id="cnpj" name="cnpj"
								placeholder="Digite o CNPJ" value={cnpj}
                onChange={(event) => setCnpj(event.target.value)} required />
						</div>

            <div className="form-group p-1">
							<label htmlFor="description">Descrição:</label>
							<textarea type="text" className="form-control" id="description" name="description"
								placeholder="Digite a descrição da sua empresa" value={description}
                onChange={(event) => setDescription(event.target.value)} required />
						</div>
            <div className="form-group p-1">
							<label htmlFor="email">Email:</label>
							<input type="email" className="form-control" id="email" name="email"
								value={email}
                onChange={(event) => setEmail(event.target.value)} placeholder="Digite o e-mail" required />
						</div>
            <div className="form-group p-1">
							<label htmlFor="email-confirmation">Confirme o Email:</label>
							<input type="email" className="form-control" id="email-confirmation"
								name="email-confirmation" placeholder="Confirme o e-mail" required />
						</div>

						<div className="form-group p-1">
							<label htmlFor="password">Senha:</label>
							<input type="password" className="form-control" id="password" name="password"
								placeholder="Digite a senha" value={password}
                onChange={(event) => setPassword(event.target.value)} required />
						</div>

						<div className="form-group p-1">
							<label htmlFor="password-confirmation">Confirme a Senha:</label>
							<input type="password" className="form-control" id="password-confirmation"
								name="password-confirmation" placeholder="Confirme a senha" required />
						</div>

						<div className="form-group p-1">
							<label htmlFor="phone">Telefone:</label>
							<input type="text" className="form-control" id="phone" name="phone"
								placeholder="Digite o número de telefone" value={phone}
                onChange={(event) => setPhone(event.target.value)} required />
						</div>

						<div className="form-group p-1">
							<label htmlFor="address">Endereço:</label>
							<input type="text" className="form-control" id="address" name="address"
								placeholder="Digite o endereço" value={address}
                onChange={(event) => setAddress(event.target.value)} required />
						</div>

            <div className="form-group p-1">
							<label htmlFor="address">Bairro:</label>
							<input type="text" className="form-control" id="address_neighborhood" name="address_neighborhood"
								placeholder="Digite o bairro" value={addressNeighborhood}
                onChange={(event) => setAddressNeighborhood(event.target.value)} required />
						</div>

            <div className="form-group p-1">
							<label htmlFor="address">Número de endereço:</label>
							<input type="text" className="form-control" id="address_number" name="address_number"
								placeholder="Digite o número de endereço" value={addressNumber}
                onChange={(event) => setAddressNumber(event.target.value)} required />
						</div>

            <div className="form-group p-1">
							<label htmlFor="address">Complemento:</label>
							<input type="text" className="form-control" id="address_complement" name="address_complement"
								placeholder="Digite o complemento" value={addressComplement}
                onChange={(event) => setAddressComplement(event.target.value)} required />
						</div>

            <div className="form-group p-1">
							<label htmlFor="city">Cidade:</label>
              <select className="form-control" id="city" name="city"
                  onChange={(event) => setCityId(event.target.value)} required>
                  <option value="">Selecione...</option>
                    {cities.map((item) => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
						</div>
          
						<div className="text-center p-3">
							<button type="submit" className="btn btn-secondary btn-lg" onClick={handleSubmit}>Enviar</button>
						</div>

						<div>
							<span>Já tem uma conta?</span>
							<button className="btn btn-sm" onClick={navigateToLoginCompany}>Entrar</button>
						</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterFormCompany;