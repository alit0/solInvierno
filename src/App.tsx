import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import LaEscuela from './pages/LaEscuela';
import Niveles from './pages/Niveles';
import Impulsos from './pages/Impulsos';
import LaTiendita from './pages/LaTiendita';
import Inscripciones from './pages/Inscripciones';
import Donaciones from './pages/Donaciones';
import Contacto from './pages/Contacto';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes';
import ImpulsoDetail from './components/ImpulsoDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-warm-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/la-escuela" element={<LaEscuela />} />
            <Route path="/niveles" element={<Niveles />} />
            <Route path="/impulsos" element={<Impulsos />} />
            <Route path="/impulsos/:slug" element={<ImpulsoDetail />} />
            <Route path="/la-tiendita" element={<LaTiendita />} />
            <Route path="/inscripciones" element={<Inscripciones />} />
            <Route path="/donaciones" element={<Donaciones />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;