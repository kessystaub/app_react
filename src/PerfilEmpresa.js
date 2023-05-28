import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import MenuCompany from './MenuCompany';

function PerfilEmpresa() {
  const [id, setId] = useState('');
  const [company, setCompany] = useState([]);
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
    setCompany(company)
  }, [setCompany]);

  return (
    <div>
      <MenuCompany />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img src="https://via.placeholder.com/150" className="card-img-top"
                alt="..." />
              <div className="card-body">
                <h5 className="card-title">{company.name}</h5>
                <p className="card-text">Software Developer</p>
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
                          placeholder={company.name} onChange={(event) => setFormNome(event.target.value)} disabled={disabled} />
                      </td>
                      <td>
                      <button className="btn my-2 my-sm-0"
                        type="button" onClick={() => {
                          setMostraBotao(true)
                          setDisabled(false)
                        }}>Editar</button>
                      </td>
                      <td>
                        {mostraBotao && (
                          <button className="btn my-2 my-sm-0"
                          type="button" onClick={() => {
                            setMostraBotao(false)
                            setDisabled(true)
                          }}>Salvar</button>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label htmlFor="form">Email</label>
                      </th>
                      <td>
                        <input type="text" className="form-control" id="form"
                          placeholder={company.email} onChange={(event) => setFormEmail(event.target.value)} disabled={disabled} />
                      </td>
                      <td>
                      <button className="btn my-2 my-sm-0"
                        type="button" onClick={() => {
                          setMostraBotao(true)
                          setDisabled(false)
                        }}>Editar</button>
                      </td>
                      <td>
                        {mostraBotao && (
                          <button className="btn my-2 my-sm-0"
                          type="button" onClick={() => {
                            setMostraBotao(false)
                            setDisabled(true)
                          }}>Salvar</button>
                        )}
                      </td>
                      
                    </tr>
                    <tr>
                      <th scope="row">
                        <label htmlFor="form">Telefone</label>
                      </th>
                      <td>
                        <input type="text" className="form-control" id="form"
                          placeholder={company.phone} onChange={(event) => setFormPhone(event.target.value)} disabled={disabled} />
                      </td>
                      <td>
                      <button className="btn my-2 my-sm-0"
                        type="button" onClick={() => {
                          setMostraBotao(true)
                          setDisabled(false)
                        }}>Editar</button>
                      </td>
                      <td>
                        {mostraBotao && (
                          <button className="btn my-2 my-sm-0"
                          type="button" onClick={() => {
                            setMostraBotao(false)
                            setDisabled(true)
                          }}>Salvar</button>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label htmlFor="form">Endereço</label>
                      </th>
                      <td>
                        <input type="text" className="form-control" id="form" onChange={(event) => setFormAddress(event.target.value)}
                          placeholder={company.address} disabled={disabled} />
                      </td>
                      <td>
                      <button className="btn my-2 my-sm-0"
                        type="button" onClick={() => {
                          setMostraBotao(true)
                          setDisabled(false)
                        }}>Editar</button>
                      </td>
                      <td>
                        {mostraBotao && (
                          <button className="btn my-2 my-sm-0"
                          type="button" onClick={() => {
                            setMostraBotao(false)
                            setDisabled(true)
                          }}>Salvar</button>
                        )}
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title">Sobre</h5>
                <p>{company.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilEmpresa;