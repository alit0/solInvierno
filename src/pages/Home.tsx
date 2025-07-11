import React from 'react';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import EducationalProposal from '../components/EducationalProposal';
import CommunitySection from '../components/CommunitySection';
import HomeCards from '../components/HomeCards';
import ImpulsosGrid from '../components/ImpulsosGrid';

const Home = () => {
  return (
    <>
      <Hero />
      <Gallery />
      <EducationalProposal />
      <CommunitySection />
      <HomeCards />
      <ImpulsosGrid />
    </>
  );
};

export default Home;