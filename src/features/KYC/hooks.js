import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import { initiateKyc, getMyKycStatus } from "../../services/kycService";
import { useRouter } from "next/router";

export default function useKycHooks() {
  const router = useRouter();
  const toast = useToast();
  
  // Query to get current KYC status
  const { data: kycData, isLoading: isKycLoading } = useQuery(
    "kyc-status",
    getMyKycStatus,
    {
      retry: false,
      refetchOnWindowFocus: true,
    }
  );

  const { isLoading: isInitiating, mutate: startKyc } = useMutation(
    initiateKyc,
    {
      onSuccess: (data) => {
        // Didit returns { message, kycId, sessionId, verificationUrl }
        if (data.verificationUrl) {
          window.location.href = data.verificationUrl;
        } else {
          toast({
            title: "Error",
            description: "Could not retrieve verification URL.",
            status: "error",
          });
        }
      },
      onError: (error) => {
        const message = error.response?.data?.message || "Failed to initiate KYC.";
        toast({
          title: "KYC Error",
          description: message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const handleStartVerification = (workflowId) => {
    // You can pass a fallback callback URL if needed
    const callback = `${window.location.origin}/dashboard`;
    startKyc({ workflowId, callback });
  };

  return {
    kycData,
    isKycLoading,
    isInitiating,
    handleStartVerification,
  };
}
