import { useState } from "react";
import { useMutation } from "react-query";
import { registerUser } from "../../services/authService";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

export default function signUpHooks() {
  const router = useRouter();
  const toast = useToast();

  const [signUpDetails, setSignUpDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUpDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setSignUpDetails((prev) => ({ ...prev, phone: value }));
  };

  const { isLoading, mutate } = useMutation(registerUser, {
    onSuccess: (data, variables) => {
      toast({
        title: "Account Created",
        description: data.message || "Your account has been created successfully. Please verify your email.",
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Redirect to verification instead of login
      router.push(`/verify-email?email=${variables.email}`);
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Registration failed. Please try again.";
      toast({
        title: "Error",
        description: message,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (signUpDetails.password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        status: "error",
      });
      return;
    }

    mutate(signUpDetails);
  };

  const disabled =
    !signUpDetails.firstName ||
    !signUpDetails.lastName ||
    !signUpDetails.email ||
    !signUpDetails.phone ||
    !signUpDetails.password ||
    signUpDetails.password !== confirmPassword;

  return {
    signUpDetails,
    setSignUpDetails,
    confirmPassword,
    setConfirmPassword,
    handleChange,
    handlePhoneChange,
    handleSubmit,
    isLoading,
    disabled,
  };
}
