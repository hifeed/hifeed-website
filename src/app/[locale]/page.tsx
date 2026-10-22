import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Challenges from "../../components/Challenges";
import Solution from "../../components/Solution";
import Benefits from "../../components/Benefits";
import Impact from "../../components/Impact";
import Stories from "../../components/Stories";
import Palatability from "../../components/Palatability";
import Consultation from "../../components/Consultation";
import Footer from "../../components/Footer";
import InvestorsFloatingButton from "../../components/InvestorsFloatingButton";
import ScrollAnimations from "../../components/ScrollAnimations";

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <Header />
      <main>
        <Hero />
        <Challenges />
        <Solution />
        <Benefits />
        <Palatability />
        <Impact />
        <Stories />
        <Consultation />
      </main>
      <Footer />
      <InvestorsFloatingButton />
    </>
  );
}
