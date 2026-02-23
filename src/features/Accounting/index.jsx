import React, { useState, useContext } from "react";
import {
  Heading,
  Box,
  Flex,
  Text,
  Image,
  UnorderedList,
  ListItem,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { CustomButton } from "../../components/Button";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import Testimonial from "../../components/Testimonial";
import { UserContext } from "../../contexts/UserContext";

export default function Accounting() {
  const router = useRouter();

  const { clientPhoneNumber } = useContext(UserContext);

  const [content, setContent] = useState({
    id: 0,
    name: "Book Keeping",
    content:
      "Keep track of your financial records with our intuitive and user-friendly bookkeeping tools.",
  });

  const handleClick = (event) => {
    event.preventDefault();

    const message = `Hi there! I'm interested in having a conversation about your accounting services. Can I go on to ask my questions?`;

    const url = `https://wa.me/${clientPhoneNumber}?text=${message}`;

    router.push(url);
  };

  const productContent = [
    {
      id: 0,
      name: "Book Keeping",
      content:
        "Keep track of your financial records with our intuitive and user-friendly bookkeeping tools.",
    },
    {
      id: 1,
      name: "Tax Filing",
      content:
        "File your taxes with ease using our integrated tax filing solution.",
    },
    {
      id: 2,
      name: "Audit Requirement",
      content:
        "You can also track changes to your financial data over time, so you can identify any potential issues before they become problems.",
    },
  ];

  const testimonialContent = [
    {
      id: 0,
      img: "/images/avatar-6.jpg",
      name: " Sarah K.",
      title: "Business Consultant",
      content:
        "Managing my finances used to be a daunting task until I found this accounting platform. It provides a clear and organized overview of my income, expenses, and cash flow.",
    },
    {
      id: 1,
      img: "/images/avatar-7.jpg",
      name: "Michael S.",
      title: "Entrepreneur",
      content:
        "I've tried multiple accounting platforms, but this one stands out. It has made a significant impact on my business's financial management.",
    },
    {
      id: 2,
      img: "/images/avatar-8.jpg",
      name: "Jimi L.",
      title: "Small Business Owner",
      content:
        "This accounting platform has revolutionized the way I manage my business's finances. It's a reliable and efficient solution.",
    },
    {
      id: 3,
      img: "/images/avatar-9.jpg",
      name: "Daniel T.",
      title: "Self-Employed ",
      content:
        "Their accounting services has simplified my tax season. It has made tax preparation much smoother and less stressful",
    },
    {
      id: 4,
      img: "/images/avatar-10.jpg",
      name: "Nathan O.",
      title: "Startup Founder",
      content:
        "I've been using this accounting service for my startup, and it has been a lifesaver. The customer support team has been very exceptional.",
    },
  ];

  return (
    <>
      <Navbar />
      <Box
        width="100%"
        bgImg="/images/accounting-services.png"
        bgSize="cover"
        h={{ base: "550", md: "600", xl: "700" }}
        px={{
          base: "5",
          // md: "200"
        }}
        textAlign="center"
      >
        <Heading
          pt={{
            base: "100px",
            md: "145px",
            xl: "175px",
          }}
          fontWeight={700}
          fontSize={{ base: "35px", md: "50px", lg: "60px", xl: "72px" }}
          textColor="offwhite"
        >
          Our Accounting Services
        </Heading>

        <Text
          textColor="offwhite"
          fontSize={{ md: "20px", lg: "24px", xl: "32px" }}
          w={{ md: "75%", lg: "68%", xl: "64%", "2xl": "60%" }}
          mx="auto"
          pt={{
            base: "5",
            md: "30px",
          }}
        >
          Designed specifically for small and medium-sized businesses, our
          platform provides all the tools you need to stay on top of your
          finances and make informed decisions about the future of your company.
        </Text>

        <Flex
          pt={{
            base: "5",
            md: "45px",
          }}
          w={{ base: "full", md: "40%", lg: "25%", xl: "20%" }}
          mx="auto"
          gap={{ base: 4, lg: 8 }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <CustomButton
            onClick={handleClick}
            mx="auto"
            w="270px"
            bg="primary.500"
          >
            Contact Us
          </CustomButton>
        </Flex>
      </Box>

      <Box pt="50px" px={{ base: "10px", md: "30px", lg: "70px", xl: "100px" }}>
        <Text
          fontSize={{ base: "24px", lg: "32px", xl: "36px" }}
          textColor="primary.500"
          textAlign="center"
        >
          Products Features
        </Text>
        <Text
          pt={3}
          fontSize={{ base: "28px", md: "24px", lg: "32px", xl: "44px" }}
          fontWeight={700}
          textAlign="center"
        >
          Easy to get started, just as easy to use.
        </Text>

        <Flex
          pb="50px"
          justifyContent="space-between"
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Box pt="50px" w={{ base: "full", lg: "20%" }}>
            <Flex
              alignItems="center"
              gap={3}
              onClick={() =>
                setContent({
                  id: productContent[0].id,
                  name: productContent[0].name,
                  content: productContent[0].content,
                })
              }
              cursor="pointer"
            >
              <Box
                display={content.id === 0 ? "block" : "none"}
                bg="#D6333A"
                h="48px"
                w="9px"
                rounded="12px"
              ></Box>
              <Text
                fontSize="20px"
                pl={content.id === 0 ? "5px" : "20px"}
                fontWeight={content.id === 0 ? 600 : 500}
              >
                Book keeping
              </Text>
            </Flex>

            <Flex
              alignItems="center"
              gap={3}
              onClick={() =>
                setContent({
                  id: productContent[1].id,
                  name: productContent[1].name,
                  content: productContent[1].content,
                })
              }
              cursor="pointer"
            >
              <Box
                display={content.id === 1 ? "block" : "none"}
                bg="#D6333A"
                h="48px"
                w="9px"
                rounded="12px"
              ></Box>
              <Text
                // pt="10px"
                pl={content.id === 1 ? "5px" : "20px"}
                fontSize="20px"
                fontWeight={content.id === 1 ? 600 : 500}
              >
                Tax Filing
              </Text>
            </Flex>

            {/* <Flex
              alignItems="center"
              gap={3}
              onClick={() =>
                setContent({
                  id: productContent[2].id,
                  name: productContent[2].name,
                  content: productContent[2].content,
                })
              }
              cursor="pointer"
            >
              <Box
                display={content.id === 2 ? "block" : "none"}
                bg="#D6333A"
                h="48px"
                w="9px"
                rounded="12px"
              ></Box>
              <Text
                // pt="10px"
                pl={content.id === 2 ? "5px" : "20px"}
                fontSize="20px"
                fontWeight={content.id === 2 ? 600 : 500}
              >
                Audit Requirements
              </Text>
            </Flex> */}
          </Box>

          <Box pt="50px" w={{ base: "full", lg: "25%" }}>
            <Text fontSize="32px" fontWeight={600}>
              {content.name}
            </Text>
            <Text pt="20px" fontSize="24px">
              {content.content}
            </Text>
            <CustomButton
              onClick={handleClick}
              w={{ base: "80%", md: "40%", lg: "80%" }}
              mt="20px"
              bg="primary.500"
            >
              Contact Us
            </CustomButton>
          </Box>

          <Box pt="50px" w={{ base: "full", lg: "50%" }}>
            <Image mx="auto" src="/images/productfeature.png" />
          </Box>
        </Flex>
      </Box>

      <Box
        width="100%"
        bgImg="/images/whychooseus.png"
        bgSize="cover"
        h={{ base: "1500", md: "1400", lg: "900", xl: "900" }}
      >
        <Text
          textColor="white"
          fontSize="32px"
          textAlign="center"
          fontWeight={600}
          pt={{ base: "60px", lg: "100px" }}
          pb="30px"
        >
          Why Choose Us
        </Text>

        <Flex
          width="100%"
          flexDirection={{ base: "column", lg: "row" }}
          alignItems="center"
          px={{ base: "10px", md: "30px", lg: "70px", xl: "100px" }}
          gap={5}
        >
          <Box w={{ base: "full", lg: "50%" }}>
            <Image mx="auto" src="/images/blackwomansmiling.png" />
          </Box>

          <Grid
            h="600px"
            w={{ base: "full", lg: "50%" }}
            templateRows={{ base: "repeat(5, 1fr)", lg: "repeat(6, 1fr)" }}
            templateColumns={{ base: "full", lg: "repeat(2, 1fr)" }}
            gap={{
              base: "20px",
              md: "30px",

              xl: "30px",
              "2xl": "60px",
            }}
            display={{ base: "block", md: "grid" }}
          >
            <GridItem
              rowStart={1}
              rowSpan={2}
              h={{ base: "200px", md: "full" }}
              w="100%"
              rounded="16px"
              p={3}
            >
              <Box>
                <Flex alignItems="center" gap={3} pb={5}>
                  <Image h="20px" w="20px" src="/images/money.png" />
                  <Text textColor="white" fontSize="20px" fontWeight={600}>
                    Easy to use
                  </Text>
                </Flex>
                <Text
                  textColor="white"
                  // fontSize={{ lg: "16px", xl: "18px", "2xl": "20px" }}
                >
                  User-friendly and intuitive, making it easy for anyone to
                  manage their accounting needs without prior experience.
                </Text>
              </Box>
            </GridItem>

            <GridItem
              h={{ base: "200px", md: "full" }}
              w="100%"
              rowSpan={2}
              rowStart={3}
              rounded="16px"
              p={3}
            >
              <Box>
                <Flex alignItems="center" gap={3} pb={5}>
                  <Image h="20px" w="20px" src="/images/money.png" />
                  <Text textColor="white" fontSize="20px" fontWeight={600}>
                    Customizable
                  </Text>
                </Flex>
                <Text textColor="white">
                  Customize their accounting settings and preferences to match
                  their specific business needs, ensuring that they get the most
                  out of our platform.
                </Text>
              </Box>
            </GridItem>

            <GridItem
              h={{ base: "200px", md: "full" }}
              w="100%"
              rowSpan={2}
              rowStart={5}
              rounded="16px"
              p={3}
            >
              <Box>
                <Flex alignItems="center" gap={3} pb={5}>
                  <Image h="20px" w="20px" src="/images/money.png" />
                  <Text textColor="white" fontSize="20px" fontWeight={600}>
                    Customer support
                  </Text>
                </Flex>
                <Text textColor="white">
                  Our dedicated customer support team is available to assist
                  users with any questions or issues they may have, providing
                  reliable and responsive support.
                </Text>
              </Box>
            </GridItem>

            <GridItem
              h={{
                base: "200px",
                md: "full",
                lg: "250px",
                xl: "250px",
                "2xl": "full",
              }}
              w="100%"
              colStart={2}
              rowStart={2}
              rowSpan={2}
              rounded="16px"
              p={3}
            >
              <Box>
                <Flex alignItems="center" gap={3} pb={5}>
                  <Image h="20px" w="20px" src="/images/money.png" />
                  <Text textColor="white" fontSize="20px" fontWeight={600}>
                    Comprehensive Features
                  </Text>
                </Flex>
                <Text textColor="white">
                  Our accounting features include bookkeeping, expense tracking,
                  invoicing, financial reporting, and more, providing users with
                  a complete accounting solution.
                </Text>
              </Box>
            </GridItem>

            <GridItem
              h={{ base: "200px", md: "full" }}
              w="100%"
              colStart={2}
              rowStart={4}
              rowSpan={2}
              rounded="16px"
              p={3}
            >
              <Box>
                <Flex alignItems="center" gap={3} pb={5}>
                  <Image h="20px" w="20px" src="/images/money.png" />
                  <Text textColor="white" fontSize="20px" fontWeight={600}>
                    Secure and reliable
                  </Text>
                </Flex>
                <Text textColor="white">
                  We prioritize the security and reliability of our platform,
                  using industry-standard encryption and backup processes to
                  protect user data.
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Flex>
      </Box>

      <Box
        pt="100px"
        pb={{ base: "20px", md: "50px" }}
        px={{ base: "10px", md: "30px", lg: "70px", xl: "100px" }}
      >
        <Text
          fontSize={{ base: "24px", lg: "32px", xl: "36px" }}
          textColor="primary.500"
        >
          Payments
        </Text>
        <Text
          pt={2}
          fontSize={{ base: "28px", md: "32px", lg: "36px", xl: "40px" }}
          fontWeight={600}
        >
          Easy to get started, just as easy to use.
        </Text>
        <Flex
          pt={3}
          w={{ base: "full", md: "40%", lg: "25%", xl: "20%" }}
          gap={{ base: 4, lg: 8 }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <CustomButton onClick={handleClick} w="220px" bg="primary.500">
            Chat with Us
          </CustomButton>
        </Flex>

        <Flex
          pt="30px"
          position="relative"
          overflow="hidden"
          height={{ base: "1000px", md: "800px" }}
          gap="50px"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Box
            h="full"
            w={{ base: "full", lg: "50%" }}
            display="flex"
            alignItems="center"
          >
            <Image w="full" src="/images/payments.png" />
          </Box>

          <UnorderedList
            w={{ base: "full", lg: "50%" }}
            fontSize={{ base: "16px", lg: "20px" }}
            pl={3}
            alignSelf="center"
          >
            <ListItem textColor="blue.800" pt={4}>
              The platform supports offline payment methods such as cash and
              check, in addition to online payment options.
            </ListItem>
            <ListItem textColor="blue.800" pt={4}>
              Users can easily record and track offline payments in the
              accounting section of the platform.
            </ListItem>
            <ListItem textColor="blue.800" pt={4}>
              The system automatically updates account balances to reflect
              offline payments, reducing the need for manual data entry and
              potential errors.
            </ListItem>
            <ListItem textColor="blue.800" pt={4}>
              With the ability to easily record and track offline payments,
              users can have a more complete and accurate view of their
              financial data in one place.
            </ListItem>
            <ListItem textColor="blue.800" pt={4}>
              The platform also generates reports that provide a summary of all
              offline payments, making it easy for users to reconcile their
              records with their bank statements.
            </ListItem>
            <ListItem textColor="blue.800" pt={4}>
              By integrating offline payments into the accounting system, users
              can streamline their financial processes and reduce the risk of
              discrepancies or lost payments.
            </ListItem>
          </UnorderedList>
        </Flex>
      </Box>

      <Testimonial testimonialContent={testimonialContent} />

      <Footer />
    </>
  );
}
