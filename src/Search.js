import React from 'react';
import {useNavigate} from 'react-router-dom';
import Menu from './Menu';

function Search() {
  const navigate = useNavigate();

  const navigateToVaga = () => {
    navigate('/vaga');
  };

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
              <input className="form-control mr-sm-2" type="search"
                placeholder="Digite aqui" aria-label="Search" />
              <button className="btn btn-outline-primary my-2 my-sm-0"
                type="submit">Pesquisar</button>

              <div className="dropdown m-2">
                <button className="btn btn-secondary dropdown-toggle" type="button"
                  id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false">
                  Filtros
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button className="dropdown-item" type="button">C++</button>
                  <button className="dropdown-item" type="button">Python</button>
                  <button className="dropdown-item" type="button">Javascript</button>
                </div>
              </div>
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
          <tr>
            <th scope="row">1</th>
            <td>Cientista de dados - Júnior - Remoto</td>
            <td>Samsung</td>
            <td>Itapema</td>
			<td>
				<button className="btn btn-sm" onClick={navigateToVaga}>Visualizar</button>
			</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Full Stack Jr. (Remoto ou Presencial)</td>
            <td>Thornton</td>
            <td>São Paulo</td>
			<td>
				<button className="btn btn-sm" onClick={navigateToVaga}>Visualizar</button>
			</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Pessoa Desenvolvedora Full Stack - Sênior</td>
            <td>asnd</td>
            <td>Tijucas</td>
			<td>
				<button className="btn btn-sm" onClick={navigateToVaga}>Visualizar</button>
			</td>
          </tr>
        </tbody>
      </table>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabindex="-1">Previous</a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
    </div>
  );
}

export default Search;