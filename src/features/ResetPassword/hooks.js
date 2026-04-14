import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { resetPassword } from "../../services/authService";
import Router, { useRouter } from "next/router";

export default function resetPasswordHooks() {
  const router = useRouter();
  const { email } = router.query;
  const toast = useToast();

  const [resetPasswordDetails, setResetPasswordDetails] = useState({
    token: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setResetPasswordDetails((prev) => ({ ...prev, [name]: value }));
  };

  const { isLoading, mutate } = useMutation(resetPassword, {
    onSuccess: (data) => {
      toast({
        position: "top",
        title: "Success",
        description: data?.message || "Password reset successful.",
        status: "success",
        variant: "top-accent",
        isClosable: true,
      });
      router.push("/login");
    },
    onError: ({ response }) => {
      toast({
        position: "top",
        title: "Error",
        description: response?.data?.message || "Something went wrong.",
        status: "error",
        variant: "top-accent",
        isClosable: true,
      });
    },
  });

  const handleContinue = (event) => {
    event.preventDefault();

    if (!email) {
      toast({ title: "Missing Email", status: "error" });
      return;
    }

    if (resetPasswordDetails.password !== resetPasswordDetails.confirmPassword) {
      toast({ title: "Passwords mismatch", status: "error" });
      return;
    }

    mutate({
      email: email,
      token: resetPasswordDetails.token,
      newPassword: resetPasswordDetails.password,
    });
  };

  return {
    handleChange,
    handleContinue,
    isLoading,
    resetPasswordDetails,
  };
}
