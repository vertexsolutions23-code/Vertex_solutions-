import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const value = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100;
      setPct(value);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div id="progress-bar" style={{ width: `${pct}%` }} />;
}
