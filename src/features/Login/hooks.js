import { useState, useContext } from "react";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { loginUser } from "../../services/authService";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/UserContext";

export default function loginHooks() {
  const router = useRouter();
  const toast = useToast();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const { handleUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const { isLoading, mutate } = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log(data);
      // Backend returns { message, user, accessToken }
      localStorage.setItem("ozone_access_token", data.accessToken);
      localStorage.setItem("user_id", data.user.id);

      handleUser(data.user);
      
      if (data.requiresVerification || !data.user.isEmailVerified) {
        router.push(`/verify-email?email=${data.user.email}`);
        return;
      }

      if (data.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }

      localStorage.removeItem("transactionDetails");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Login failed. Check your credentials.";
      toast({
        position: "top",
        title: message,
        status: "error",
        variant: "top-accent",
        isClosable: true,
      });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    mutate({
      email: loginDetails.email,
      password: loginDetails.password,
    });
  };

  return {
    handleChange,
    handleSubmit,
    isLoading,
  };
}
