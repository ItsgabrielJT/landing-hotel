import { useEffect, useState } from 'react'
import './App.css'

const initialHoldSeconds = 10 * 60

function createRoomArt(title, accent) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#143642" />
          <stop offset="100%" stop-color="#0d1f27" />
        </linearGradient>
        <linearGradient id="glass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.12)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0.02)" />
        </linearGradient>
      </defs>
      <rect width="800" height="520" fill="url(#bg)" rx="40" />
      <circle cx="650" cy="110" r="120" fill="${accent}" opacity="0.35" />
      <circle cx="130" cy="420" r="160" fill="#F6F0E8" opacity="0.08" />
      <rect x="66" y="96" width="668" height="328" rx="34" fill="url(#glass)" stroke="rgba(255,255,255,0.08)" />
      <rect x="118" y="226" width="330" height="96" rx="22" fill="rgba(246,240,232,0.18)" />
      <rect x="142" y="184" width="148" height="42" rx="14" fill="${accent}" opacity="0.95" />
      <rect x="486" y="170" width="154" height="154" rx="24" fill="rgba(246,240,232,0.18)" />
      <path d="M510 296c38-54 78-90 120-108 14-6 30 6 28 22-7 52-47 106-118 160-14 11-35 1-35-17v-57c0-4 2-8 5-12Z" fill="#F6F0E8" opacity="0.88" />
      <text x="118" y="150" fill="#F6F0E8" font-family="Avenir Next, Helvetica Neue, Arial, sans-serif" font-size="44" font-weight="700">${title}</text>
      <text x="118" y="364" fill="#F6F0E8" font-family="Avenir Next, Helvetica Neue, Arial, sans-serif" font-size="24" opacity="0.76">Inventario protegido · Checkout con hold visible</text>
    </svg>`

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const rooms = [
  {
    id: 'oceano',
    name: 'Suite Oceano 402',
    city: 'Cartagena',
    country: 'Colombia',
    price: 280,
    type: 'Suite premium',
    capacity: '2 huespedes',
    occupancy: 92,
    image: createRoomArt('Suite Oceano 402', '#2E6F68'),
  },
  {
    id: 'skyline',
    name: 'Loft Skyline 1207',
    city: 'Ciudad de Mexico',
    country: 'Mexico',
    price: 240,
    type: 'Loft ejecutivo',
    capacity: '3 huespedes',
    occupancy: 81,
    image: createRoomArt('Loft Skyline 1207', '#C96B3B'),
  },
  {
    id: 'alpina',
    name: 'Habitacion Alpina 18',
    city: 'Bariloche',
    country: 'Argentina',
    price: 195,
    type: 'Vista montana',
    capacity: '2 huespedes',
    occupancy: 74,
    image: createRoomArt('Habitacion Alpina 18', '#7AA6A1'),
  },
]

const benefits = [
  {
    title: 'Inventario blindado contra sobreventa',
    text: 'Hold de 10 minutos con expiracion controlada y bloqueo pesimista para evitar doble reserva.',
  },
  {
    title: 'Checkout con conversion protegida',
    text: 'El viajero ve tiempo restante, mantiene la habitacion reservada y paga con confianza.',
  },
  {
    title: 'Operacion hotelera centralizada',
    text: 'Dashboard, CRUD de clientes y habitaciones, reservas y verificacion por codigo o QR.',
  },
]

const flowSteps = [
  'Busqueda con fechas, ciudad, pais y presupuesto maximo.',
  'Seleccion de una habitacion disponible con imagen y precio por noche.',
  'Creacion atomica del hold con contador regresivo y recuperacion de estado.',
  'Pago simulado idempotente con confirmacion y QR descargable.',
]

const checkoutFields = [
  'Nombre completo del huesped',
  'Correo para confirmacion y QR',
  'Telefono de contacto',
  'Peticiones especiales para la estancia',
]

const checkoutSummary = [
  { label: 'Noches', value: '3' },
  { label: 'Tarifa promedio', value: '$ 280' },
  { label: 'Impuestos', value: '$ 42' },
  { label: 'Total', value: '$ 882' },
]

const dashboardHighlights = [
  { label: 'Ventas totales', value: '$ 128K', tone: 'accent' },
  { label: 'Reservas activas', value: '126', tone: 'primary' },
  { label: 'Check-ins hoy', value: '34', tone: 'success' },
]

const reservationRows = [
  ['Laura Rios', 'Suite Oceano 402', '12-15 May', 'Confirmada', '$ 840'],
  ['Pablo Nunez', 'Loft Skyline 1207', '18-20 May', 'Pendiente', '$ 480'],
  ['Ana Mora', 'Habitacion Alpina 18', '22-25 May', 'Check-out', '$ 585'],
]

const paymentLabels = {
  ready: 'Pago listo para simular',
  processing: 'Pago procesando con idempotencia',
  confirmed: 'Reserva confirmada con QR y correo',
  failed: 'Pago fallido, hold listo para liberar',
}

const adminPanels = {
  dashboard: {
    title: 'Dashboard operativo',
    description: 'Top habitaciones, ventas y clientes frecuentes con lectura inmediata para decisiones diarias.',
    stats: [
      { label: 'Ventas del dia', value: '$ 18.4K' },
      { label: 'Holds activos', value: '07' },
      { label: 'Liberacion automatica', value: '99.3 %' },
    ],
  },
  reservas: {
    title: 'Reservas y checkout',
    description: 'Vista de reservas activas, confirmadas y check-out manual con trazabilidad de administrador.',
    stats: [
      { label: 'Confirmadas', value: '126' },
      { label: 'Pendientes de pago', value: '11' },
      { label: 'Terminadas hoy', value: '09' },
    ],
  },
  seguridad: {
    title: 'Verificacion y seguridad',
    description: 'JWT para administracion, reintentos de pago idempotentes y validacion por codigo o QR.',
    stats: [
      { label: 'Conflictos resueltos', value: '< 5 %' },
      { label: 'Tokens con expiracion', value: '8 h' },
      { label: 'QR verificables', value: '100 %' },
    ],
  },
}

const metrics = [
  { label: 'Doble booking', value: '0 casos', detail: 'en pruebas simultaneas', progress: 100 },
  { label: 'Conversion hold a reserva', value: '>= 60 %', detail: 'en escenario MVP', progress: 78 },
  { label: 'Liberacion de inventario', value: '>= 99 %', detail: 'en menos de 60 s', progress: 96 },
]

const palette = [
  { name: 'Azul petroleo', hex: '#143642', use: 'Titulares, fondos oscuros y bloques de confianza.' },
  { name: 'Cobre activo', hex: '#C96B3B', use: 'CTAs, numeros clave y microdetalles de conversion.' },
  { name: 'Arena editorial', hex: '#F6F0E8', use: 'Base luminosa, premium y menos fria que el blanco puro.' },
  { name: 'Verde oceano', hex: '#2E6F68', use: 'Estados de exito, seguridad y estabilidad operativa.' },
]

const faqItems = [
  {
    question: 'Que hace creible este MVP frente a un flujo hotelero real?',
    answer:
      'No es una maqueta superficial. La propuesta se apoya en hold temporal, expiracion automatica, pago idempotente y reglas claras para administracion y verificacion.',
  },
  {
    question: 'Que problema de negocio resuelve primero?',
    answer:
      'Reduce el riesgo de sobreventa a cero en el flujo MVP y protege la conversion durante el pago con inventario reservado por 10 minutos.',
  },
  {
    question: 'Como se vende internamente a un hotel?',
    answer:
      'Con una narrativa simple: menos conflicto operativo, mejor experiencia para el huesped y panel de control para reservas, clientes y habitaciones.',
  },
]

function formatCurrency(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatCountdown(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function App() {
  const [filters, setFilters] = useState({
    city: 'Cartagena',
    country: 'Colombia',
    budget: 320,
    checkIn: '2026-05-18',
    checkOut: '2026-05-21',
  })
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0].id)
  const [holdSeconds, setHoldSeconds] = useState(initialHoldSeconds)
  const [activePanel, setActivePanel] = useState('dashboard')
  const [openFaq, setOpenFaq] = useState(0)
  const [paymentStatus, setPaymentStatus] = useState('ready')

  const filteredRooms = rooms.filter((room) => {
    const cityMatch = filters.city
      ? room.city.toLowerCase().includes(filters.city.toLowerCase())
      : true
    const countryMatch = filters.country
      ? room.country.toLowerCase().includes(filters.country.toLowerCase())
      : true
    const budgetMatch = room.price <= Number(filters.budget)

    return cityMatch && countryMatch && budgetMatch
  })

  const selectedRoom =
    filteredRooms.find((room) => room.id === selectedRoomId) ?? filteredRooms[0] ?? null

  const holdProgress = (holdSeconds / initialHoldSeconds) * 100

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHoldSeconds((current) => (current > 0 ? current - 1 : 0))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  function updateFilter(field, value) {
    setFilters((current) => ({ ...current, [field]: value }))
  }

  function resetHoldDemo() {
    setHoldSeconds(initialHoldSeconds)
    setPaymentStatus('ready')
  }

  function advancePaymentDemo() {
    setPaymentStatus((current) => {
      if (holdSeconds === 0) {
        return 'failed'
      }

      if (current === 'ready') {
        return 'processing'
      }

      if (current === 'processing') {
        return 'confirmed'
      }

      if (current === 'confirmed') {
        return 'failed'
      }

      return 'ready'
    })
  }

  return (
    <main className="page-shell">
      
      
      <header className="site-header">
        <div className="header-logo">LUXE RESERVATIONS</div>
        <nav className="header-nav">
          <a href="#solucion">Solución</a>
          <a href="#demo">Buscador</a>
          <a href="#checkout">Checkout</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#arquitectura">Arquitectura</a>
        </nav>
        <div className="header-actions">
          <a className="button button-primary" href="#demo">Probar Demo</a>
        </div>
      </header>


      <section className="hero-section" id="solucion">

        
        <div className="hero-copy">
          <div className="eyebrow-group">
            <span className="eyebrow">EL FUTURO DE LA TECNOLOGÍA HOTELERA</span>
          </div>
          <h1>Motor de Reservas de Hotel.<br/>Inventario Garantizado.</h1>
          <p className="hero-lead">
            Un motor de reservas de alta concurrencia para hoteles de lujo que elimina el overbooking
            mediante el bloqueo pesimista de inventario. Ingeniería para la confianza arquitectónica.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#tecnologia">
              Ver Stack Tecnológico
            </a>
            <a className="button button-secondary" href="#hoja-de-ruta">
              Hoja de Ruta
            </a>
          </div>
        </div>

        <div className="hero-stage" id="demo">
          <section className="search-card">
            <div className="card-heading">
              <div>
                <span className="pill pill-success">Disponibilidad en tiempo real</span>
                <h2>Buscador de habitaciones premium</h2>
              </div>
              <span className="mini-kpi">p95 hold &lt; 500 ms</span>
            </div>

            <div className="form-grid">
              <label>
                Ciudad
                <input
                  value={filters.city}
                  onChange={(event) => updateFilter('city', event.target.value)}
                />
              </label>
              <label>
                Pais
                <input
                  value={filters.country}
                  onChange={(event) => updateFilter('country', event.target.value)}
                />
              </label>
              <label>
                Check-in
                <input
                  type="date"
                  value={filters.checkIn}
                  onChange={(event) => updateFilter('checkIn', event.target.value)}
                />
              </label>
              <label>
                Check-out
                <input
                  type="date"
                  value={filters.checkOut}
                  onChange={(event) => updateFilter('checkOut', event.target.value)}
                />
              </label>
            </div>

            <label className="budget-slider">
              Presupuesto maximo por noche
              <div>
                <input
                  type="range"
                  min="150"
                  max="350"
                  step="5"
                  value={filters.budget}
                  onChange={(event) => updateFilter('budget', event.target.value)}
                />
                <strong>{formatCurrency(Number(filters.budget))}</strong>
              </div>
            </label>

            <div className="room-list">
              {filteredRooms.map((room) => (
                <button
                  key={room.id}
                  type="button"
                  className={`room-option ${selectedRoom?.id === room.id ? 'is-selected' : ''}`}
                  onClick={() => setSelectedRoomId(room.id)}
                >
                  <img src={room.image} alt={room.name} />
                  <div>
                    <strong>{room.name}</strong>
                    <span>
                      {room.city}, {room.country}
                    </span>
                  </div>
                  <b>{formatCurrency(room.price)}</b>
                </button>
              ))}
              {filteredRooms.length === 0 ? (
                <div className="empty-state">
                  No hay habitaciones con estos filtros. Ajusta ciudad, pais o presupuesto.
                </div>
              ) : null}
            </div>
          </section>

          
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">Propuesta de valor</span>
          <h2>La historia del MVP se entiende en menos de 30 segundos</h2>
        </div>
        <div className="benefit-grid">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="benefit-card">
              <span className="benefit-index">0{benefits.indexOf(benefit) + 1}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-dark">
        <div className="section-heading section-heading-compact">
          <span className="eyebrow">Flujo del viajero</span>
          <h2>Una experiencia pensada para conversion, no solo para mostrar pantallas</h2>
        </div>
        <div className="timeline">
          {flowSteps.map((step, index) => (
            <article key={step} className="timeline-step">
              <span>{index + 1}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section product-demo-section" id="checkout">
        <div className="section-heading section-heading-inline">
          <div>
            <span className="eyebrow">Checkout demo</span>
            <h2>Una pantalla de pago que ya parece producto y no wireframe</h2>
          </div>
          <p className="support-copy">
            Inspirada en la referencia generada en Stitch: formulario elegante, resumen claro y una barra de hold horizontal anclada al borde inferior.
          </p>
        </div>

        <div className="checkout-demo-layout">
          <article className="checkout-demo-card">
            <div className="checkout-demo-header">
              <span className="pill pill-success">Checkout sincronizado</span>
              <strong>{selectedRoom ? selectedRoom.name : 'Reserva seleccionada'}</strong>
            </div>
            <div className="checkout-form-preview">
              {checkoutFields.map((field) => (
                <label key={field}>
                  {field}
                  <input value="" placeholder={field} readOnly />
                </label>
              ))}
            </div>
            <div className="payment-strip">
              <article>
                <span>Estado del pago</span>
                <strong>{paymentLabels[paymentStatus]}</strong>
              </article>
              <article>
                <span>Pasarela</span>
                <strong>Mock idempotente</strong>
              </article>
            </div>
          </article>

          <aside className="checkout-summary-card">
            <img src={selectedRoom?.image ?? rooms[0].image} alt={selectedRoom?.name ?? 'Habitacion'} />
            <div className="checkout-summary-copy">
              <strong>{selectedRoom ? selectedRoom.name : 'Suite seleccionada'}</strong>
              <span>
                {filters.checkIn} al {filters.checkOut}
              </span>
            </div>
            <div className="checkout-summary-grid">
              {checkoutSummary.map((item) => (
                <article key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>
            <div className="checkout-bottom-bar">
              <div>
                <span>Reserva retenida por</span>
                <strong>{formatCountdown(holdSeconds)} minutos</strong>
              </div>
              <button type="button" className="button button-primary" onClick={advancePaymentDemo}>
                Renovar narrativa
              </button>
            </div>
          </aside>
        </div>
      </section>

      <section className="section admin-section" id="dashboard">
        <div className="section-heading section-heading-inline">
          <div>
            <span className="eyebrow">Dashboard demo</span>
            <h2>Operacion visible para el hotel desde una sola vista realista</h2>
          </div>
          <div className="panel-switcher" role="tablist" aria-label="Vistas del panel">
            {Object.entries(adminPanels).map(([key, panel]) => (
              <button
                key={key}
                type="button"
                className={activePanel === key ? 'is-active' : ''}
                onClick={() => setActivePanel(key)}
              >
                {panel.title}
              </button>
            ))}
          </div>
        </div>

        <div className="admin-layout">
          <article className="admin-mockup">
            <div className="window-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="admin-columns">
              <nav>
                <strong>Travel Admin</strong>
                <a href="#demo">Dashboard</a>
                <a href="#demo">Clientes</a>
                <a href="#demo">Habitaciones</a>
                <a href="#demo">Reservas</a>
                <a href="#demo">Verificar QR</a>
              </nav>
              <div className="panel-content">
                <div className="panel-hero">
                  <span className="pill pill-success">JWT protegido</span>
                  <h3>{adminPanels[activePanel].title}</h3>
                  <p>{adminPanels[activePanel].description}</p>
                </div>
                <div className="stat-strip">
                  {adminPanels[activePanel].stats.map((item) => (
                    <article key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </article>
                  ))}
                </div>
                <div className="dashboard-highlight-row">
                  {dashboardHighlights.map((item) => (
                    <article key={item.label} className={`dashboard-highlight tone-${item.tone}`}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </article>
                  ))}
                </div>
                <div className="table-preview">
                  <div className="table-row table-head">
                    <span>Huesped</span>
                    <span>Habitacion</span>
                    <span>Fechas</span>
                    <span>Estado</span>
                    <span>Monto</span>
                  </div>
                  {reservationRows.map((row) => (
                    <div key={row[0]} className="table-row table-row-detailed">
                      {row.map((cell) => (
                        <span key={cell}>{cell}</span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <aside className="admin-notes">
            <article>
              <strong>Top 5 habitaciones</strong>
              <p>La landing explica el valor comercial con datos que un administrador entiende de inmediato.</p>
            </article>
            <article>
              <strong>Verificacion por QR</strong>
              <p>El cierre en check-in fisico se vuelve simple, verificable y menos dependiente del staff.</p>
            </article>
            <article>
              <strong>Terminacion manual con trazabilidad</strong>
              <p>El flujo considera estados finales, auditoria y una operacion irreversible bien controlada.</p>
            </article>
          </aside>
        </div>
      </section>

      <section className="section metrics-section">
        <div className="section-heading section-heading-inline">
          <div>
            <span className="eyebrow">Metricas del MVP</span>
            <h2>El discurso comercial se apoya en indicadores que el negocio puede defender</h2>
          </div>
          <p className="support-copy">
            Las cifras clave del PRD se convierten en bloques visuales para vender confiabilidad,
            conversion y control operativo.
          </p>
        </div>
        <div className="metric-grid">
          {metrics.map((metric) => (
            <article key={metric.label} className="metric-card">
              <div>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <small>{metric.detail}</small>
              </div>
              <div className="meter" aria-hidden="true">
                <div style={{ width: `${metric.progress}%` }} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section palette-section">
        <div className="section-heading section-heading-inline">
          <div>
            <span className="eyebrow">Colores recomendados</span>
            <h2>Paleta pensada para vender lujo, claridad y seguridad</h2>
          </div>
          <p className="support-copy">
            Evite el look morado generico. Esta combinacion transmite categoria hotelera y solidez tecnica.
          </p>
        </div>
        <div className="palette-grid">
          {palette.map((color) => (
            <article key={color.hex} className="palette-card">
              <div className="swatch" style={{ background: color.hex }} />
              <strong>{color.name}</strong>
              <span>{color.hex}</span>
              <p>{color.use}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-dark" id="arquitectura">
        <div className="section-heading section-heading-inline">
          <div>
            <span className="eyebrow">Arquitectura y seguridad</span>
            <h2>Una promesa comercial soportada por reglas operativas claras</h2>
          </div>
          <p className="support-copy support-copy-dark">
            El valor del MVP no es solo estetico: se apoya en una base transaccional simple y defendible.
          </p>
        </div>

        <div className="architecture-grid">
          <article>
            <strong>Concurrencia segura</strong>
            <p>Transaccion y SELECT FOR UPDATE para que dos usuarios no bloqueen la misma habitacion al mismo tiempo.</p>
          </article>
          <article>
            <strong>Expiracion idempotente</strong>
            <p>Worker dedicado para liberar holds vencidos y devolver inventario vendible sin intervencion manual.</p>
          </article>
          <article>
            <strong>Pago resistente a reintentos</strong>
            <p>Claves de idempotencia para evitar cobros o confirmaciones duplicadas en cortes de red.</p>
          </article>
          <article>
            <strong>Cierre premium</strong>
            <p>Reserva confirmada con codigo, QR, email asincrono y panel de verificacion listo para operacion real.</p>
          </article>
        </div>
      </section>

      <section className="section faq-section">
        <div className="section-heading">
          <span className="eyebrow">FAQ</span>
          <h2>Preguntas que suelen aparecer cuando se presenta el MVP</h2>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <article key={item.question} className={`faq-item ${openFaq === index ? 'is-open' : ''}`}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                <span>{item.question}</span>
                <strong>{openFaq === index ? '−' : '+'}</strong>
              </button>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section cta-section">
        <div>
          <span className="eyebrow">Siguiente paso</span>
          <h2>Listo para presentar el MVP a negocio, producto o direccion</h2>
          <p>
            Esta landing resume el problema, la solucion, la experiencia y la robustez operativa del
            motor de reservas en un lenguaje mas vendible y mas visual.
          </p>
        </div>
        <a className="button button-primary" href="#top" onClick={resetHoldDemo}>
          Reiniciar experiencia
        </a>
      </section>

      <footer className="site-footer">
        <strong>Travel: Motor de Reservas de Hotel</strong>
        <p>{new Date().getFullYear()} · Landing comercial en espanol inspirada en el PRD del MVP.</p>
      </footer>
      <aside className={`hold-ribbon ${holdSeconds === 0 ? 'is-expired' : ''}`}>
            <div className="hold-ribbon-icon" aria-hidden="true">
              ⏱
            </div>
            <div className="hold-ribbon-copy">
              <span className="hold-ribbon-label">Sesion de demo activa</span>
              <strong>
                {holdSeconds > 0 ? 'Inventario bloqueado' : 'Hold expirado'}: {formatCountdown(holdSeconds)}
              </strong>
              <small>{paymentLabels[paymentStatus]}</small>
            </div>
            <div className="hold-ribbon-progress" aria-hidden="true">
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${holdProgress}%` }} />
              </div>
            </div>
            <div className="hold-ribbon-actions">
              <button type="button" className="ribbon-button ribbon-button-alt" onClick={advancePaymentDemo}>
                Simular pago
              </button>
              <button type="button" className="ribbon-button" onClick={resetHoldDemo}>
                Reiniciar demo
              </button>
            </div>
          </aside>
    </main>
  )
}

export default App
