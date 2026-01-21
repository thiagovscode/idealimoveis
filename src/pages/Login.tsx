import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
      navigate('/admin');
    } catch (err) {
      setError('Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🏠 Área Administrativa</h1>
        <p style={styles.subtitle}>Sistema Imobiliário</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="admin@imobiliaria.com"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={styles.info}>
          ⚠️ Sem cadastro? Entre em contato com o administrador.
        </div>

        <div style={styles.demo}>
          <strong>Credenciais de teste:</strong><br />
          Email: admin@imobiliaria.com<br />
          Senha: admin123
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    padding: '2rem'
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    width: '100%'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    color: '#111827',
    marginBottom: '0.5rem'
  },
  subtitle: {
    textAlign: 'center' as const,
    color: '#6B7280',
    marginBottom: '2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem'
  },
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 'bold',
    color: '#374151'
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  button: {
    backgroundColor: '#2563EB',
    color: 'white',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem'
  },
  error: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
    padding: '0.75rem',
    borderRadius: '4px',
    fontSize: '0.875rem'
  },
  info: {
    marginTop: '1.5rem',
    padding: '0.75rem',
    backgroundColor: '#FEF3C7',
    color: '#92400E',
    borderRadius: '4px',
    fontSize: '0.875rem',
    textAlign: 'center' as const
  },
  demo: {
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: '#DBEAFE',
    color: '#1E40AF',
    borderRadius: '4px',
    fontSize: '0.875rem',
    textAlign: 'center' as const
  }
};

export default Login;

