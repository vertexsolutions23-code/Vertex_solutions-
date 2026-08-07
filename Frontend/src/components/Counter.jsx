import { useEffect, useRef, useState } from "react";

export default function Counter({ target, suffix = "", label }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const step = Math.max(1, Math.round(target / 50));
            let cur = 0;
            const iv = setInterval(() => {
              cur += step;
              if (cur >= target) {
                cur = target;
                clearInterval(iv);
              }
              setValue(cur);
            }, 22);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <div className="stat sr in" ref={ref}>
      <div className="num">{value}{suffix}</div>
      <div className="lbl">{label}</div>
    </div>
  );
}
