import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import MenuCompany from './MenuCompany';

function Talentos() {
  const [id, setId] = useState('');
  const [company, setCompany] = useState([]);
  const [users, setUsers] = useState([{ City: { name: '' } ,  User: {name: '',  email: '', phone_number: ''}}]);
  const [experiences, setExperiences] = useState([]);
  const [formations, setFormations] = useState([]);
  const [softskills, setSoftskills] = useState([]);
  const [hardskills, setHardskills] = useState([])
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
  const [state, setState] = useState('');
  const [disabled, setDisabled] = useState(true)
  const [mostraBotao, setMostraBotao] = useState(false)
  const [nomeIns, setNomeIns] = useState('')
  const [nomePos, setNomePos] = useState('')
  const [user, setUser] = useState({})


  const navigate = useNavigate();

  async function navigateToCurriculo(user_id) {
    try {
        const response = await fetch(`http://localhost:8000/user/get_skills/${user_id}`);
        const data = await response.json();
        console.log(data.result)
        setUser(data.result)
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    console.log(user)
    if (JSON.stringify(user) === {}){
        return
    }
    localStorage.setItem("user-info", JSON.stringify(user))
    navigate('/curriculo');
  };

  useEffect(() => {
    const storedValue = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : [];
    const company1 = storedValue.company;
    setCompany(company1)

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/user`);
            const data = await response.json();
            setUsers(data.result)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
    
        fetchData();
  }, [setCompany, setUsers]);

  return (
    <div>
      <MenuCompany/>

        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <img src="logo.png" alt="Logo" />
                    <h4 className="text-center text-secondary mb-4">Aqui estão alguns talentos para a sua empresa</h4>
                </div>
            </div>

            {users.map((item) => (
                <div key={item.id} className="card-deck m-2">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{item.User.name}</h5>
                            <p className="card-text">{item.User.email}</p>
                            <p className="card-text">{item.User.phone_number}</p>
                            <p className="card-text">{item.City.name}</p>
                        <button className='btn' onClick={() => navigateToCurriculo(item.User.id)}>
                            Visualizar currículo
                        </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>                              
    </ div>
  );
}

export default Talentos;