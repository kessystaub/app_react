import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import MenuCompany from './MenuCompany';
import UsuarioImagem from './images/user.png';

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
  const [showUserForm, setShowUserForm] = useState(false);


  const navigate = useNavigate();

  const navigateToCurriculo = () => {
    navigate('/curriculo');
  };
  const handleInputChange = (e) => {
    const { name, address_number, value } = e.target;
    setCompany((prevUser) => ({ ...prevUser, [name]: value, [address_number]: value }));
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
                  <div className="card border-0 text-center">
                    <div className="card-body">
                      <img src={UsuarioImagem} className="card-img-top w-75 mb-5 mt-5" alt="User" />
                      <h5 className="card-title">{company.Company.name}</h5>
                    </div>
                  </div>
              </div>
              <div className="col-md-8">
                  <div className="card border-0">
                    <div className="card-body">
                      <h5 className="card-title mb-4">Informações pessoais</h5>
                      {!showUserForm && (
                        <table className="table">
                          <tbody>
                            <tr>
                              <th className='text-secondary' scope="row">Nome</th>
                              <td>{company.Company.name}</td>
                            </tr>
                            <tr>
                              <th className='text-secondary' scope="row">Email</th>
                              <td>{company.Company.email}</td>
                            </tr>
                            <tr>
                              <th className='text-secondary' scope="row">CNPJ</th>
                              <td>{company.Company.cnpj}</td>
                            </tr>
                            <tr>
                              <th className='text-secondary' scope="row">Telefone</th>
                              <td>{company.Company.phone_number}</td>
                            </tr>
                            <tr>
                              <th className='text-secondary' scope="row">Endereço</th>
                              <td>{company.Company.address}</td>
                            </tr>
                            <tr>
                              <th className='text-secondary' scope="row">Número de endereço</th>
                              <td>{company.Company.address_number}</td>
                            </tr>
                            <tr>
                              <th className='text-secondary' scope="row">Bairro</th>
                              <td>{company.Company.address_neighborhood}</td>
                            </tr>
                            <tr>
                              <th className='text-secondary' scope="row">Complemento</th>
                              <td>{company.Company.address_complement}</td>
                            </tr>
                            {/* <tr>
                              <td colSpan="1">
                              </td>
                              <td colSpan="2">
                                <button className="btn btn-outline-secondary text-end" onClick={() => setShowUserForm(true)}>
                                  Editar perfil
                                </button>
                              </td>
                            </tr> */}
                          </tbody>
                        </table>
                      )}
                      <div className="card mt-4">
                        <div className="card-body">
                          <h5 className="card-title">Sobre</h5>
                          <p>{company.Company.description}</p>
                        </div>
                      </div>

                      {/* {showUserForm && (
                        <form>
                          <table className="table">
                            <tbody>
                              <tr>
                                <th className='text-secondary' scope="row">Nome</th>
                                <td>
                                  <input
                                    type="text"
                                    name="name"
                                    value={company.Company.name}
                                    onChange={handleInputChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th className='text-secondary' scope="row">Email</th>
                                <td>
                                  <input
                                    type="email"
                                    name="email"
                                    value={company.Company.email}
                                    onChange={handleInputChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th className='text-secondary' scope="row">Telefone</th>
                                <td>
                                  <input
                                    type="tel"
                                    name="phone"
                                    value={company.Company.phone}
                                    onChange={handleInputChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th className='text-secondary' scope="row">Endereço</th>
                                <td>
                                  <input
                                    type="text"
                                    name="address"
                                    value={company.Company.address}
                                    onChange={handleInputChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th className='text-secondary' scope="row">Número de endereço</th>
                                <td>
                                  <input
                                    type="text"
                                    name="address_number"
                                    value={company.Company.address_number}
                                    onChange={handleInputChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th className='text-secondary' scope="row">Bairro</th>
                                <td>
                                  <input
                                    type="text"
                                    name="address_neighborhood"
                                    value={company.Company.address_neighborhood}
                                    onChange={handleInputChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th className='text-secondary' scope="row">Complemento</th>
                                <td>
                                  <input
                                    type="text"
                                    name="address_complement"
                                    value={company.Company.address_complement}
                                    onChange={handleInputChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="1">
                                </td>
                                <td colSpan="2">
                                  <button className="btn btn-outline-secondary m-1" onClick={() => setShowUserForm(false)}>
                                    Cancelar
                                  </button>
                                  <button className="btn btn-outline-success m-1" >
                                    Salvar
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </form>
                      )} */}
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