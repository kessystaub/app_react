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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
            <Route path="/" element={<Perfil />} />
            <Route path="/candidaturas" element={<Candidaturas />} />
            <Route path="/vaga" element={<Vaga />} />
            <Route path="/curriculo" element={<Curriculo />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
