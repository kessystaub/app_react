import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import MenuCompany from './MenuCompany';

function Vagas() {
  const [vagas, setVagas] = useState([]);
  const [nome, setNome] = useState('');
  const [city, setCity] = useState('');
  const [cityId, setCityId] = useState('');
  const [position, setPosition] = useState('');
  const [positionId, setPositionId] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState({});

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

  useEffect(() => {
    const storedValue = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : [];
    const company = storedValue.company;
    setCompany(company)

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/joboffer/get_company_vagas/${company.id}`);
            const data = await response.json();
            setVagas(data.result)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
    
        fetchData();
  }, [setCompany]);


  return (
    <>
      <MenuCompany/>

      <div className="container mt-5">
        <div className="row justify-content-center">
                <div className="col-md-6">
                    <h4 className="text-center text-secondary mb-4">Suas vagas de emprego</h4>
                </div>
        </div>

        <div className="form-inline justify-content-center">
          <div className="row d-flex justify-content-center align-items-center">
            {vagas.map((item) => (
              <div key={item.id} className="col-sm-3 m-1">
                <div className='card'>
                  <div className="card-body">
                    <div className="form-inline">
                      <h5 className="card-title">Vaga: {item.Joboffer.name}</h5>
                    </div>
                    <p className="card-text">Código: {item.Joboffer.code}</p>
                    <p className="card-text">Descrição: {item.Joboffer.description}</p>
                    <p className="card-text">Cargo: {item.Position.name}</p>
                    <p className="card-text">Cidade: {item.City.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Vagas;