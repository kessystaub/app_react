import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Menu from './Menu';

function Search() {
  const [joboffers, setJoboffers] = useState([]);
  const [busca, setBusca] = useState('');

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

      <table className="table m-3">
        <thead>
          <tr>
            <th scope="col">Código da vaga</th>
            <th scope="col">Nome da vaga</th>
            <th scope="col">Empresa</th>
            <th scope="col">Cidade</th>
			      <th />
          </tr>
        </thead>
        <tbody>
          {joboffersFilter.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.code}</th>
                <td>{item.name}</td>
                <td>Samsung</td>
                <td>Itapema</td>
                <td>
                  <button className="btn btn-sm" onClick={() => navigateToVaga(item.id)}>Visualizar</button>
                </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Search;