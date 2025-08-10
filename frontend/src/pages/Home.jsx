import React from 'react'
import Articles from "./Articles";

import MainLayout from "../components/MainLayout";
import CTA from "./CTA";
import Hero from "./Hero";

const Home = () => {
  return (
    <MainLayout>
    <Hero />
    <Articles />
    <CTA />
  </MainLayout>
  )
}

export default Home;