import Hero from "../components/Hero.jsx";
import StatsBar from "../components/StatsBar.jsx";
import About from "../components/About.jsx";
import HorticulturalProject from "../components/HorticulturalProject.jsx";
import Technology from "../components/Technology.jsx";
import Certifications from "../components/Certifications.jsx";
import Environment from "../components/Environment.jsx";
import ContactForm from "../components/ContactForm.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <About />
      <HorticulturalProject />
      <Technology />
      <Certifications />
      <Environment />
      <ContactForm />
    </>
  );
}
