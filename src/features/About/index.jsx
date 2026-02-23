import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import AboutHero from "../../components/AboutHero";
import AboutSectionOne from "../../components/AboutSectionOne";
import AboutSectionTwo from "../../components/AboutSectionTwo";
import AboutSectionThree from "../../components/AboutSectionThree";
const AboutUsPage = () => {
  return (
    <>
      <Navbar />
      <AboutHero />
      <AboutSectionOne />
      <AboutSectionTwo />
      <AboutSectionThree />
      <Footer />
    </>
  );
};

export default AboutUsPage;
