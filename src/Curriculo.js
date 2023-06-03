import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import UsuarioImagem from './images/user.png';

function Curriculo() {
    const [user, setUser] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [formations, setFormations] = useState([]);
    const [softskills, setSoftskills] = useState([]);
    const [hardskills, setHardskills] = useState([])

  useEffect(() => {
    const storedValue = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : [];
    console.log(storedValue)
    const user = storedValue.user;
    const formationslist = storedValue.formations;
    const experienceslist = storedValue.experiences;
    const softskillslist = storedValue.softskills;
    const hardskillslist = storedValue.hardskills;
    setUser(user)
    setFormations(formationslist)
    setExperiences(experienceslist)
    setSoftskills(softskillslist)
    setHardskills(hardskillslist)
  }, [setUser, setFormations, setExperiences]);

  return (
    <div>
      <Menu />

      <div className="container">
            <div className="row justify-content-center m-5">
                <div className="col-lg-8 col-md-10">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <img
                                        src={UsuarioImagem}
                                        alt="user" className="img-fluid
                                        rounded-circle mb-3 w-75" />
                                </div>
                                <div className="col-md-8">
                                    <h2 className="mb-0">{user.name}</h2>
                                    <p className="mb-3"><i className="fas
                                            fa-map-marker-alt mr-2"></i>Endereço: {user.address}</p>
                                    <p>{user.description}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-4 m-3">
                                    <h4>Habilidades interpessoais</h4>
                                    <ul className="list-group">
                                        {softskills.map((item) => (
                                            <li key={item.id} className="list-group-item">{item.name}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-md-4 m-3">
                                    <h4>Habilidades técnicas</h4>
                                    <ul className="list-group">
                                        {hardskills.map((item) => (
                                            <li key={item.id} className="list-group-item">{item.name}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-md-4 m-3">
                                    <h4>Educação</h4>
                                    <ul className="list-group">
                                        {formations.map((item) => (
                                                <li key={item.id} className="list-group-item">{item.course}</li>
                                            ))}
                                    </ul>
                                </div>
                                <div className="col-md-4 m-3">
                                    <h4>Experiência</h4>
                                    <ul className="list-group">
                                        {experiences.map((item) => (
                                                <li key={item.id} className="list-group-item">{item.company}</li>
                                            ))}
                                    </ul>
                                </div>
                                <div className="col-md-4 m-3">
                                    <h4>Contato</h4>
                                    <ul className="list-group" />
                                        <li className="list-group-item"><i
                                                className="fas fa-envelope
                                                mr-2"></i>{user.email}</li>
                                        <li className="list-group-item"><i
                                                className="fas fa-phone mr-2"></i>{user.phone}</li>
                                        <li className="list-group-item"><i
                                                className="fab fa-github mr-2"></i>https://github.com/</li>
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

export default Curriculo;