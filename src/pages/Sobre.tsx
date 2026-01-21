import React from 'react';

const Sobre: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-blue-100 rounded-full">
              <span className="text-blue-700 font-bold text-sm">🏡 Desde 2010 • Mais de 15 anos de experiência</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Encontre seu <span className="text-blue-600">lar ideal</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Na Ideal Imóveis, transformamos sonhos em endereços. Atendemos Francisco Morato
              e região com excelência, transparência e dedicação há mais de uma década.
            </p>
          </div>
        </div>
      </section>

      {/* NOSSA HISTÓRIA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Texto */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Nossa História
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Fundada em 2010, a <span className="font-semibold text-gray-900">Ideal Imóveis</span> nasceu
                    com o propósito de facilitar a realização do sonho da casa própria para famílias
                    de Francisco Morato e região.
                  </p>
                  <p>
                    Ao longo dos anos, construímos uma trajetória sólida baseada em <span className="font-semibold text-gray-900">confiança,
                    profissionalismo e resultados</span>. Cada imóvel vendido, cada família feliz em seu novo lar,
                    representa nossa missão cumprida.
                  </p>
                  <p>
                    Hoje, somos referência no mercado imobiliário local, com um portfólio diversificado
                    e uma equipe especializada pronta para atender você com excelência.
                  </p>
                </div>
              </div>

              {/* Imagem/Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border border-blue-200">
                  <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
                  <div className="text-sm text-gray-700 font-medium">Anos de Mercado</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center border border-green-200">
                  <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
                  <div className="text-sm text-gray-700 font-medium">Imóveis Vendidos</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center border border-purple-200">
                  <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
                  <div className="text-sm text-gray-700 font-medium">Famílias Felizes</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center border border-orange-200">
                  <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
                  <div className="text-sm text-gray-700 font-medium">Satisfação</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSÃO, VISÃO E VALORES */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Missão, Visão e Valores
              </h2>
              <p className="text-lg text-gray-600">
                Os pilares que guiam nosso trabalho todos os dias
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Missão */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Missão</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Facilitar a realização do sonho da casa própria, oferecendo soluções imobiliárias
                  com transparência, agilidade e atendimento personalizado.
                </p>
              </div>

              {/* Visão */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Visão</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Ser a imobiliária mais confiável e reconhecida de Francisco Morato e região,
                  referência em qualidade de serviço e satisfação do cliente.
                </p>
              </div>

              {/* Valores */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
                <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Valores</h3>
                <ul className="text-gray-600 text-sm leading-relaxed space-y-2">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Transparência</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Ética Profissional</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Comprometimento</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Excelência</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOSSOS DIFERENCIAIS */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Por que Escolher a Ideal Imóveis?
              </h2>
              <p className="text-lg text-gray-600">
                Diferenciais que fazem a diferença na sua experiência
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Diferencial 1 */}
              <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-white hover:shadow-md transition-all duration-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Atendimento Personalizado</h3>
                <p className="text-sm text-gray-600">Cada cliente é único e merece atenção especial</p>
              </div>

              {/* Diferencial 2 */}
              <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-white hover:shadow-md transition-all duration-200">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Agilidade</h3>
                <p className="text-sm text-gray-600">Processos rápidos e eficientes do início ao fim</p>
              </div>

              {/* Diferencial 3 */}
              <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-white hover:shadow-md transition-all duration-200">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Segurança Jurídica</h3>
                <p className="text-sm text-gray-600">Documentação completa e verificada</p>
              </div>

              {/* Diferencial 4 */}
              <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-white hover:shadow-md transition-all duration-200">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Equipe Especializada</h3>
                <p className="text-sm text-gray-600">Corretores experientes e qualificados</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOSSOS SERVIÇOS */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nossos Serviços
              </h2>
              <p className="text-lg text-gray-600">
                Soluções completas para todas as suas necessidades imobiliárias
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Serviço 1 */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 group">
                <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Compra e Venda</h3>
                <p className="text-gray-600 leading-relaxed">
                  Assessoria completa para você encontrar ou vender seu imóvel pelo melhor preço,
                  com avaliação justa e negociação transparente.
                </p>
              </div>

              {/* Serviço 2 */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 group">
                <div className="text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Locação</h3>
                <p className="text-gray-600 leading-relaxed">
                  Encontre o imóvel ideal para alugar com total segurança, agilidade e
                  suporte completo na documentação e contrato.
                </p>
              </div>

              {/* Serviço 3 */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 group">
                <div className="text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Consultoria</h3>
                <p className="text-gray-600 leading-relaxed">
                  Orientação especializada para investimentos imobiliários, documentação
                  e análise de mercado personalizada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Pronto para realizar seu sonho?
            </h3>
            <p className="text-blue-100 text-lg mb-6">
              Entre em contato e descubra como podemos ajudar você
            </p>
            <a
              href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20mais%20informações"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Fale Conosco</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sobre;

