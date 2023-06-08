import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import { useNavigate } from 'react-router-dom';
import Progress from './Progress';
import CustomProgressBar from './Progress';

function Candidaturas() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [user, setUser] = useState();

  function navigateToVaga(vaga_id) {
    localStorage.setItem("vaga_id", vaga_id)
    navigate(`/vaga`);
  };

  const navigateToVagas = () => {
    navigate('/search');
  };

  useEffect(() => {
    const storedValue = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : [];
    const user = storedValue.user;
    setUser(user)

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/get_candidaturas_do_usuario/${user.id}`);
        const data = await response.json();
        setApplications(data.result)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    fetchData();
  }, [setUser]);


  return (
    <div>
      <Menu/>

        <div className="container mt-5">
        <div className="row justify-content-center">
        <div className="col-md-6 row justify-content-center align-items-center mt-5">
            <img src="logo.png" alt="Logo" className='w-75' />
            <h4 className="text-center text-secondary mb-4">Candidaturas</h4>
          </div>
        </div>

        <div className="form-inline justify-content-center">

          <div className="row d-flex justify-content-center align-items-center">
            {applications.map((item) => (
              <div key={item.id} className="col-sm-3 m-3">
                <div className='card'>
                  <div className="card-body">
                    <div className="form-inline">
                      <h5 className="card-title">Vaga: {item.Joboffer.name}</h5>
                    </div>
                    <p className="card-text">Situação: Pendente</p>

                    <CustomProgressBar progress={10} />
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Descrição: {item.Joboffer.description}
                    </li>
                    <li className="list-group-item">Data da candidatura: {item.Application.date}</li>
                  </ul>
                  <div className="card-body">
                    {/* <button className="btn" onClick={() => navigateToVaga(item.Joboffer.id)}>Descrição</button> */}
                    <button className="btn btn-secondary my-2 my-sm-0 m-3" onClick={navigateToVagas}>Outras
                      vagas</button>
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

export default Candidaturas;