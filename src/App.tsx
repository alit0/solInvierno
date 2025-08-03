import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import LaEscuela from './pages/LaEscuela';
import Niveles from './pages/Niveles';
import PropuestaEducativa from './pages/PropuestaEducativa';
import LaTiendita from './pages/LaTiendita';
import Inscripciones from './pages/Inscripciones';
import Donaciones from './pages/Donaciones';
import Contacto from './pages/Contacto';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes';
import ImpulsoDetail from './components/ImpulsoDetail';
import ScrollToTop from './components/ScrollToTop';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminImpulsos from './pages/AdminImpulsos';
import AdminImpulsoForm from './pages/AdminImpulsoForm';
import AdminPedidos from './pages/AdminPedidos';
import PedidosAdminRedirect from './pages/PedidosAdminRedirect';
import Impulsos from './pages/Impulsos';

function App() {
  // Determine if current path is admin route
  const isAdminRoute = window.location.pathname.startsWith('/adminsol') || 
                       window.location.pathname.startsWith('/admin');

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-warm-white">
        {!isAdminRoute && <Header />}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/la-escuela" element={<LaEscuela />} />
            <Route path="/niveles" element={<Niveles />} />
            <Route path="/propuesta-educativa" element={<PropuestaEducativa />} />
            <Route path="/impulsos" element={<Impulsos />} />
            <Route path="/impulsos/:slug" element={<ImpulsoDetail />} />
            <Route path="/la-tiendita" element={<LaTiendita />} />
            <Route path="/inscripciones" element={<Inscripciones />} />
            <Route path="/donaciones" element={<Donaciones />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
            
            {/* Rutas de administrador (secretas) */}
            <Route path="/adminsol" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/adminsol/dashboard" element={<AdminDashboard />} />
            
            {/* Rutas para administración de impulsos y pedidos */}
            <Route path="/admin/impulsos" element={<AdminImpulsos />} />
            <Route path="/admin/impulsos/nuevo" element={<AdminImpulsoForm />} />
            <Route path="/admin/impulsos/:id" element={<AdminImpulsoForm />} />
            <Route path="/admin/pedidos/:impulsoId" element={<AdminPedidos />} />
            
            {/* Ruta de redirección para resolver problema de IDs */}
            <Route path="/admin/pedidos-redirect/:impulsoId" element={<PedidosAdminRedirect />} />
          </Routes>
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </Router>
  );
}

export default App;