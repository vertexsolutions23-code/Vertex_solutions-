import { Link, useLocation } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function NotFound() {
  const { pathname } = useLocation();
  return (
    <>
      <Seo
        title="Page Not Found | Vertex Solutions"
        description="The page you're looking for could not be found."
        path={pathname}
        noindex
      />
      <section className="err-page">
      <div className="container">
        <div className="code sr in">404</div>
        <h1 className="sr in">This page has gone off the ledger</h1>
        <p className="sr in">The page you're looking for doesn't exist or may have moved. Let's get you back on track.</p>
        <div className="hero-actions sr in" style={{ justifyContent: "center" }}>
          <Link className="btn btn-gold" to="/">Back to Home</Link>
          <Link className="btn btn-ghost-dark" to="/contact">Contact Us</Link>
        </div>
      </div>
    </section>
    </>
  );
}
