import React, { useState } from 'react';

function Curriculo() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Match Code</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link"
                            href="http://127.0.0.1:5500/Perfil/index.html">Perfil
                            <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"
                            href="http://127.0.0.1:5500/Search/index.html">Vagas</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#"
                            id="navbarDropdown"
                            role="button" data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            Configurações
                        </a>
                        <div className="dropdown-menu"
                            aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else
                                here</a>
                        </div>
                    </li>
                </ul>
                <button className="btn btn-outline-success my-2 my-sm-0"
                    type="button"
                    onclick="goToCandidaturas()">Candidaturas</button>
            </div>
      </nav>

      <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="Profile
                                        Picture" className="img-fluid
                                        rounded-circle mb-3" />
                                </div>
                                <div className="col-md-8">
                                    <h2 className="mb-0">John Doe</h2>
                                    <p className="text-muted">Web Developer</p>
                                    <p className="mb-3"><i className="fas
                                            fa-map-marker-alt mr-2"></i>San
                                        Francisco, California</p>
                                    <p>Lorem ipsum dolor sit amet,
                                        consectetur adipiscing elit.
                                        Suspendisse euismod sem id ligula
                                        accumsan, nec bibendum
                                        nunc placerat. Sed aliquam velit nec
                                        ante tempus
                                        scelerisque. Sed eget enim vel ex
                                        interdum tempus. Sed
                                        maximus velit vel vestibulum
                                        fringilla. Proin tincidunt orci
                                        eu eros fringilla tempus. Nullam
                                        porttitor est et est
                                        vehicula suscipit. Aliquam consequat
                                        aliquet elit, vel
                                        rhoncus elit molestie sed. Sed ut mi
                                        non quam tincidunt
                                        rhoncus in ac turpis. </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-4">
                                    <h4>Skills</h4>
                                    <ul className="list-group">
                                        <li className="list-group-item">HTML</li>
                                        <li className="list-group-item">CSS</li>
                                        <li className="list-group-item">JavaScript</li>
                                        <li className="list-group-item">Bootstrap</li>
                                    </ul>
                                </div>
                                <div className="col-md-4">
                                    <h4>Education</h4>
                                    <ul className="list-group">
                                        <li className="list-group-item">Bachelor's
                                            Degree in Computer
                                            Science</li>
                                        <li className="list-group-item">Master's
                                            Degree in Web
                                            Development</li>
                                    </ul>
                                </div>
                                <div className="col-md-4">
                                    <h4>Contact</h4>
                                    <ul className="list-group" />
                                        <li className="list-group-item"><i
                                                className="fas fa-envelope
                                                mr-2"></i>johndoe@example.com</li>
                                        <li className="list-group-item"><i
                                                className="fas fa-phone mr-2"></i>(123)
                                            456-7890</li>
                                        <li className="list-group-item"><i
                                                className="fab fa-github mr-2"></i>https://github.com/johndoe</li>
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