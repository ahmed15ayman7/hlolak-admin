import type { NextPage } from "next";

import HeroSection from "../../components/shared/HeroSection";
import PhotoGallery from "../../components/shared/GallerySection";
import ServicesSection from "../../components/shared/ServicesSection";
import LoanApplication from "../../components/shared/LoanApplication";
import Test from "../../components/shared/test";

const Home: NextPage = () => {
  return (
    <>
     
      <HeroSection />
      <PhotoGallery />
      <ServicesSection />
      <LoanApplication />
      <Test />
    </>
  );
};

export default Home;
