import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { completePasswordReset } from "../../services/authService";
import Router, { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function resetPasswordHooks() {
  const router = useRouter();
  const { query } = useRouter();
  const toast = useToast();

  const [resetPasswordDetails, setResetPasswordDetails] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setResetPasswordDetails((prev) => ({ ...prev, [name]: value }));
  };

  const { token } = query;

  const { isLoading, mutate } = useMutation(completePasswordReset, {
    onSuccess: (data) => {
      // console.log(data);
      toast({
        position: "top",
        title: `${data?.message}`,
        status: "success",
        variant: "top-accent",
        isClosable: true,
      });
      router.push("/login");
    },
    onError: ({ response }) => {
      toast({
        position: "top",
        title: response?.data.message,
        status: "error",
        variant: "top-accent",
        isClosable: true,
      });
    },
  });

  const handleContinue = (event) => {
    event.preventDefault();

    mutate({
      password: resetPasswordDetails.password,
      confirmPassword: resetPasswordDetails.confirmPassword,
      secretToken: token,
    });
  };

  return {
    handleChange,
    handleContinue,
    isLoading,
  };
}
