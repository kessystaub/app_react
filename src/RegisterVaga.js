import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuCompany from './MenuCompany';

function RegisterVaga() {
  const [nome, setNome] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [cityId, setCityId] = useState('');
  const [cities, setCities] = useState([]);
  const [cargo, setCargo] = useState('');

  const navigate = useNavigate();

  const navigateToVagas = () => {
    navigate('/vagas');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const create = {
      "parameter": {
        "name": nome,
        "description": description,
        "city_id": cityId,
        "company_id": company.id,
        "position_id": cargo
      }
    }

    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(create),
      };

    fetch('https://projeto_1-4-h0551544.deta.app/joboffer', options)
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
         }
         return data.json();
        }).then(create => {
          console.log(create)
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

    const fetchData = async () => {
      try {
        const response4 = await fetch(`https://projeto_1-4-h0551544.deta.app/position`);
        const data4 = await response4.json();
        setCargos(data4.result)

        const response = await fetch(`https://projeto_1-4-h0551544.deta.app/city`);
        const data = await response.json();
        setCities(data.result)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
                  <select className="form-control" id="softskill" name="softskill" value={cargo}
                    onChange={(event) => { setCargo(event.target.value)}} required>
                    <option value="">Selecione...</option>
                    {cargos.map((item) => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
              </div>

              <div className="form-group">
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterVaga;