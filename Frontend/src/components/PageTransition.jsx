import { useLocation, useOutlet } from "react-router-dom";

export default function PageTransition() {
  const location = useLocation();
  const element = useOutlet();

  return (
    <div key={location.pathname} className="page-fade">
      {element}
    </div>
  );
}
