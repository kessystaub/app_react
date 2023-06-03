import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import MenuCompany from './MenuCompany';
import UsuarioImagem from './images/user (2).png';

function PerfilEmpresa() {
  const [id, setId] = useState('');
  const [company, setCompany] = useState({ City: { name: '' } ,  Company: {name: '', address : '', cnpj: '', email: '', phone_number: '', description: ''}});
  const [nome, setNome] = useState('');
  const [formNome, setFormNome] = useState('');
  const [email, setEmail] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [city, setCity] = useState('');
  const [disabled, setDisabled] = useState(true)
  const [mostraBotao, setMostraBotao] = useState(false)


  const navigate = useNavigate();

  const navigateToCurriculo = () => {
    navigate('/curriculo');
  };

  useEffect(() => {
    const storedValue = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : [];
    const company = storedValue.company;
    const id = company.id
    console.log(id)

    const fetchData = async () => {
      try {
          const response = await fetch(`http://localhost:8000/company/${id}`);
          const data = await response.json();
          console.log(data)
          setCompany(data.result)
      } catch (error) {
          console.error('Error fetching data:', error);
      }
      };
  
      fetchData();
  }, [setCompany]);

  return (
    <div>
      <MenuCompany />

      <div className="container mt-5">
        <div className='d-flex justify-content-center align-items-center'>    
          <div className="card mt-4 w-75 border-0">
            <div className="row">
              <div className="col-md-4">
                <div className="card border-0">
                  <img src={UsuarioImagem} className="card-img-top w-50 mt-5"
                              alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{company.Company.name}</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Informações pessoais</h5>
                    <table className="table">
                      <tbody>
                        <tr>
                          <th scope="row">
                            <label htmlFor="form">Nome</label>
                          </th>
                          <td>
                            <input type="text" className="form-control" id="form"
                              placeholder={company.Company.name} onChange={(event) => setFormNome(event.target.value)} disabled={disabled} />
                          </td>
                          <td>
                          <button className="btn my-2 my-sm-0"
                            type="button" onClick={() => {
                              setMostraBotao(true)
                              setDisabled(false)
                            }}>Editar</button>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <label htmlFor="form">CNPJ: </label>
                          </th>
                        <td>
                          <input type="text" className="form-control" id="form"
                              placeholder={company.Company.cnpj} disabled={disabled} />
                          </td>
                          <td>
                          <button className="btn my-2 my-sm-0"
                            type="button" onClick={() => {
                              setMostraBotao(true)
                              setDisabled(false)
                            }}>Editar</button>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <label htmlFor="form">Email</label>
                          </th>
                          <td>
                            <input type="text" className="form-control" id="form"
                              placeholder={company.Company.email} onChange={(event) => setFormEmail(event.target.value)} disabled={disabled} />
                          </td>
                          <td>
                          <button className="btn my-2 my-sm-0"
                            type="button" onClick={() => {
                              setMostraBotao(true)
                              setDisabled(false)
                            }}>Editar</button>
                          </td>
                          
                        </tr>
                        <tr>
                          <th scope="row">
                            <label htmlFor="form">Telefone</label>
                          </th>
                          <td>
                            <input type="text" className="form-control" id="form"
                              placeholder={company.Company.phone_number} onChange={(event) => setFormPhone(event.target.value)} disabled={disabled} />
                          </td>
                          <td>
                          <button className="btn my-2 my-sm-0"
                            type="button" onClick={() => {
                              setMostraBotao(true)
                              setDisabled(false)
                            }}>Editar</button>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <label htmlFor="form">Endereço</label>
                          </th>
                          <td>
                            <input type="text" className="form-control" id="form" onChange={(event) => setFormAddress(event.target.value)}
                              placeholder={company.Company.address}disabled={disabled} />
                          </td>
                          <td>
                          <button className="btn my-2 my-sm-0"
                            type="button" onClick={() => {
                              setMostraBotao(true)
                              setDisabled(false)
                            }}>Editar</button>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card mt-4">
                  <div className="card-body">
                    <h5 className="card-title">Sobre</h5>
                    <p>{company.Company.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilEmpresa;