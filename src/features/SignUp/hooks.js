import { useState, useContext, useEffect, useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
	encryptPassword,
	fetchUserEmail,
	registerUser,
} from "../../services/authService";
import Router, { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import exchangeCalculatorHooks from "../../components/ExchangeCalculator/hooks";
import CustomModal from "../../components/Modal";
import { UserContext } from "../../contexts/UserContext";
import * as crypto from "crypto-js";
import axios from "axios";

export default function signUpHooks() {
	const router = useRouter();

	const toast = useToast();

	const { clientPhoneNumber } = useContext(UserContext);

	const [dataFromLocalStorage, setDataFromLocalStorage] = useState({});

	useEffect(() => {
		if (typeof window !== "undefined") {
			const data = JSON.parse(localStorage.getItem("transactionDetails"));
			setDataFromLocalStorage({ ...data });
		}
	}, []);

	const saveSignUpDetailsToLocalStorage = () => {
		try {
			// Encrypt the password using the encryptPassword mutation
			// encryptMutatation({data:signUpDetails?.password});
			console.log(process.env.NEXT_PUBLIC_ENCRYPT_SECRET_KEY);
			const encrypted = crypto.AES.encrypt(
				signUpDetails?.password,
				"F8UzYOzj%#$%^^&*&7pWRCOBNlgQ6tXF3p8Oc4"
			).toString();
			console.log("Encrypted", encrypted);
			// Create a new object with the encrypted password
			const encryptedSignUpDetails = {
				...signUpDetails,
				password: encrypted,
			};

			// Store the encrypted signUpDetails object in localStorage
			const signUpDetailsString = JSON.stringify(encryptedSignUpDetails);
			localStorage.setItem("signup-details", signUpDetailsString);

			Router.push("/verify");
		} catch (error) {
			// Handle any error that occurred during encryption
			console.error("Error encrypting password:", error);
		}
		// const signUpDetailsString = JSON.stringify(signUpDetails);
		// localStorage.setItem("signup-details", signUpDetailsString);
		// Router.push('/verify')
	};

	const [signUpDetails, setSignUpDetails] = useState({
		firstname: "",
		lastname: "",
		phone: "",
		email: "",
		password: "",
		phone: "",
		personaInquiryId: "",
		kycVerificationState: "",
		sourceOfFund: "",
		purchasedFundsUseCase: "",
	});

	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const validateEmail = (email) => {
		if (!email) {
			return "E-mail is required";
		}

		if (!regex.test(email)) {
			return "E-mail is invalid";
		}
	};

	const [formError, setFormError] = useState({
		firstname: "",
		lastname: "",
		phone: "",
		email: "",
		password: "",
		kycVerificationState: "",
		sourceOfFund: "",
		purchasedFundsUseCase: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name == "email") {
			let error = validateEmail(value);
			if (error) {
				setFormError((prev) => ({ ...prev, [name]: error }));
			} else {
				setFormError((prev) => ({ ...prev, [name]: "" }));
			}

			console.log(error);
		}
		setSignUpDetails((prev) => ({ ...prev, [name]: value }));
	};

	const [isChecked, setIsChecked] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);
	const [oldPassword, setOldPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [emailExist, setEmailExist] = useState(true);
	const [emailverifyData, setEmailVerifyData] = useState();
	const [passwordError, setPasswordError] = useState("");

	const {
		isLoading: encrypting,
		mutate: encryptMutatation,
		data: encryptedData,
	} = useMutation(encryptPassword);

	const handlePasswordChange = (event) => {
		const { name, value } = event.target;

		setOldPassword(value);

		setSignUpDetails((prev) => ({
			...prev,
			[name]: value,
		}));

		// Password complexity check
		const isPasswordComplex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
				value
			);

		// Set the error message if password complexity is not met
		setPasswordError(
			isPasswordComplex
				? ""
				: "Password should include uppercase and lowercase letters, numbers, special characters, and be at least 8 characters long."
		);
	};

	const handleConfirmPasswordChange = (event) => {
		const { name, value } = event.target;

		setConfirmPassword(value);
	};

	const handlePhoneChange = (value) => {
		setSignUpDetails((prev) => ({ ...prev, phone: value }));
	};

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	const { isLoading, mutate } = useMutation(registerUser, {
		onSuccess: ({ message }) => {
			setIsSuccess(true);
			const customMessage = `Hi there! I'm interested in exchanging ${dataFromLocalStorage?.exchangeAmount} of ${dataFromLocalStorage?.currency1} to ${dataFromLocalStorage?.currency2}. Can we proceed with the transaction?`;

			const url = `https://wa.me/${clientPhoneNumber}?text=${customMessage}`;

			localStorage.removeItem("transactionDetails");
			toast({
				title: message,
				position: "top",
				status: "success",
				variant: "top-accent",
				isClosable: true,
			});

			// window.open(url, "_blank");
		},
		onError: ({ response }) => {
			console.log(response);

			setIsSuccess(false);

			toast({
				title: response.data.message,
				position: "top",
				status: "error",
				variant: "top-accent",
				isClosable: true,
			});
		},
	});

	const handleVerifyEmail = async () => {
		fetchProfile();
	};

	const fetchProfile = async () => {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_API_URL}/profile/findbymail?email=${signUpDetails?.email}`
		);
		setEmailVerifyData(data);
		return data;
	};

	const { data, isLoading: profileLoading } = useQuery("email", fetchProfile);

	const handleSaveSignUpDetails = () => {
		handleVerifyEmail();
		if (oldPassword === confirmPassword) {
			setPasswordMatch(true); // Reset the passwordMatch state to true when the password changes
			if (emailverifyData?.type == "DUPLICATE_MAIL_ERROR") {
				setEmailExist(true);
				setSignUpDetails({
					firstname: "",
					lastname: "",
					phone: "",
					email: "",
					password: "",
					phone: "",
					personaInquiryId: "",
					kycVerificationState: "",
				});
				toast({
					title: emailverifyData.message,
					position: "top",
					status: "error",
					variant: "top-accent",
					isClosable: true,
				});
			} else {
				// encryptMutatation({data:signUpDetails.password})

				saveSignUpDetailsToLocalStorage();
			}
		} else {
			setPasswordMatch(false); // Reset the passwordMatch state to false when the
		}
	};

	const handleSubmit = (personaInquiryId, kycVerificationState) => {
		localStorage.setItem("UIN", personaInquiryId);
		localStorage.setItem("firstName", signUpDetails?.firstname);
		localStorage.setItem("lastName", signUpDetails?.lastname);

		const newDetails = JSON.parse(localStorage.getItem("signup-details"));
		newDetails.personaInquiryId = personaInquiryId;
		newDetails.kycVerificationState = kycVerificationState;
		mutate({ data: { ...newDetails } });
		Router.push("/registration-success");
	};

	const handleSubmitTest = () => {
		const newDetails = {
			firstname: "Test",
			lastname: "test",
			phone: "09034678908",
			email: "testgmail.com",
			password: "!Pass1234",
			personaInquiryId: "inq_5LBB7Bd1LZEG2kyGR9YZcZWt",
			kycVerificationState: "I dont know",
			sourceOfFund: "I dont know",
			purchasedFundsUseCase: "I dont know",
		};

		mutate({ data: { ...newDetails } });
	};

	const disabled =
		isChecked ||
		!signUpDetails?.password ||
		!signUpDetails?.email ||
		!signUpDetails?.firstname ||
		!signUpDetails?.lastname ||
		!signUpDetails?.phone ||
		!signUpDetails?.purchasedFundsUseCase ||
		!signUpDetails?.sourceOfFund;

	return {
		handleChange,
		encrypting,
		signUpDetails,
		passwordError,
		handleSubmit,
		handleSaveSignUpDetails,
		isSuccess,
		isLoading,
		profileLoading,
		handlePasswordChange,
		handleConfirmPasswordChange,
		handlePhoneChange,
		handleCheckboxChange,
		disabled,
		confirmPassword,
		passwordMatch,
		handleSubmitTest,
		formError,
	};
}
