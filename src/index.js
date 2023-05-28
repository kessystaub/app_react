import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Perfil from './Perfil';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Curriculo from './Curriculo';
import Vaga from './Vaga';
import Candidaturas from './Candidaturas';
import Login from './Login';
import RegisterForm from './RegisterForm';
import SoftskillForm from './SoftskillForm';
import TecnicalskillForm from './TecnicalskillForm';
import FormationForm from './FormationForm';
import ExperienceForm from './ExperienceForm';
import LoginEmpresa from './LoginEmpresa'
import RegisterFormCompany from './RegisterFormCompany'
import Talentos from './Talentos'
import Search from './Search';
import { UserProvider } from './UserContext';
import PerfilEmpresa from './PerfilEmpresa';
import RegisterVaga from './RegisterVaga';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/cadastro" element={<RegisterForm />} />
              <Route path="/softskillForm" element={<SoftskillForm />} />
              <Route path="/tecnicalskillForm" element={<TecnicalskillForm />} />
              <Route path="/candidaturas" element={<Candidaturas />} />
              <Route path="/formationForm" element={<FormationForm />} />
              <Route path="/experienceForm" element={<ExperienceForm />} />
              <Route path="/search" element={<Search />} />
              <Route path="/vaga" element={<Vaga />} />
              <Route path="/curriculo" element={<Curriculo />} />
              <Route path="/loginempresa" element={<LoginEmpresa />} />
              <Route path="/cadastroempresa" element={<RegisterFormCompany />} />
              <Route path="/talentos" element={<Talentos />} />
              <Route path="/perfilempresa" element={<PerfilEmpresa />} />
              <Route path="/cadastrovaga" element={<RegisterVaga />} />
          </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
