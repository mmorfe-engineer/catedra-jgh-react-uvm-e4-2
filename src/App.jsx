export function App() {
  return (
    <>
      <header className="site-header">
        <div className="container">
          <p>Universidad Valle del Momboy</p>
          <p>Cátedra Libre Dr. José Gregorio Hernández</p>
          <small>E-Actividad 4.2 · ReactJS</small>
        </div>
      </header>
      <main className="container">
        <section className="hero" aria-labelledby="hero-title">
          <p>Gestor de Actividades Formativas</p>
          <h1 id="hero-title">Vida, ciencia y servicio.</h1>
          <p>Herramienta digital para organizar las actividades formativas de la Cátedra Libre Dr. José Gregorio Hernández.</p>
        </section>
        <section aria-labelledby="about-title">
          <h2 id="about-title">Sobre la Cátedra</h2>
          <p>Un espacio de formación y reflexión que invita a estudiar su vida, obra y virtudes, con atención a su legado científico, su docencia y su vocación de servicio.</p>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container">
          <p>Taller Front End · Universidad Valle del Momboy</p>
        </div>
      </footer>
    </>
  )
}
