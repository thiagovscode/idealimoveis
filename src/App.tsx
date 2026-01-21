import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import ListagemImoveis from './pages/ListagemImoveis';
import DetalhesImovel from './pages/DetalhesImovel';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import CadastrarImovel from './pages/CadastrarImovel';
import EditarImovel from './pages/EditarImovel';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />

          <main className="flex-grow">
            <Routes>
              {/* Rotas Públicas */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/imoveis" element={<ListagemImoveis />} />
              <Route path="/imoveis/:uid" element={<DetalhesImovel />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/login" element={<Login />} />

              {/* Rotas Administrativas (Protegidas) */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/imoveis/novo"
                element={
                  <ProtectedRoute>
                    <CadastrarImovel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/imoveis/:uid/editar"
                element={
                  <ProtectedRoute>
                    <EditarImovel />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

