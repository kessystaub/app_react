import React, { useState } from 'react';

function Formulario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Nome:', nome);
    console.log('Email:', email);
    // Aqui você pode adicionar lógica para enviar os dados do formulário para o servidor
  };

  return (
    <div className="container">
      <h1>Formulário</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
}

export default Formulario;