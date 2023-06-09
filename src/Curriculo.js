import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import UsuarioImagem from './images/user.png';

function Curriculo() {
    const [user, setUser] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [formations, setFormations] = useState([]);
    const [softskills, setSoftskills] = useState([]);
    const [hardskills, setHardskills] = useState([])
    const [relationsFormation, setRelationsFormation] = useState([{ Formation: { course: '', date: '' } , Institution: {name: ''}}]);
    const [relationsExperience, setRelationsExperience] = useState([{ Experience: { company: '', date: '' } , Position: {name: ''}}]);
    const [relationsSoftskill, setRelationsSoftskill] = useState([{ Softskill: { id: '', name: '' } }]);
    const [relationsHardskill, setRelationsHardskill] = useState([{ Hardskill: { id: '', name: '' } }]);

//   useEffect(() => {
//     const storedValue = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : [];
//     console.log(storedValue)
//     const user = storedValue.user;
//     const formationslist = storedValue.formations;
//     const experienceslist = storedValue.experiences;
//     const softskillslist = storedValue.softskills;
//     const hardskillslist = storedValue.hardskills;
//     setUser(user)
//     setFormations(formationslist)
//     setExperiences(experienceslist)
//     setSoftskills(softskillslist)
//     setHardskills(hardskillslist)
//   }, [setUser, setFormations, setExperiences]);

  useEffect(() => {
    const storedValue = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : [];
    const user = storedValue.user;
    const softskillslist = storedValue.softskills;
    const hardskillslist = storedValue.hardskills;
    setUser(user)
    setSoftskills(softskillslist)
    setHardskills(hardskillslist)

    const fetchData = async () => {
      try {
        // user
        // const response_user = await fetch(`https://projeto_1-1-h0551544.deta.app/user/${user.id}`);
        // const data_user = await response_user.json();
        // setUserForm(data_user.result)
        // setUserForm(user)

        const response3 = await fetch(`https://projeto_1-1-h0551544.deta.app/user_formation/getFormationsByUserId2/${user.id}`);
        const data3 = await response3.json();
        console.log(data3)
        setRelationsFormation(data3.result);

        // experiencia
        const response6 = await fetch(`https://projeto_1-1-h0551544.deta.app/user_experience/getExperiencesByUserId2/${user.id}`);
        const data6 = await response6.json();
        setRelationsExperience(data6.result);

        // softskill

        const response8 = await fetch(`https://projeto_1-1-h0551544.deta.app/user_softskill/getSoftskillsByUserId2/${user.id}`);
        const data8 = await response8.json();
        setRelationsSoftskill(data8.result)

        // hardskill

        const response10 = await fetch(`https://projeto_1-1-h0551544.deta.app/user_hardskill/getHardskillsByUserId2/${user.id}`);
        const data10 = await response10.json();
        setRelationsHardskill(data10.result)		
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
                                        {relationsSoftskill.map((item) => (
                                            <li key={item.id} className="list-group-item">{item.Softskill.name}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-md-4 m-3">
                                    <h4>Habilidades técnicas</h4>
                                    <ul className="list-group">
                                        {relationsHardskill.map((item) => (
                                            <li key={item.id} className="list-group-item">{item.Hardskill.name}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-md-4 m-3">
                                    <h4>Educação</h4>
                                    <ul className="list-group">
                                        {relationsFormation.map((item) => (
                                                <li key={item.id} className="list-group-item">
                                                    <strong>Curso:</strong> {item.Formation.course}<br />
                                                    <strong>Instituição:</strong> {item.Institution.name}<br />
                                                    <strong>Período:</strong> {item.Formation.date}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                                <div className="col-md-4 m-3">
                                    <h4>Experiência</h4>
                                    <ul className="list-group">
                                        {relationsExperience.map((item) => (
                                            <li key={item.id} className="list-group-item">
                                                <strong>Empresa:</strong> {item.Experience.company}<br />
                                                <strong>Cargo:</strong> {item.Position.name}<br />
                                                <strong>Período:</strong> {item.Experience.date}
                                            </li>
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
                                        {/* <li className="list-group-item"><i
                                                className="fab fa-github mr-2"></i>https://github.com/</li> */}
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