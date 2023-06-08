import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import MenuCompany from './MenuCompany';

function RegisterVaga() {
  const [nome, setNome] = useState('');
  const [city, setCity] = useState('');
  const [cityId, setCityId] = useState('');
  const [position, setPosition] = useState('');
  const [positionId, setPositionId] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState([]);

  const navigate = useNavigate();

  const navigateToVagas = () => {
    navigate('/vagas');
  };

  function getCityByName(city_name) {
      fetch(`http://localhost:8000/city/getCityByName/${city_name}`)
      .then(response => response.json())
      .then(data => {
        console.log('data.result.id', data.result.id)
        setCityId(data.result.id)
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  }

  function getPositionByName(position_name) {
    console.log(position_name)
    fetch(`http://localhost:8000/position/getPositionByName/${position_name}`)
    .then(response => response.json())
    .then(data => {
      console.log('data.result.id', data.result.id)
      setPositionId(data.result.id)
  })
  .catch(error => {
    console.error('Erro:', error);
  });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const create = {
      "parameter": {
        "code": code,
        "name": nome,
        "description": description,
        "city_id": cityId,
        "company_id": company.id,
        "position_id": positionId
      }
    }

    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(create),
      };

    fetch('http://localhost:8000/joboffer', options)
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
         }
         return data.json();
        }).then(create => {
          console.log(create)
          localStorage.setItem("user-info", JSON.stringify(create))
          navigateToVagas()
        console.log(create);
        }).catch(e => {
        console.log(e);
        });
  };

  useEffect(() => {
    const storedValue = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : [];
    const company = storedValue.company;
    setCompany(company)
  }, [setCompany]);


  return (
    <>
      <MenuCompany/>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 row justify-content-center align-items-center mt-5">
            <img src="logo.png" alt="Logo" className='w-75'/>
            <h4 className="text-center text-secondary mb-4">Crie sua vaga</h4>
            <form onSubmit={handleSubmit}>
              {/* <div className="form-group">
                <label htmlFor="code">Codigo da vaga:</label>
                <input type="text" className="form-control" id="code" name="code" value={code}
                  placeholder="Digite o codigo da vaga" onChange={(event) => setCode(event.target.value)} required />
              </div> */}

              <div className="form-group">
                <label htmlFor="name">Nome da vaga:</label>
                <input type="text" className="form-control" id="name" name="name" value={nome}
                  placeholder="Digite o nome" onChange={(event) => setNome(event.target.value)} required />
              </div>

              <div className="form-group">
                <label htmlFor="description">Descrição da vaga:</label>
                <textarea type="text" className="form-control" id="description" rows='5' name="description" value={description}
                  placeholder="Digite a descrição" onChange={(event) => setDescription(event.target.value)} required />
              </div>

              <div className="form-group">
                <label htmlFor="position">Cargo:</label>
                <select className="form-control" id="position" name="position" value={position}
                  onChange={(event) => {
                    setPosition(event.target.value)
                    getPositionByName(event.target.value)
                    }} required>
                  <option value="">Selecione...</option>
                  <option value="Programador">Programador</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="city">Cidade:</label>
                <select className="form-control" id="city" name="city" value={city}
                  onChange={(event) => {
                    setCity(event.target.value)
                    getCityByName(event.target.value)
                    }} required>
                  <option value="">Selecione...</option>
                  <option value="TIJUCAS">Tijucas</option>
                  <option value="ITAPEMA">Itapema</option>
                  <option value="PORTO BELO">Porto Belo</option>
                </select>
              </div>

              <div className="text-center p-3">
                <button type="submit" className="btn btn-secondary btn-lg" onClick={handleSubmit}>Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterVaga;