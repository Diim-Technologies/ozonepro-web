import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import NewTerms from "../features/Terms/terms";

const TermsPage = () => {
  return (
    <>
      <Navbar />

      {/* <Terms /> */}
      <NewTerms />
    </>
  );
};

export default TermsPage;
