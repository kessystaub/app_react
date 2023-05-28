import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Menu from './Menu';

function Search() {
  const [joboffers, setJoboffers] = useState([]);
  const [busca, setBusca] = useState('');
  const [nameCom, setNameCom] = useState('');
  const [nameCity, setNameCity] = useState('');
  const [nameCargo, setNameCargo] = useState('');

  const navigate = useNavigate();

  function navigateToVaga(vaga_id) {
    localStorage.setItem("vaga_id", vaga_id)
    navigate(`/vaga`);
  };

  const joboffersFilter = joboffers.filter(item => item.name.toLocaleLowerCase().includes(busca.toLocaleLowerCase()));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/joboffer');
        const data = await response.json();
        setJoboffers(data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once

  function returnCompanyName(company_id) {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/company/${company_id}`);
        const data = await response.json();
        setNameCom(data.result.name)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    fetchData();
    return nameCom
  }

  function returnCityName(city_id) {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/city/${city_id}`);
        const data = await response.json();
        setNameCity(data.result.name)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    fetchData();
    return nameCity
  }

  function returnCargoName(cargo_id) {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/position/${cargo_id}`);
        const data = await response.json();
        setNameCargo(data.result.name)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    fetchData();
    return nameCargo
  }

  return (
	<div>
	  <Menu />
      
	  <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <img src="logo.png" alt="Logo" />
          <h4 className="text-center text-secondary mb-4">Pesquise as vagas de seu
            interesse</h4>

          <form>
            <div className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2 m-3" type="search" value={busca}
                placeholder="Digite aqui" onChange={(event) => setBusca(event.target.value)} aria-label="Search" />
            </div>
          </form>
        </div>
      </div>

      {joboffersFilter.map((item) => (
        <div key={item.id} className="card-deck m-2">
          <div className="card">
              <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Código da vaga: {item.code}</p>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">Empresa: {returnCompanyName(item.company_id)}</p>
                  {/* <p className="card-text">Cidade: {returnCityName(item.city_id)}</p> */}
                  {/* <p className="card-text">Cargo: {returnCargoName(item.position_id)}</p> */}
                  <button className="btn btn-sm" onClick={() => navigateToVaga(item.id)}>Visualizar</button>
                  <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default Search;