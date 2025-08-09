"use client";

import React, { useEffect } from 'react';
import Header from "../components/Header";
import Hero from "../components/Hero";
import Challenges from "../components/Challenges";
import Solution from "../components/Solution";
import Benefits from "../components/Benefits";
import Impact from "../components/Impact";
import Stories from "../components/Stories";
import Team from "../components/Team";
import Consultation from "../components/Consultation";
import Footer from "../components/Footer";

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
    
    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Challenges />
        <Solution />
        <Benefits />
        <Impact />
        <Stories />
        <Team />
        <Consultation />
      </main>
      <Footer />
    </>
  );
}