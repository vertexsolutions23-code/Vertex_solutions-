import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import FabStack from "./FabStack.jsx";
import ScrollProgress from "./ScrollProgress.jsx";
import Loader from "./Loader.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import RippleLayer from "./RippleLayer.jsx";
import PageTransition from "./PageTransition.jsx";

export default function Layout() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <ScrollToTop />
      <RippleLayer />
      <Header />
      <main>
        <PageTransition />
      </main>
      <Footer />
      <FabStack />
    </>
  );
}
