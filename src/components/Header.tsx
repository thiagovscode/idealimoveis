import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <nav className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 leading-none">Ideal Imóveis</span>
              <span className="text-xs text-gray-500 font-medium">Seu lar ideal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/">Início</NavLink>
            <NavLink to="/imoveis?categoria=VENDA">Venda</NavLink>
            <NavLink to="/imoveis?categoria=ALUGUEL">Aluguel</NavLink>
            <NavLink to="/sobre">Sobre</NavLink>
            <NavLink to="/contato">Contato</NavLink>

            {isAuthenticated && (
              <>
                <div className="w-px h-6 bg-gray-200 mx-2" />
                <NavLink to="/admin">Dashboard</NavLink>
                <div className="flex items-center space-x-3 ml-4">
                  <span className="text-sm text-gray-600">Olá, {user?.nome}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    Sair
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-1">
            <MobileNavLink to="/" onClick={() => setMobileMenuOpen(false)}>Início</MobileNavLink>
            <MobileNavLink to="/imoveis?categoria=VENDA" onClick={() => setMobileMenuOpen(false)}>Venda</MobileNavLink>
            <MobileNavLink to="/imoveis?categoria=ALUGUEL" onClick={() => setMobileMenuOpen(false)}>Aluguel</MobileNavLink>
            <MobileNavLink to="/sobre" onClick={() => setMobileMenuOpen(false)}>Sobre</MobileNavLink>
            <MobileNavLink to="/contato" onClick={() => setMobileMenuOpen(false)}>Contato</MobileNavLink>
            {isAuthenticated && (
              <>
                <div className="border-t border-gray-200 my-2" />
                <MobileNavLink to="/admin" onClick={() => setMobileMenuOpen(false)}>Dashboard</MobileNavLink>
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Sair ({user?.nome})
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link
    to={to}
    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
  >
    {children}
  </Link>
);

const MobileNavLink: React.FC<{ to: string; children: React.ReactNode; onClick: () => void }> = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
  >
    {children}
  </Link>
);

export default Header;

