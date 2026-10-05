import useReveal from "../hooks/useReveal.js";

export default function Reveal({ as = "div", delay = 0, className = "", children, ...rest }) {
  const Tag = as;
  const [ref, inView] = useReveal();
  const delayClass = delay ? `reveal-delay-${delay}` : "";
  const classes = ["reveal", inView ? "in-view" : "", delayClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  );
}
