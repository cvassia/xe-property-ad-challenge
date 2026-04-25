import { PropertyAdForm } from './components/PropertyAdForm';

export function App() {
  return (
    <main className="app-shell">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">XE Web Developer Challenge</p>
        <h1 id="page-title">New property</h1>
      </section>

      <PropertyAdForm />
    </main>
  );
}
