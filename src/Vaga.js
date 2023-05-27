import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import { useNavigate } from 'react-router-dom';

function Vaga() {
  const [nome, setNome] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const navigateToSearch = () => {
    navigate('/search');
  };

  useEffect(() => {
    const storedValue = localStorage.getItem('vaga_id') ? localStorage.getItem('vaga_id') : '';
    const id = storedValue

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/joboffer/${id}`);
        const data = await response.json();
        setNome(data.result.name)
        setCode(data.result.code)
        setDescription(data.result.description)
        console.log(data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
  }, []);

  return (
    <div>
      <Menu/>

      <div className="card text-center">
        <div className="card-header">
          Vaga
        </div>
        <div className="card-body">
          <h5 className="card-title">{nome}</h5>
          <p>
              Código: {code}
          </p>
          <p>
              Local:  Florianópolis, Santa Catarina, Brasil Remoto
          </p>
          <p className="card-text">{description}</p>
        <button type="button" className="btn btn-outline-primary m-3" onClick={navigateToSearch}>Voltar</button>
        <button href="#" className="btn btn-primary">Aplicar</button>
        </div>
        <div className="card-footer text-muted">
          há 2 dias
        </div>
      </div>
    </div>
  );
}

export default Vaga;