import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const RegistrationSuccess = () => {
	const [dataFromLocalStorage, setDataFromLocalStorage] = useState({});
	const { clientPhoneNumber } = useContext(UserContext);
	const [UIN, setUIN] = useState("");
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			const newUIN = localStorage.getItem("UIN");
			setUIN(newUIN);
			const firstName = localStorage.getItem("firstName");
			const lastName = localStorage.getItem("lastName");
			setFirstName(firstName);
			setLastName(lastName);

			const data = JSON.parse(localStorage.getItem("transactionDetails"));
			setDataFromLocalStorage({ ...data });
		}
	}, []);

	const redirectToChat = () => {
		const customMessage = `Hi there! this is my UIN: ${UIN}. Can we proceed with the transaction?`;

		const url = `https://wa.me/${clientPhoneNumber}?text=${customMessage}`;
		window.open(url, "_blank");
	};

	return (
		<Box bg="#F5FAFF" w="full" h="calc(100vh)">
			<Flex justifyContent="center" alignItems="center">
				<Box pt={{ base: "40px", md: "40px" }}>
					<Image src="/images/ozone-pro-trans-logo.svg" h="68px" w="96.15px" />
					<Flex
						alignItems="center"
						pl={{ base: "0px", md: "25px" }}
						mt={{ base: "20px", md: "40px" }}
					>
						<Box
							w={{ base: "380px", md: "486px" }}
							h="auto"
							borderRadius="32px"
							px="22px"
							py={{ base: "20px", md: "41px" }}
							bg="white"
						>
							<Text
								color="#0D2F48"
								fontFamily="body"
								fontWeight="bold"
								fontSize="24px"
							>
								Registration successful
							</Text>
							<Text fontFamily="body" fontSize="16px" color="#1C496A">
								Hi {firstname} {lastname},
							</Text>
							<Text
								fontFamily="body"
								fontSize="16px"
								fontWeight="semibold"
								color="#1C496A"
							>
								Congratulations!
							</Text>

							<Text
								fontFamily="body"
								fontSize="16px"
								color="#1C496A"
								mt="5px"
								mb={{ base: "10px", md: "30px" }}
								onClick={redirectToChat}
							>
								Thank you for reading and consenting to our "Terms of Service" &
								"Privacy Policy" documents as part of your registration process.
								Your registration has been successful completed. Your Unique
								Identification is {UIN}.
							</Text>
							<Text
								color="#0D2F48"
								fontFamily="body"							
								cursor="pointer"
								textUnderlineOffset="2px"
								onClick={redirectToChat}
							>
								Please click on the <Text as="span" fontWeight="extrabold">"Place Direct Order"</Text> button to discuss options we offer for large value transactions,  payment options including interac, bill payment and bank transfers.
							</Text>

							<Box
								display="flex"
								pt="30px"
								pb="30px"
								alignItems="center"
								justifyContent="center"
							>
								<Button
									onClick={redirectToChat}
									bg="#D6333A"
									color="#fff"
									borderRadius="30px"
									_hover={{ color: "#000", bg: "#F8FDFB", border: "1px" }}
								>
									Place Direct Order
								</Button>
							</Box>
							<Box
								display="flex"
								flexDirection="column"
								pb="30px"
								alignItems="center"
								justifyContent="center"
							>
								<Text fontFamily="body" fontSize="16px" color="#1C496A">
									Welcome to Safe and Accountable trade.
								</Text>
								<Text fontFamily="body" fontSize="16px" color="#1C496A">
									Welcome to Ozone Pro-Financial
								</Text>
							</Box>
						</Box>
					</Flex>
				</Box>
			</Flex>
		</Box>
	);
};

export default RegistrationSuccess;
