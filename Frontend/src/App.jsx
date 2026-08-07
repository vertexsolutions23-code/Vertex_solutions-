import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";
import Blogs from "./pages/Blogs.jsx";
import Faqs from "./pages/Faqs.jsx";
import Contact from "./pages/Contact.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import Sitemap from "./pages/Sitemap.jsx";
import NotFound from "./pages/NotFound.jsx";
import { serviceOrder } from "./data/services.js";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        {serviceOrder.map((slug) => (
          <Route key={slug} path={`/${slug}`} element={<ServiceDetail slug={slug} />} />
        ))}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-conditions" element={<Terms />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
