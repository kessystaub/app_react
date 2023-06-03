import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Menu from './Menu';

function Search() {
  const [joboffers, setJoboffers] = useState([]);
  const [busca, setBusca] = useState('');
  const [user, setUser] = useState();

  const navigate = useNavigate();

  function navigateToVaga(vaga_id) {
    localStorage.setItem("vaga_id", vaga_id)
    navigate(`/vaga`);
  };

  const joboffersFilter = joboffers.filter(item => item.Joboffer.name.toLocaleLowerCase().includes(busca.toLocaleLowerCase()));

  useEffect(() => {
    const storedValue = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : [];
    const user = storedValue.user;
    setUser(user)

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/joboffer/get_vagas');
        const data = await response.json();
        setJoboffers(data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once

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

        <div className="row d-flex justify-content-center align-items-center">
          {joboffersFilter.map((item) => (
              <div key={item.id} className="col-sm-3">
                {/* style={{ width: '200px', height: '200px'}} */}
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Vaga: {item.Joboffer.name}</h5>
                    <p className="card-text">Código da vaga: {item.Joboffer.code}</p>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Descrição da vaga: {item.Joboffer.description}</li>
                      <li className="list-group-item">Empresa: {item.Company.name}</li>
                      <li className="list-group-item">Cidade: {item.City.name}</li>
                      <li className="list-group-item">Cargo: {item.Position.name}</li>
                    </ul>

                    <button className="btn btn-secondary btn-sm mt-3" onClick={() => navigateToVaga(item.Joboffer.id)}>Visualizar</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
  );
}

export default Search;