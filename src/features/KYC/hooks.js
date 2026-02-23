import { useState } from "react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { initKyc, setPassword } from "../../services/authService";
import { useRouter } from "next/router";
import exchangeCalculatorHooks from "../../components/ExchangeCalculator/hooks";
import CustomModal from "../../components/Modal";
import Router from "next/router";

export default function kycHooks() {
  const { query, router } = useRouter();
  const toast = useToast();
  const [idType, setIdType] = useState("");
  const [docFile, setDocFile] = useState(null);
  const [passwordScreen, setPasswordScreen] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const handleChange = (event) => {
    setIdType(event.target.value);
  };

  const { isLoading: initKycIsLoading, mutate: initKYCMutation } = useMutation(
    initKyc,
    {
      onSuccess: (data) => {
        console.log(data);
        // Router.push("/");
        setPasswordScreen(true);
      },
      onError: ({ response }) => {
        console.log(response);
        // toastError(null, response);
        toast({
          position: "top",
          title: response?.error?.message,
          status: "error",
          isClosable: true,
        });
      },
    }
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("userId", query.user);
    formData.append("docFile", docFile);
    formData.append("idType", idType);

    initKYCMutation(formData);
  };

  const handleUploadImage = async (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) {
      return;
    }
    setDocFile(imageFile);

    // const imageSizeInMB = imageFile.size / 1024 / 1024;
    // if (imageSizeInMB > 5) {
    //   toastError("Please upload an image that is less than 5MB", null, " ");
    //   return;
    // }
  };

  const { isLoading: passwordIsLoading, mutate: mutatePassword } = useMutation(
    setPassword,
    {
      onSuccess: (data) => {
        // Router.push("/");
        console.log(data.message);
        toast({
          position: "top",
          title: data.message,
          status: "success",
          isClosable: true,
        });

        Router.push("/login");
      },
      onError: ({ response }) => {
        // toastError(null, response);
      },
    }
  );

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    mutatePassword({
      userId: query.user,
      password: passwordValue,
    });
  };

 

  return {
    handleChange,
    handleSubmit,
    handleUploadImage,
    docFile,
    passwordScreen,
    handlePasswordChange,
    handlePasswordSubmit,
    passwordIsLoading,
    initKycIsLoading,
  };
}
