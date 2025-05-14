import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [advice, setAdvice] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [fade, setFade] = useState(true);

  const fetchAdvice = () => {
    setFade(false);
    setTimeout(() => {
      fetch(`https://api.adviceslip.com/advice?random=${Math.random()}`)
        .then(res => res.json())
        .then(data => {
          const newAdvice = data.slip.advice;
          setAdvice(newAdvice);
          setTimestamp(new Date().toLocaleString());
          setFade(true);
        })
        .catch(err => {
          console.error('Erro ao buscar conselho:', err);
          setAdvice('Erro ao carregar conselho.');
          setTimestamp(new Date().toLocaleString());
          setFade(true);
        });
    }, 300);
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="App" style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>💡 Conselho do Dia</h1>

      <div className={`advice-box ${fade ? 'fade-in' : 'fade-out'}`}>
        <p style={{ fontSize: '1.3rem', fontStyle: 'italic' }}>{advice || 'Carregando...'}</p>
        <p style={{ fontSize: '0.9rem', color: '#555' }}>📅 {timestamp}</p>
        <button onClick={fetchAdvice} style={{ marginTop: '10px' }}>Gerar novo conselho</button>
      </div>
    </div>
  );
}

export default App;
