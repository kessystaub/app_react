import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

function Vaga() {
  const [user, setUser] = useState({});
  const [joboffer, setJoboffer] = useState({ Joboffer: { name: '', code: '', description: '' } , City: { name: '' } ,  Company: {name: ''}});

  const navigate = useNavigate();

  const navigateToSearch = () => {
    navigate('/search');
  };

  const getCurrentDate = () => {
    const currentDate = moment().format('YYYY-MM-DD');
    return currentDate;
  };

  async function addApplication() {
		const create = {
      "parameter": {
        "date": getCurrentDate(),
        "status_id": 1,
        "joboffer_id": joboffer.Joboffer.id,
        "user_id": user.id
      }
    }

    console.log(create)

		const options = {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(create),
			};

		fetch(`http://localhost:8000/application`, options)
		.then(data => {
			if (!data.ok) {
				throw Error(data.status);
				}
				return data.json();
			}).then(create => {
			console.log(create);
			}).catch(e => {
			console.log(e);
			});

	};

  useEffect(() => {
    const storedValue = localStorage.getItem('vaga_id') ? localStorage.getItem('vaga_id') : {};
    const id = storedValue

    const storedValue2 = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : [];
    const user = storedValue2.user;
    setUser(user)

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/joboffer/${id}`);
        const data = await response.json();
        setJoboffer(data.result)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
  }, [setJoboffer]);

  return (
    <div>
      <Menu/>

      <div className="card text-center">
        <div className="card-header">
          Vaga
        </div>
        <div className="card-body">
          <h5 className="card-title">{joboffer.Joboffer.name}</h5>
          <p>
              Código: {joboffer.Joboffer.code}
          </p>
          <p>
              Cidade: {joboffer.City.name}
          </p>
          <p>
              Empresa: {joboffer.Company.name}
          </p>
          <p className="card-text">{joboffer.Joboffer.description}</p>
        <button type="button" className="btn btn-outline-primary m-3" onClick={navigateToSearch}>Voltar</button>
        <button href="#" className="btn btn-primary" onClick={addApplication}>Aplicar</button>
        </div>
      </div>
    </div>
  );
}

export default Vaga;