import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { TickSquare } from "react-iconly";
import {
	Flex,
	Box,
	Image,
	HStack,
	Text,
	Spinner,
	Checkbox,
	Select,
	useBreakpointValue,
} from "@chakra-ui/react";
import CustomInput from "../../components/Input";
import { CustomButton } from "../../components/Button";
import signUpHooks from "./hooks";
import CustomModal from "../../components/Modal";
import AuthHero from "../../components/AuthHero";
// import PhoneInput from "react-phone-number-input";
import { FormControl, FormLabel } from "@chakra-ui/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-phone-number-input/style.css";
import dynamic from "next/dynamic";

export default function SignUpPage() {
	const {
		handleChange,
		handleSubmit,
		signUpDetails,
		passwordError,
		profileLoading,
		handleSaveSignUpDetails,
		isSuccess,
		formError,
		phone,
		handleConfirmPasswordChange,
		handlePasswordChange,
		handlePhoneChange,
		handleCheckboxChange,
		disabled,
		passwordMatch,
		handleSubmitTest
	} = signUpHooks();



	const [showPersona, setShowPersona] = useState(false);
	//   const PersonaComponent = dynamic(() => import('../../components/Persona/PersonaComponent'), {
	//     ssr: false
	// })

	useEffect(() => {
		if (isSuccess) {
			setShowPersona(true);
		} else {
			setShowPersona(false);
		}
	}, [isSuccess]);

	const hideBox = useBreakpointValue({ base: false, md: true });

	console.log(formError)
	return (
		<Box>
			<Flex h="100vh">
				<Box
					// py="56px"
					// px="38px"
					h="100vh"
					w={{ base: "full", md: "50%" }}
					display={{ base: "none", lg: "flex" }}
					alignItems="center"
				>
					<AuthHero />
				</Box>
				<Box
					overflowY="scroll"
					w={{ base: "full", lg: "50%" }}
					p={{ base: "10px", md: "30px" }}
				>
					<Box w={{ base: "full", md: "80%" }} mx="auto">
						<Image src="/images/ozone-pro-logo.png" h="100px" w="135px" />

						<Text
							pt="30px"
							fontSize={24}
							fontWeight={600}
							w={{ base: "full", md: "70%", lg: "50%" }}
							textColor="blue.900"
						>
							Exchange your money with peace of mind
						</Text>

						<Link href={"/login"}>
							<Text cursor={"pointer"} textColor="primary.500" pt="18px">
								Already have an account? Log in
							</Text>
						</Link>

						<Flex w="full" gap="30px">
							<CustomInput
								name="firstname"
								onChange={handleChange}
								label="First Name"
								placeholder="First Name"
								value={signUpDetails?.firstname}
							/>
							<CustomInput
								name="lastname"
								onChange={handleChange}
								label="Last Name"
								placeholder="Last Name"
								value={signUpDetails?.lastname}
							/>
						</Flex>

						<CustomInput
							name="email"
							onChange={handleChange}
							label="Email"
							type="email"
							value={signUpDetails?.email}
							placeholder="example@abc.com"
						/>
						<Box paddingTop="5px">
							{formError.email && (
								<Box style={{ color: "red" }}>{formError.email}</Box>
							)}
						</Box>

						<CustomInput
							name="password"
							onChange={handlePasswordChange}
							label="Password"
							type="password"
							value={signUpDetails?.password}
							placeholder="........."
						/>
						<Box>
							{passwordError && (
								<Box style={{ color: "red" }}>{passwordError}</Box>
							)}
						</Box>
						<CustomInput
							name="confirmPassword"
							onChange={handleConfirmPasswordChange}
							label="Confirm Password"
							type="password"
							placeholder="........."
						/>

						<Box>
							{!passwordMatch && (
								<Box style={{ color: "red" }}>Passwords do not match!</Box>
							)}
						</Box>

						<Box pt="25px">
							<FormControl>
								<Box display="flex" gap="4px">
									<Text pb="2">Phone Number</Text>
									<Text color="red">*</Text>
								</Box>

								<PhoneInput
									international
									country={"ca"}
									value={phone}
									onChange={(value) => handlePhoneChange(value)}
									inputStyle={{
										width: "100%",
										height: "50px",
									}}
									containerStyle={{
										borderWidth: "1px",
										borderColor: "#6CA6D0",
										borderRadius: "6px",
										outline: "none",
									}}
									placeholder="Phone No"
								/>
							</FormControl>
						</Box>

						<Box>
							<CustomInput
								name="sourceOfFund"
								onChange={handleChange}
								label="For your trades with Ozone Pro-Financial Corporation,  what is the source of funds?"
								placeholder=""
								value={signUpDetails?.sourceOfFund}
							/>
						</Box>

						<Box>
							<CustomInput
								name="purchasedFundsUseCase"
								onChange={handleChange}
								label="⁠What do you intend to use the digital assets or fiat money you purchase from Ozone Pro-Financial Corporation for?"
								placeholder=""
								value={signUpDetails?.purchasedFundsUseCase}
							/>
						</Box>

						<HStack pt="25px" spacing={3}>
							<Checkbox onChange={handleCheckboxChange}>
								<Text>
									{" "}
									I agree to the{" "}
									<Link href="/privacy" style={{ color: "#D6333A" }}>
										Privacy Policy
									</Link>{" "}
									and{" "}
									<Link href="/terms" style={{ color: "#D6333A" }}>
										Terms of Service.
									</Link>
								</Text>
							</Checkbox>
						</HStack>

						<Box pt="70px">
							<CustomButton
								isLoading={profileLoading}
								loadingText="Loading..."
								spinner={<Spinner size="sm" />}
								handleClick={() => {
									setShowPersona(true);
									handleSaveSignUpDetails();
									// handleSubmitTest()
								}}
								bg="primary.500"
								isDisabled={disabled}
							>
								Continue
							</CustomButton>
						</Box>
					</Box>
				</Box>
				{/* <PersonaComponent/> */}

				{/* <CustomModal isOpen={isOpen} onClose={onClose} /> */}
			</Flex>
		</Box>
	);
}
