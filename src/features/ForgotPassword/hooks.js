import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { changePassword } from "../../services/authService";
import Router, { useRouter } from "next/router";

export default function changePasswordHooks() {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  // console.log(email);

  const { isLoading, mutate } = useMutation(changePassword, {
    onSuccess: (data) => {
      toast({
        position: "top",
        title: `${data?.message}. Please check your mail for a link to reset your password.`,
        status: "success",
        variant: "top-accent",
        isClosable: true,
      });
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
      email: email,
    });
  };

  return {
    handleChange,
    handleContinue,
    isLoading,
  };
}
