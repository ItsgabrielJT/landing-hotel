const fs = require('fs');

let appJsx = fs.readFileSync('src/App.jsx', 'utf8');

const headerHtml = `
      <header className="site-header">
        <div className="header-logo">LuxeLock</div>
        <nav className="header-nav">
          <a href="#solucion" className="is-active">Solución</a>
          <a href="#tecnologia">Tecnología</a>
          <a href="#hoja-de-ruta">Hoja de Ruta</a>
        </nav>
        <div className="header-actions">
          <a className="button button-primary" href="#contacto">Contacto</a>
        </div>
      </header>

      <section className="hero-section" id="solucion">
`;

// Replace hero section start
appJsx = appJsx.replace(/<section className="hero-section">/, headerHtml);

const newHeroCopy = `
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
`;

appJsx = appJsx.replace(/<div className="hero-copy">[\s\S]*?<\/div>\s*<div className="hero-stage" id="demo">/, newHeroCopy + '\n        <div className="hero-stage" id="demo">');

// Move hold ribbon to the bottom of the main shell
const holdRibbonRegex = /<aside className={`hold-ribbon[\s\S]*?<\/aside>/;
const holdRibbonMatch = appJsx.match(holdRibbonRegex);

if (holdRibbonMatch) {
  appJsx = appJsx.replace(holdRibbonRegex, '');
  appJsx = appJsx.replace(/<\/main>/, `  ${holdRibbonMatch[0]}\n    </main>`);
}

fs.writeFileSync('src/App.jsx', appJsx);
