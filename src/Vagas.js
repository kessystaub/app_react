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
        {console.log(vagas)}

        {vagas.map((item) => (
            <div key={item.id} className="card-deck m-2">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{item.Joboffer.name}</h5>
                        <p className="card-text">{item.Joboffer.code}</p>
                        <p className="card-text">{item.Joboffer.description}</p>
                        <p className="card-text">{item.Position.name}</p>
                        <p className="card-text">{item.City.name}</p>
                        {/* <p className="card-text">{item.Application}</p> */}
                    </div>
                </div>
            </div>
        ))}
      </div>
    </>
  );
}

export default Vagas;