import React, { useEffect, useState } from 'react';
import MenuCompany from './MenuCompany';
import Card from 'react-bootstrap/Card';

function Vagas() {
  const [vagas, setVagas] = useState([]);
  const [company, setCompany] = useState({});

  useEffect(() => {
    const storedValue = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : [];
    const company = storedValue.company;
    setCompany(company)

    const fetchData = async () => {
        try {
            const response = await fetch(`https://projeto_1-4-h0551544.deta.app/joboffer/get_company_vagas/${company.id}`);
            const data = await response.json();
            setVagas(data.result)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
    
        fetchData();
  }, [setCompany]);


  return (
    <>
      <MenuCompany/>

      <div className="container mt-5">
        <div className="row justify-content-center">
                <div className="col-md-6">
                    <h4 className="text-center text-secondary mb-4">Suas vagas de emprego</h4>
                </div>
        </div>

        <div className="form-inline justify-content-center">
          <div className="row d-flex justify-content-center align-items-center">
            {vagas.map((item) => (
                <Card className='m-3' style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{company.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{item.Joboffer.name}</Card.Subtitle>
                  <Card.Text>
                    Descrição: {item.Joboffer.description}
                  </Card.Text>
                  <Card.Text>
                    Cargo: {item.Position.name}
                  </Card.Text>
                  <Card.Text>
                    Cidade:
                    <ul>
                      <li>{item.City.name}</li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Vagas;