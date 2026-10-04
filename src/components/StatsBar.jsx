import Counter from "./Counter.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./StatsBar.css";

const VALUES = [
  { to: 160, suffix: "+" },
  { to: 25000, suffix: "+" },
  { to: 20000, suffix: "+" },
  { to: 5000, suffix: "" },
  { to: 50000, suffix: "+" },
];

export default function StatsBar() {
  const { t, locale } = useLanguage();

  return (
    <section className="stats-bar">
      <div className="container stats-grid">
        {VALUES.map((s, i) => (
          <div className="stats-item" key={t.stats[i].label}>
            <span className="stats-value">
              <Counter to={s.to} suffix={s.suffix} locale={locale} />
            </span>
            <span className="stats-label">{t.stats[i].label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
