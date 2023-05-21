import React, { useState } from 'react';
import Menu from './Menu';

function Curriculo() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div>
      <Menu />

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