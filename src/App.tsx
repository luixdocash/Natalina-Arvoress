import React, { useState, useEffect } from 'react';

const BASE_CHECKOUT_URL = "https://ggcheckout.app/checkout/v5/Yn9EsW8WZTn1zYVfXkV5GR";
const WHATSAPP_NUMBER = "5562920066551";
const WHATSAPP_FORMATTED = "(62) 92006-6551";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Gostaria de tirar uma dúvida sobre a Árvore de Natal de 1,80 m."
)}`;

function getTrackingCheckoutUrl(): string {
  if (typeof window === 'undefined') return BASE_CHECKOUT_URL;
  const search = window.location.search;
  if (!search) return BASE_CHECKOUT_URL;
  const cleanSearch = search.replace(/^\?/, '');
  const separator = BASE_CHECKOUT_URL.includes('?') ? '&' : '?';
  return `${BASE_CHECKOUT_URL}${separator}${cleanSearch}`;
}

export default function App() {
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupClosed, setPopupClosed] = useState<boolean>(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string>(BASE_CHECKOUT_URL);

  const isUnlocked = selectedDoor !== null;

  useEffect(() => {
    const dynamicUrl = getTrackingCheckoutUrl();
    setCheckoutUrl(dynamicUrl);

    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'ViewContent', {
        content_name: 'Kit Completo Árvore de Natal 1,80 m',
        value: 179.80,
        currency: 'BRL',
      });
    }
  }, []);

  const handleDoorSelect = (index: number) => {
    if (selectedDoor !== null) return;
    setSelectedDoor(index);
    setShowPopup(true);

    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'UnlockDiscount', {
        discount_percent: 50,
        door: index + 1,
      });
    }
  };

  const scrollToPortas = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById('jogo-portas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleInitiateCheckout = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: 'Kit Completo Árvore de Natal 1,80 m',
        value: 89.90,
        currency: 'BRL',
      });
    }
  };

  return (
    <div id="top" className="min-h-screen text-[var(--ink)] bg-[var(--paper)] relative">
      {/* Topbar */}
      <div className="topbar">
        {isUnlocked ? (
          <span className="font-extrabold text-[#ffe9a8]">
            🎉 VOCÊ TIROU 50% OFF! KIT COMPLETO DE R$ 179,80 POR R$ 89,90!
          </span>
        ) : (
          <span>
            🎄 Escolha uma porta abaixo e concorra a até 50% OFF no Kit Completo!
          </span>
        )}
      </div>

      {/* Alerta de entrada direto ao ponto */}
      {!isUnlocked && (
        <div className="bg-[#a41f29] text-white px-3 py-2.5 text-center border-b-2 border-[#e2bc68]">
          <div className="wrap flex flex-wrap items-center justify-center gap-1.5 text-xs sm:text-sm font-bold">
            <span className="bg-[#e2bc68] text-[#062d23] px-2 py-0.5 rounded text-[11px] font-black uppercase">
              Aviso
            </span>
            <span>Abra uma porta antes de comprar para tentar tirar até 50% OFF:</span>
            <button
              onClick={scrollToPortas}
              type="button"
              className="underline text-[#ffe9a8] hover:text-white font-black cursor-pointer ml-1"
            >
              [ABRIR PORTA DA SORTE ↓]
            </button>
          </div>
        </div>
      )}

      {/* Navegação */}
      <div className="nav-shell">
        <nav className="nav wrap" aria-label="Navegação principal">
          <a className="brand" href="#top">
            <span className="brandmark" aria-hidden="true">
              <span className="monogram">N</span>
              <i className="seal-dot"></i>
            </span>
            <span className="wordmark">
              <span className="wordmark-main">Natal</span>
              <span className="wordmark-sub">em casa</span>
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#f8e6b6] hover:text-white bg-white/10 px-3 py-1.5 rounded-full border border-white/20 transition-colors"
            >
              WhatsApp: {WHATSAPP_FORMATTED}
            </a>
          </div>
        </nav>
      </div>

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="season-tag">Kit Completo de Natal</span>
              <h1>
                Sua casa pronta pro Natal <em>sem gastar muito.</em>
              </h1>
              <p className="lead">
                Árvore cheia de 1,80 m com +500 galhos. Já vem na caixa com o pisca-pisca de LED, mais de 70 enfeites e estrela de topo. Não precisa comprar nada separado.
              </p>
              <div className="pills">
                <span className="pill"><i className="dot"></i> 1,80 m de altura</span>
                <span className="pill"><i className="dot"></i> +500 galhos cheios</span>
                <span className="pill"><i className="dot"></i> Pisca LED incluso</span>
                <span className="pill"><i className="dot"></i> 70+ enfeites inclusos</span>
                <span className="pill"><i className="dot"></i> Base de metal</span>
              </div>

              {/* Bloco de Preço */}
              <div className="offer">
                <div className="pricebox">
                  {isUnlocked ? (
                    <>
                      <span className="was">
                        Kit Completo: de <s>R$ 179,80</s> <b className="discount animate-pulse">50% OFF</b>
                      </span>
                      <span className="price text-emerald-800 font-black">R$ 89,90</span>
                      <span className="installment">Árvore + Luzes LED + Enfeites + Estrela</span>
                    </>
                  ) : (
                    <>
                      <span className="was">Preço normal do kit:</span>
                      <span className="price text-gray-800">R$ 179,80</span>
                      <span className="installment text-[#a41f29] font-bold">
                        🎁 Abra uma porta abaixo e tente tirar até 50% OFF!
                      </span>
                    </>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  {isUnlocked ? (
                    <a
                      className="cta"
                      href={checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleInitiateCheckout}
                    >
                      Comprar por R$ 89,90 →
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="cta cursor-pointer bg-[#e0392a] hover:bg-[#bb2531]"
                      onClick={scrollToPortas}
                    >
                      Tentar até 50% OFF nas portas ↓
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="product-card">
              <span className="badge">VEM TUDO INCLUSO</span>
              <img
                src="/arvore-produto.jpg"
                alt="Kit Completo Árvore de Natal verde 1,80m decorada com luzes LED, bolas e estrela"
                width={1024}
                height={1024}
                loading="eager"
              />
              <p className="mini-note font-semibold text-[#062d23]">
                Kit Completo: Árvore 1,80m + Luzes LED + Bolas e Enfeites + Estrela de topo.
              </p>
            </div>
          </div>
        </section>

        {/* Citação curta */}
        <section className="memory">
          <div className="wrap memory-inner">
            <blockquote>
              O Natal que sua família merece, montado em minutos na sua sala.
            </blockquote>
          </div>
        </section>

        {/* Jogo das Portas */}
        <section className="doors-section" id="jogo-portas">
          <div className="doors-header-lead">
            <span className="doors-badge">🎁 Roleta da Sorte</span>
            <h3 className="text-xl md:text-2xl font-black text-[#062d23] mb-1 font-serif">
              {isUnlocked
                ? '🎉 Parabéns! Você tirou o desconto máximo!'
                : 'Escolha uma porta e descubra se tirou até 50% OFF!'}
            </h3>
            <p className="text-sm text-[#65716b] m-0">
              {isUnlocked
                ? 'Seu desconto de 50% OFF foi ativado. O Kit Completo sai por R$ 89,90.'
                : 'Clique em uma das portas para abrir e ver seu desconto.'}
            </p>
          </div>

          <div
            className={`pd-wrap ${selectedDoor !== null ? 'door-opened' : ''} ${
              showPopup && !popupClosed ? 'show-popup' : ''
            }`}
            data-chosen={selectedDoor !== null ? selectedDoor : undefined}
          >
            <h2 className="pd-title">
              {isUnlocked ? (
                <>
                  🎉 Deu sorte! Você tirou a porta de <span>50% OFF</span>!
                  <span className="pd-subtitle">Preço liberado: De R$ 179,80 por R$ 89,90 no Kit Completo!</span>
                </>
              ) : (
                <>
                  Escolha uma porta e tente tirar até <span>50% OFF</span>!
                  <span className="pd-subtitle">Toque na sua porta da sorte para abrir</span>
                </>
              )}
            </h2>

            <div className="pd-container">
              <input
                type="radio"
                name="pd-door"
                id="pd-r0"
                className="pd-radio"
                checked={selectedDoor === 0}
                onChange={() => handleDoorSelect(0)}
              />
              <input
                type="radio"
                name="pd-door"
                id="pd-r1"
                className="pd-radio"
                checked={selectedDoor === 1}
                onChange={() => handleDoorSelect(1)}
              />
              <input
                type="radio"
                name="pd-door"
                id="pd-r2"
                className="pd-radio"
                checked={selectedDoor === 2}
                onChange={() => handleDoorSelect(2)}
              />

              {/* Porta 0 */}
              <label
                htmlFor="pd-r0"
                className="pd-door"
                data-index="0"
                onClick={() => handleDoorSelect(0)}
              >
                <span className="pd-door-label-tag">Porta 1</span>
                <span className="pd-door-frame">
                  <span className="pd-door-inside">
                    <span className="pd-percent"></span>
                    <span className="pd-tag-inside"></span>
                  </span>
                  <span className="pd-door-panel">
                    <svg viewBox="0 0 120 200" preserveAspectRatio="none">
                      <rect x="2" y="2" width="116" height="196" rx="10" stroke="#00000022" strokeWidth="2" />
                      <rect x="14" y="16" width="92" height="72" rx="4" fill="#00000014" stroke="#ffffff33" strokeWidth="2" />
                      <rect x="14" y="100" width="92" height="84" rx="4" fill="#00000014" stroke="#ffffff33" strokeWidth="2" />
                      <circle cx="102" cy="102" r="5" fill="#ffe9a8" stroke="#00000033" strokeWidth="1" />
                    </svg>
                  </span>
                </span>
              </label>

              {/* Porta 1 */}
              <label
                htmlFor="pd-r1"
                className="pd-door"
                data-index="1"
                onClick={() => handleDoorSelect(1)}
              >
                <span className="pd-door-label-tag">Porta 2</span>
                <span className="pd-door-frame">
                  <span className="pd-door-inside">
                    <span className="pd-percent"></span>
                    <span className="pd-tag-inside"></span>
                  </span>
                  <span className="pd-door-panel">
                    <svg viewBox="0 0 120 200" preserveAspectRatio="none">
                      <rect x="2" y="2" width="116" height="196" rx="10" stroke="#00000022" strokeWidth="2" />
                      <rect x="14" y="16" width="92" height="72" rx="4" fill="#00000014" stroke="#ffffff33" strokeWidth="2" />
                      <rect x="14" y="100" width="92" height="84" rx="4" fill="#00000014" stroke="#ffffff33" strokeWidth="2" />
                      <circle cx="102" cy="102" r="5" fill="#ffe9a8" stroke="#00000033" strokeWidth="1" />
                    </svg>
                  </span>
                </span>
              </label>

              {/* Porta 2 */}
              <label
                htmlFor="pd-r2"
                className="pd-door"
                data-index="2"
                onClick={() => handleDoorSelect(2)}
              >
                <span className="pd-door-label-tag">Porta 3</span>
                <span className="pd-door-frame">
                  <span className="pd-door-inside">
                    <span className="pd-percent"></span>
                    <span className="pd-tag-inside"></span>
                  </span>
                  <span className="pd-door-panel">
                    <svg viewBox="0 0 120 200" preserveAspectRatio="none">
                      <rect x="2" y="2" width="116" height="196" rx="10" stroke="#00000022" strokeWidth="2" />
                      <rect x="14" y="16" width="92" height="72" rx="4" fill="#00000014" stroke="#ffffff33" strokeWidth="2" />
                      <rect x="14" y="100" width="92" height="84" rx="4" fill="#00000014" stroke="#ffffff33" strokeWidth="2" />
                      <circle cx="102" cy="102" r="5" fill="#ffe9a8" stroke="#00000033" strokeWidth="1" />
                    </svg>
                  </span>
                </span>
              </label>

              {/* Bloco de liberação */}
              {isUnlocked ? (
                <div className="w-full text-center mt-5 bg-[#fff9e6] border-2 border-[#e2bc68] p-4 rounded-xl shadow-md">
                  <span className="inline-block bg-[#3aa655] text-white text-xs font-black uppercase px-2.5 py-0.5 rounded-full mb-1">
                    ✓ 50% OFF LIBERADO!
                  </span>
                  <h4 className="text-xl font-black text-[#062d23] mb-1">
                    Kit Completo por apenas R$ 89,90!
                  </h4>
                  <p className="text-xs text-gray-700 mb-3">
                    De <s>R$ 179,80</s> por <strong>R$ 89,90</strong> com árvore, luzes LED, enfeites e estrela.
                  </p>
                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleInitiateCheckout}
                    className="inline-block bg-[#e0392a] hover:bg-[#c82b1d] text-white font-black py-3 px-7 rounded-xl text-base shadow-lg transition-transform hover:scale-105"
                  >
                    FINALIZAR POR R$ 89,90 →
                  </a>
                </div>
              ) : (
                <div className="w-full text-center mt-3 text-xs sm:text-sm font-bold text-gray-600 bg-[#f8f1e2] py-2.5 px-4 rounded-lg border border-[#ded0b8]">
                  👆 Toque em uma das 3 portas para tentar tirar até 50% OFF!
                </div>
              )}
            </div>

            {/* Popup */}
            {(!popupClosed && (selectedDoor !== null || showPopup)) && (
              <div className="pd-popup">
                <div className="pd-card">
                  <button
                    type="button"
                    className="pd-close-btn"
                    onClick={() => setPopupClosed(true)}
                    title="Fechar"
                    aria-label="Fechar"
                  >
                    ✕
                  </button>
                  <div className="pd-check">✓</div>
                  <h3 className="text-xl font-black">Você tirou 50% de desconto!</h3>
                  <div className="pd-price text-sm my-2">
                    De <s>R$ 179,80</s> por <strong className="text-xl text-[#e0392a]">R$ 89,90</strong>
                  </div>
                  <p className="text-xs text-emerald-800 font-bold mb-3">
                    Kit Completo: Árvore 1,80m + Luzes LED + Enfeites + Estrela!
                  </p>
                  <a
                    className="pd-cta cursor-pointer py-3 px-6 text-sm font-black"
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleInitiateCheckout}
                  >
                    Garantir Kit por R$ 89,90
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* O que vem na caixa */}
        <section className="section wrap" id="detalhes">
          <div className="section-title">
            <span className="kicker">TUDO NA MESMA CAIXA</span>
            <h2>O que vem no seu kit:</h2>
            <p>Tudo o que você precisa para montar em 5 minutos.</p>
          </div>
          <div className="feature-grid">
            <article className="feature">
              <span className="num">1,80 m</span>
              <h3>Árvore Verde Luxo</h3>
              <p>+500 galhos bem cheios. Não fica rala nem vazada.</p>
            </article>
            <article className="feature">
              <span className="num">LED</span>
              <h3>Pisca-Pisca Branco Quente</h3>
              <p>Luzes aconchegantes para iluminar a árvore toda.</p>
            </article>
            <article className="feature">
              <span className="num">70+</span>
              <h3>Bolas e Enfeites</h3>
              <p>Kit completo em vermelho e dourado espelhado e fosco.</p>
            </article>
            <article className="feature">
              <span className="num">⭐</span>
              <h3>Estrela Iluminada</h3>
              <p>Estrela dourada com luz própria para o topo.</p>
            </article>
          </div>
        </section>

        {/* Showcase */}
        <section className="section showcase">
          <div className="wrap showcase-grid">
            <figure className="room">
              <img
                src="/arvore-decorada.jpg"
                alt="Kit Completo da Árvore de Natal montada"
                width={800}
                height={800}
                loading="lazy"
              />
              <figcaption className="caption">
                Foto real do Kit Completo montado com todos os itens inclusos.
              </figcaption>
            </figure>
            <div>
              <span className="kicker">Montagem rápida</span>
              <h2>Simples de montar. Pronta na hora.</h2>
              <div className="checklist">
                <div className="check">
                  <span className="checkmark">1</span>
                  <div>
                    <strong>Encaixe a base</strong>
                    <span>Base de metal firme de encaixe rápido.</span>
                  </div>
                </div>
                <div className="check">
                  <span className="checkmark">2</span>
                  <div>
                    <strong>Abra os galhos</strong>
                    <span>Mais de 500 galhos para dar volume total.</span>
                  </div>
                </div>
                <div className="check">
                  <span className="checkmark">3</span>
                  <div>
                    <strong>Coloque os enfeites</strong>
                    <span>Pendure as bolas, laços e acenda as luzes.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ direto */}
        <section className="section wrap">
          <div className="faq-grid">
            <aside className="faq-side">
              <span className="kicker" style={{ color: '#e7c77f' }}>
                Tire suas dúvidas
              </span>
              <h2>Perguntas frequentes</h2>
              <div className="mt-4 pt-4 border-t border-white/20">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2 rounded-lg font-bold text-xs"
                >
                  <span>WhatsApp: {WHATSAPP_FORMATTED}</span>
                </a>
              </div>
            </aside>
            <div className="faq-list">
              <details open>
                <summary>Os enfeites e as luzes já vêm junto?</summary>
                <p>
                  <strong>Sim!</strong> Acompanha a árvore de 1,80 m, as luzes de LED, mais de 70 enfeites e bolas, a estrela iluminada de topo e a base de metal. Tudo na mesma caixa.
                </p>
              </details>
              <details>
                <summary>A árvore é cheia mesmo?</summary>
                <p>
                  Sim. São mais de 500 galhos densos. Abrindo as camadas ela fica cheia e sem espaços vazios.
                </p>
              </details>
              <details>
                <summary>Como tirar dúvidas do pedido?</summary>
                <p>
                  Atendimento direto pelo WhatsApp{' '}
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[#a41f29] font-bold underline">
                    {WHATSAPP_FORMATTED}
                  </a>.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Seção Final */}
        <section className="final">
          <h2>Garanta a sua árvore completa pro Natal.</h2>
          <div className="flex flex-col items-center gap-2 mt-4">
            {isUnlocked ? (
              <a
                className="cta"
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleInitiateCheckout}
              >
                Comprar Kit Completo por R$ 89,90 →
              </a>
            ) : (
              <button
                type="button"
                className="cta cursor-pointer bg-[#e0392a] hover:bg-[#bb2531]"
                onClick={scrollToPortas}
              >
                Abrir porta da sorte (até 50% OFF) ↓
              </button>
            )}
          </div>
        </section>
      </main>

      {/* Rodapé simples */}
      <footer className="footer">
        <div className="wrap">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-6 mb-6 border-b border-white/10 text-center text-xs">
            <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">🔒 Compra Segura (SSL)</div>
            <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">🚚 Envio com Rastreio</div>
            <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">⭐ Garantia de 7 Dias</div>
            <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">💬 Suporte WhatsApp</div>
          </div>

          <div className="text-center mb-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-5 py-2.5 rounded-full"
            >
              Suporte via WhatsApp: {WHATSAPP_FORMATTED}
            </a>
          </div>

          <div className="text-center text-[10px] text-gray-400">
            © 2026 Natal em Casa. Não afiliado ao Facebook ou Meta.
          </div>
        </div>
      </footer>

      {/* Botão Flutuante do WhatsApp */}
      <aside aria-label="Suporte WhatsApp" className="fixed bottom-24 sm:bottom-6 right-5 z-40">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3 rounded-full shadow-2xl transition-all hover:scale-110 border-2 border-white/30"
          title="Fale conosco no WhatsApp (62) 92006-6551"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </a>
      </aside>

      {/* Sticky mobile */}
      <div className="sticky" aria-label="Oferta fixa para celular">
        <div className="sticky-price">
          {isUnlocked ? (
            <>
              <small><s>R$ 179,80</s> · 50% OFF</small>
              <strong className="text-[#a41f29] font-black">R$ 89,90*</strong>
              <span className="text-emerald-700 font-bold">Kit Completo Liberado</span>
            </>
          ) : (
            <>
              <small>Preço normal: R$ 179,80</small>
              <strong className="text-gray-800">R$ 179,80</strong>
              <span className="text-[#a41f29] font-bold">🔒 Tente até 50% OFF</span>
            </>
          )}
        </div>
        {isUnlocked ? (
          <a
            className="cta"
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleInitiateCheckout}
          >
            Comprar (R$ 89,90)
          </a>
        ) : (
          <button
            type="button"
            className="cta cursor-pointer bg-[#e0392a]"
            onClick={scrollToPortas}
          >
            Abrir porta ↓
          </button>
        )}
      </div>
    </div>
  );
}
