import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { imovelService } from '../services/imovelService';
import { Imovel, TipoImovel, CategoriaImovel, Caracteristica, TipoMidia, StatusImovel } from '../types';
import ImageUpload from '../components/ImageUpload';

const EditarImovel: React.FC = () => {
  const { uid } = useParams<{ uid: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagens, setImagens] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipo: '' as TipoImovel,
    categoria: '' as CategoriaImovel,
    status: StatusImovel.DISPONIVEL,
    valor: '',
    area: '',
    quartos: '',
    banheiros: '',
    vagas: '',
    bairro: '',
    cidade: '',
    estado: '',
    caracteristicas: [] as Caracteristica[],
    aceitaFinanciamento: false,
    aceitaPermuta: false
  });

  const carregarImovel = useCallback(async () => {
    try {
      const imovel = await imovelService.buscarPorUid(uid!);
      setFormData({
        titulo: imovel.titulo,
        descricao: imovel.descricao || '',
        tipo: imovel.tipo,
        categoria: imovel.categoria,
        status: imovel.status || StatusImovel.DISPONIVEL,
        valor: imovel.valor.toString(),
        area: imovel.area.toString(),
        quartos: imovel.quartos.toString(),
        banheiros: imovel.banheiros.toString(),
        vagas: imovel.vagas.toString(),
        bairro: imovel.endereco.bairro,
        cidade: imovel.endereco.cidade,
        estado: imovel.endereco.estado,
        caracteristicas: imovel.caracteristicas || [],
        aceitaFinanciamento: imovel.aceitaFinanciamento || false,
        aceitaPermuta: imovel.aceitaPermuta || false
      });

      // Carregar imagens existentes
      if (imovel.midias && imovel.midias.length > 0) {
        const urls = imovel.midias.map(m => m.url);
        setImagens(urls);
      }
    } catch (error) {
      alert('Erro ao carregar imóvel');
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  }, [uid, navigate]);

  useEffect(() => {
    if (uid) {
      carregarImovel();
    }
  }, [uid, carregarImovel]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imagens.length === 0) {
      alert('Adicione pelo menos uma imagem do imóvel');
      return;
    }

    setSaving(true);

    try {
      const imovel: Imovel = {
        titulo: formData.titulo,
        descricao: formData.descricao,
        tipo: formData.tipo,
        categoria: formData.categoria,
        status: formData.status,
        valor: Number(formData.valor),
        area: Number(formData.area),
        quartos: Number(formData.quartos),
        banheiros: Number(formData.banheiros),
        vagas: Number(formData.vagas),
        endereco: {
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado
        },
        caracteristicas: formData.caracteristicas,
        aceitaFinanciamento: formData.aceitaFinanciamento,
        aceitaPermuta: formData.aceitaPermuta,
        midias: imagens.map((url: string, index: number) => ({
          url,
          tipo: TipoMidia.IMAGEM,
          principal: index === 0
        }))
      };

      await imovelService.editar(uid!, imovel);
      alert('Imóvel atualizado com sucesso!');
      navigate('/admin');
    } catch (error) {
      alert('Erro ao atualizar imóvel');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleCaracteristicaToggle = (car: Caracteristica) => {
    setFormData(prev => ({
      ...prev,
      caracteristicas: prev.caracteristicas.includes(car)
        ? prev.caracteristicas.filter(c => c !== car)
        : [...prev.caracteristicas, car]
    }));
  };

  const caracteristicasDisponiveis = [
    Caracteristica.PISCINA,
    Caracteristica.CHURRASQUEIRA,
    Caracteristica.ACADEMIA,
    Caracteristica.SALAO_FESTAS,
    Caracteristica.ELEVADOR,
    Caracteristica.PORTARIA_24H,
    Caracteristica.PLAYGROUND,
    Caracteristica.QUINTAL,
    Caracteristica.AREA_GOURMET,
    Caracteristica.SACADA,
    Caracteristica.SUITE,
    Caracteristica.ARMARIOS_EMBUTIDOS
  ] as const;

  const getCaracteristicaLabel = (car: Caracteristica): string => {
    const labels: Record<Caracteristica, string> = {
      PISCINA: 'Piscina',
      CHURRASQUEIRA: 'Churrasqueira',
      ACADEMIA: 'Academia',
      SALAO_FESTAS: 'Salão de Festas',
      ELEVADOR: 'Elevador',
      PORTARIA_24H: 'Portaria 24h',
      PLAYGROUND: 'Playground',
      QUINTAL: 'Quintal',
      AREA_GOURMET: 'Área Gourmet',
      SACADA: 'Sacada',
      SUITE: 'Suíte',
      ARMARIOS_EMBUTIDOS: 'Armários Embutidos'
    };
    return labels[car];
  };

  if (loading) {
    return <div style={styles.loading}>Carregando...</div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={styles.header}>
        <h1 style={styles.title}>Editar Imóvel</h1>
        <button onClick={() => navigate('/admin')} style={styles.buttonSecondary}>
          ← Voltar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="card">
        {/* Informações Básicas */}
        <h2 style={styles.sectionTitle}>Informações Básicas</h2>

        <div style={styles.field}>
          <label style={styles.label}>Título *</label>
          <input
            type="text"
            value={formData.titulo}
            onChange={(e) => setFormData({...formData, titulo: e.target.value})}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Descrição</label>
          <textarea
            value={formData.descricao}
            onChange={(e) => setFormData({...formData, descricao: e.target.value})}
            style={{...styles.input, minHeight: '100px'}}
          />
        </div>

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Tipo *</label>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({...formData, tipo: e.target.value as TipoImovel})}
              style={styles.input}
              required
            >
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

          <div style={styles.field}>
            <label style={styles.label}>Categoria *</label>
            <select
              value={formData.categoria}
              onChange={(e) => setFormData({...formData, categoria: e.target.value as CategoriaImovel})}
              style={styles.input}
              required
            >
              <option value="VENDA">Venda</option>
              <option value="ALUGUEL">Aluguel</option>
              <option value="VENDA_ALUGUEL">Venda ou Aluguel</option>
            </select>
          </div>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Valor (R$) *</label>
          <input
            type="number"
            value={formData.valor}
            onChange={(e) => setFormData({...formData, valor: e.target.value})}
            style={styles.input}
            required
            min="0"
            step="0.01"
          />
        </div>

        {/* Características */}
        <h2 style={styles.sectionTitle}>Características</h2>

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Área (m²) *</label>
            <input
              type="number"
              value={formData.area}
              onChange={(e) => setFormData({...formData, area: e.target.value})}
              style={styles.input}
              required
              min="0"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Quartos *</label>
            <input
              type="number"
              value={formData.quartos}
              onChange={(e) => setFormData({...formData, quartos: e.target.value})}
              style={styles.input}
              required
              min="0"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Banheiros *</label>
            <input
              type="number"
              value={formData.banheiros}
              onChange={(e) => setFormData({...formData, banheiros: e.target.value})}
              style={styles.input}
              required
              min="0"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Vagas *</label>
            <input
              type="number"
              value={formData.vagas}
              onChange={(e) => setFormData({...formData, vagas: e.target.value})}
              style={styles.input}
              required
              min="0"
            />
          </div>
        </div>

        {/* Endereço */}
        <h2 style={styles.sectionTitle}>Endereço</h2>

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Bairro *</label>
            <input
              type="text"
              value={formData.bairro}
              onChange={(e) => setFormData({...formData, bairro: e.target.value})}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Cidade *</label>
            <input
              type="text"
              value={formData.cidade}
              onChange={(e) => setFormData({...formData, cidade: e.target.value})}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Estado *</label>
            <input
              type="text"
              value={formData.estado}
              onChange={(e) => setFormData({...formData, estado: e.target.value.toUpperCase()})}
              style={styles.input}
              required
              maxLength={2}
            />
          </div>
        </div>

        {/* Características Adicionais */}
        <h2 style={styles.sectionTitle}>Características Adicionais</h2>

        <div style={styles.caracteristicasGrid}>
          {caracteristicasDisponiveis.map((car) => (
            <label key={car} style={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.caracteristicas.includes(car)}
                onChange={() => handleCaracteristicaToggle(car)}
                style={{ marginRight: '0.5rem' }}
              />
              {getCaracteristicaLabel(car)}
            </label>
          ))}
        </div>

        {/* Opções de Negociação */}
        <h2 style={styles.sectionTitle}>Opções de Negociação</h2>

        <div style={styles.row}>
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={formData.aceitaFinanciamento}
              onChange={(e) => setFormData({...formData, aceitaFinanciamento: e.target.checked})}
              style={{ marginRight: '0.5rem' }}
            />
            Aceita Financiamento
          </label>

          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={formData.aceitaPermuta}
              onChange={(e) => setFormData({...formData, aceitaPermuta: e.target.checked})}
              style={{ marginRight: '0.5rem' }}
            />
            Aceita Permuta
          </label>
        </div>

        {/* Status do Imóvel */}
        <h2 style={styles.sectionTitle}>Status do Imóvel</h2>

        <div style={{ ...styles.formGroup, marginBottom: '2rem' }}>
          <label style={styles.label}>
            Status *
            <span style={{ fontSize: '0.875rem', color: '#6B7280', display: 'block', marginTop: '0.25rem' }}>
              Marque como "Vendido" ou "Alugado" quando o imóvel for comercializado
            </span>
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value as StatusImovel})}
            style={{
              ...styles.input,
              backgroundColor: formData.status === StatusImovel.VENDIDO || formData.status === StatusImovel.ALUGADO
                ? '#FEF3C7'
                : '#fff'
            }}
            required
          >
            <option value={StatusImovel.DISPONIVEL}>Disponível</option>
            <option value={StatusImovel.RESERVADO}>Reservado</option>
            <option value={StatusImovel.VENDIDO}>Vendido</option>
            <option value={StatusImovel.ALUGADO}>Alugado</option>
          </select>

          {(formData.status === StatusImovel.VENDIDO || formData.status === StatusImovel.ALUGADO) && (
            <div style={{
              marginTop: '0.75rem',
              padding: '0.75rem',
              backgroundColor: '#FEF3C7',
              border: '1px solid #FCD34D',
              borderRadius: '0.5rem',
              color: '#92400E'
            }}>
              <strong>⚠️ Atenção:</strong> Este imóvel aparecerá como "{formData.status}" na listagem pública.
              Será exibido em cinza e filtrado por padrão nas buscas.
            </div>
          )}
        </div>

        {/* Imagens */}
        <h2 style={styles.sectionTitle}>Imagens do Imóvel</h2>
        <ImageUpload
          imovelUid={uid!}
          imagens={imagens}
          onChange={setImagens}
          maxImages={10}
        />

        {/* Botões */}
        <div style={styles.actions}>
          <button type="button" onClick={() => navigate('/admin')} style={styles.buttonCancel}>
            Cancelar
          </button>
          <button type="submit" disabled={saving} style={styles.buttonPrimary}>
            {saving ? 'Salvando...' : 'Atualizar Imóvel'}
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  loading: {
    textAlign: 'center' as const,
    padding: '4rem',
    fontSize: '1.125rem',
    color: '#6B7280'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#111827'
  },
  buttonSecondary: {
    backgroundColor: 'white',
    color: '#2563EB',
    border: '1px solid #2563EB',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#111827',
    marginTop: '2rem',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #E5E7EB'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  field: {
    marginBottom: '1.5rem',
    flex: 1
  },
  row: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap' as const
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
  caracteristicasGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem'
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    cursor: 'pointer'
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
    marginTop: '2rem',
    paddingTop: '2rem',
    borderTop: '1px solid #E5E7EB'
  },
  buttonPrimary: {
    backgroundColor: '#2563EB',
    color: 'white',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  buttonCancel: {
    backgroundColor: 'white',
    color: '#6B7280',
    border: '1px solid #D1D5DB',
    padding: '0.75rem 2rem',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default EditarImovel;

