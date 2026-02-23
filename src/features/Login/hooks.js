import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { loginUser } from "../../services/authService";
import Router, { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function loginHooks() {
  const { query } = useRouter();
  const router = useRouter();
  const toast = useToast();
  const [loginDetails, setLoginDetails] = useState({
    identifier: "",
    password: "",
  });

  const { userId, handleUserId, clientPhoneNumber } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const { isLoading, mutate } = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log(data);

      localStorage.setItem("OZONE_KEY", data.jwt);

      console.log(data.user.userId);

      handleUserId(data.user.userId);

      const dataFromLocalStorage = JSON.parse(
        localStorage.getItem("transactionDetails")
      );

      console.log(dataFromLocalStorage);

      // const message = `Hi there! I'm interested in exchanging ${dataFromLocalStorage?.exchangeAmount} of ${dataFromLocalStorage?.currency1} to ${dataFromLocalStorage?.currency2}. Can we proceed with the transaction?`;

      // const url = `https://wa.me/${clientPhoneNumber}?text=${message}`;

      // Use router.push to open a new window
      router.push("/dashboard/profile");

      localStorage.removeItem("transactionDetails");
    },
    onError: ({ response }) => {
      toast({
        position: "top",
        title: response?.data.error.message,
        status: "error",
        variant: "top-accent",
        isClosable: true,
      });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    mutate({
      identifier: loginDetails.identifier,
      password: loginDetails.password,
    });
  };

  console.log(userId);

  return {
    handleChange,
    handleSubmit,
    isLoading,
  };
}
