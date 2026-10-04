import Counter from "./Counter.jsx";
import "./StatsBar.css";

const STATS = [
  { to: 160, suffix: "+", label: "hectáreas de explotación" },
  { to: 25000, suffix: "+", label: "granados ecológicos" },
  { to: 20000, suffix: "+", label: "mandarinos Nadorcott" },
  { to: 5000, suffix: "", label: "olivos Manzanilla" },
  { to: 50000, suffix: "+", label: "árboles en masa forestal" },
];

export default function StatsBar() {
  return (
    <section className="stats-bar">
      <div className="container stats-grid">
        {STATS.map((s) => (
          <div className="stats-item" key={s.label}>
            <span className="stats-value">
              <Counter to={s.to} suffix={s.suffix} />
            </span>
            <span className="stats-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
