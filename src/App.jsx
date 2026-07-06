import { useState } from 'react';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Footer from './components/Footer';
import KaiWidget from './components/KaiWidget';
import ParticleNetwork from './components/world/ParticleNetwork';
import Hero from './components/sections/Hero';
import Stats from './components/sections/Stats';
import About from './components/sections/About';
import Expertise from './components/sections/Expertise';
import Projects from './components/sections/Projects';
import WhyBuilt from './components/sections/WhyBuilt';
import Process from './components/sections/Process';
import ArchitectureSection from './components/sections/Architecture';
import Certifications from './components/sections/Certifications';
import Education from './components/sections/Education';
import ResumeContact from './components/sections/ResumeContact';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Hidden SVG filter powering the liquid-glass distortion on Nav/Footer */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <filter id="lg-dist" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves="2" seed="7" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap in="SourceGraphic" in2="blurred" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <ParticleNetwork />

      <Nav />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Stats />
        <About />
        <Expertise />
        <Projects />
        <WhyBuilt />
        <Process />
        <ArchitectureSection />
        <Certifications />
        <Education />
        <ResumeContact />
      </main>

      <Footer />
      <KaiWidget />
    </>
  );
}
