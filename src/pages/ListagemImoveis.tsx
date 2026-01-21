import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { imovelService } from '../services/imovelService';
import { Imovel, TipoImovel, CategoriaImovel, FiltroImovel, StatusImovel } from '../types';
import ImovelCard from '../components/ImovelCard';

const ListagemImoveis: React.FC = () => {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [mostrarVendidos, setMostrarVendidos] = useState(false);

  const [filtros, setFiltros] = useState<FiltroImovel>({
    tipo: (searchParams.get('tipo') as TipoImovel) || undefined,
    categoria: (searchParams.get('categoria') as CategoriaImovel) || undefined,
    cidade: searchParams.get('cidade') || undefined,
    valorMax: searchParams.get('valorMax') ? Number(searchParams.get('valorMax')) : undefined,
    quartosMin: searchParams.get('quartosMin') ? Number(searchParams.get('quartosMin')) : undefined,
    status: StatusImovel.DISPONIVEL // Filtrar apenas disponíveis por padrão
  });

  useEffect(() => {
    carregarImoveis();
  }, [filtros]); // Recarregar sempre que filtros mudarem

  const carregarImoveis = async () => {
    setLoading(true);
    try {
      const data = await imovelService.listar(filtros);
      setImoveis(data);
    } catch (error) {
      console.error('Erro ao carregar imóveis:', error);
    } finally {
      setLoading(false);
    }
  };

  const limparFiltros = () => {
    setFiltros({ status: StatusImovel.DISPONIVEL });
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 style={styles.title}>Imóveis Disponíveis</h1>

      <div style={styles.layout}>
        {/* Sidebar de Filtros */}
        <aside style={styles.sidebar}>
          <div className="card">
            <h2 style={styles.filterTitle}>Filtros</h2>

            <div style={styles.filterGroup}>
              <label style={styles.label}>Tipo:</label>
              <select
                value={filtros.tipo || ''}
                onChange={(e) => setFiltros({...filtros, tipo: e.target.value as TipoImovel || undefined})}
                style={styles.input}
              >
                <option value="">Todos</option>
                <option value="CASA">Casa</option>
                <option value="APARTAMENTO">Apartamento</option>
                <option value="TERRENO">Terreno</option>
                <option value="COMERCIAL">Comercial</option>
                <option value="INDUSTRIA">Indústria</option>
                <option value="DUPLEX">Duplex</option>
                <option value="GLEBA">Gleba</option>
                <option value="SOBRADO">Sobrado</option>
                <option value="SALA_COMERCIAL">Sala Comercial</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.label}>Categoria:</label>
              <select
                value={filtros.categoria || ''}
                onChange={(e) => setFiltros({...filtros, categoria: e.target.value as CategoriaImovel || undefined})}
                style={styles.input}
              >
                <option value="">Todos</option>
                <option value="VENDA">Venda</option>
                <option value="ALUGUEL">Aluguel</option>
                <option value="VENDA_ALUGUEL">Venda ou Aluguel</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.label}>Cidade:</label>
              <input
                type="text"
                value={filtros.cidade || ''}
                onChange={(e) => setFiltros({...filtros, cidade: e.target.value || undefined})}
                placeholder="Ex: São Paulo"
                style={styles.input}
              />
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.label}>Valor Mínimo:</label>
              <input
                type="number"
                value={filtros.valorMin || ''}
                onChange={(e) => setFiltros({...filtros, valorMin: e.target.value ? Number(e.target.value) : undefined})}
                placeholder="Ex: 100000"
                style={styles.input}
              />
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.label}>Valor Máximo:</label>
              <input
                type="number"
                value={filtros.valorMax || ''}
                onChange={(e) => setFiltros({...filtros, valorMax: e.target.value ? Number(e.target.value) : undefined})}
                placeholder="Ex: 500000"
                style={styles.input}
              />
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.label}>Quartos (mínimo):</label>
              <select
                value={filtros.quartosMin || ''}
                onChange={(e) => setFiltros({...filtros, quartosMin: e.target.value ? Number(e.target.value) : undefined})}
                style={styles.input}
              >
                <option value="">Qualquer</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.label}>Banheiros (mínimo):</label>
              <select
                value={filtros.banheirosMin || ''}
                onChange={(e) => setFiltros({...filtros, banheirosMin: e.target.value ? Number(e.target.value) : undefined})}
                style={styles.input}
              >
                <option value="">Qualquer</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.label}>Vagas (mínimo):</label>
              <select
                value={filtros.vagasMin || ''}
                onChange={(e) => setFiltros({...filtros, vagasMin: e.target.value ? Number(e.target.value) : undefined})}
                style={styles.input}
              >
                <option value="">Qualquer</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.label}>Área mínima (m²):</label>
              <input
                type="number"
                value={filtros.areaMin || ''}
                onChange={(e) => setFiltros({...filtros, areaMin: e.target.value ? Number(e.target.value) : undefined})}
                placeholder="Ex: 50"
                style={styles.input}
              />
            </div>

            {/* Checkbox para mostrar vendidos */}
            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#F3F4F6', borderRadius: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input
                  type="checkbox"
                  checked={mostrarVendidos}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setMostrarVendidos(checked);
                    setFiltros({
                      ...filtros,
                      status: checked ? undefined : StatusImovel.DISPONIVEL
                    });
                  }}
                  style={{ marginRight: '0.5rem', width: '1rem', height: '1rem' }}
                />
                <span>
                  Mostrar imóveis vendidos/alugados
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>
                    (aparecerão em cinza)
                  </span>
                </span>
              </label>
            </div>

            <div style={styles.filterActions}>
              <button onClick={limparFiltros} style={styles.buttonSecondary}>
                Limpar Filtros
              </button>
            </div>
          </div>
        </aside>

        {/* Lista de Imóveis */}
        <main style={styles.main}>
          {loading ? (
            <div style={styles.loading}>Carregando imóveis...</div>
          ) : imoveis.length === 0 ? (
            <div style={styles.empty}>
              <p>Nenhum imóvel encontrado com os filtros selecionados.</p>
              <button onClick={limparFiltros} style={styles.buttonPrimary}>
                Ver Todos os Imóveis
              </button>
            </div>
          ) : (
            <>
              <p style={styles.count}>
                {imoveis.length} {imoveis.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
              </p>
              <div style={styles.grid}>
                {imoveis.map((imovel) => (
                  <ImovelCard key={imovel.uid} imovel={imovel} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

const styles = {
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    color: '#111827'
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '2rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  },
  sidebar: {
    alignSelf: 'start',
    position: 'sticky' as const,
    top: '1rem'
  },
  filterTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#111827'
  },
  filterGroup: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#374151'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  filterActions: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem'
  },
  buttonPrimary: {
    backgroundColor: '#2563EB',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  buttonSecondary: {
    backgroundColor: 'white',
    color: '#2563EB',
    border: '1px solid #2563EB',
    padding: '0.75rem',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  main: {
    minHeight: '400px'
  },
  loading: {
    textAlign: 'center' as const,
    padding: '4rem',
    color: '#6B7280',
    fontSize: '1.125rem'
  },
  empty: {
    textAlign: 'center' as const,
    padding: '4rem',
    color: '#6B7280'
  },
  count: {
    marginBottom: '1.5rem',
    color: '#6B7280',
    fontSize: '0.875rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 600px), 1fr))',
    gap: '1.5rem'
  }
};

export default ListagemImoveis;

