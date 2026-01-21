import React from 'react';

const Contato: React.FC = () => {
  const whatsappNumber = '5511999999999';
  const whatsappMessage = 'Olá! Gostaria de falar com um corretor sobre imóveis.';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-white">
      {/* SEÇÃO 1 - HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Fale com um Corretor
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Tire suas dúvidas, agende visitas ou receba consultoria especializada.
              Estamos prontos para ajudar você a encontrar o imóvel ideal.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2 - CTA PRINCIPAL WHATSAPP */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12 text-center border border-green-100 shadow-lg">
              {/* Ícone WhatsApp */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6 shadow-lg">
                <svg className="w-11 h-11 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Atendimento Imediato via WhatsApp
              </h2>

              <p className="text-base md:text-lg text-gray-600 mb-8 max-w-lg mx-auto">
                Converse diretamente com nossos corretores especializados.
                Respostas rápidas e atendimento personalizado.
              </p>

              {/* Botão Principal */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl font-bold text-lg md:text-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Abrir WhatsApp</span>
              </a>

              {/* Informação Adicional */}
              <p className="text-sm text-gray-500 mt-6">
                📱 Atendemos de segunda a sexta, das 8h às 18h, e aos sábados das 9h às 13h
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3 - ONDE ESTAMOS */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Onde Estamos
              </h2>
              <p className="text-lg text-gray-600">
                Visite nosso escritório em Francisco Morato
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Mapa */}
              <div className="order-2 md:order-1">
                <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-md h-80 md:h-96">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14630.834407458647!2d-46.74570!3d-23.28123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef8e0b3b6d5e7%3A0x7f1c6e3c8e3b5e0a!2sFrancisco%20Morato%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização Ideal Imóveis"
                  ></iframe>
                </div>
              </div>

              {/* Informações de Localização */}
              <div className="order-1 md:order-2">
                <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                  <div className="flex items-start mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Nossa Localização</h3>
                      <p className="text-gray-700 font-medium mb-1">Rua das Magnólias, 257</p>
                      <p className="text-gray-600">Francisco Morato - SP</p>
                      <p className="text-gray-600">CEP: 07900-000</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Estamos estrategicamente localizados em Francisco Morato,
                      atendendo toda a região com excelência em serviços imobiliários.
                    </p>
                    <p className="text-sm text-gray-500 italic">
                      💡 Dica: Entre em contato via WhatsApp antes de nos visitar para agendar o melhor horário.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final - Reforço */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Pronto para encontrar seu imóvel ideal?
            </h3>
            <p className="text-blue-100 text-lg mb-6">
              Fale agora com nossos especialistas
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Chamar no WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;

