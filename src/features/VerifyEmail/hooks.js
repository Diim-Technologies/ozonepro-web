import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { verifyEmail, resendOtp } from "../../services/authService";

export default function verifyHooks() {
  const router = useRouter();
  const toast = useToast();
  const { email } = router.query;
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const { isLoading: isVerifying, mutate: mutateVerify } = useMutation(
    verifyEmail,
    {
      onSuccess: (data) => {
        toast({
          title: "Verification Successful!",
          description: "Your email has been verified. Welcome to Ozone!",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
        
        // Wait a bit to show success then redirect to login or dashboard
        setTimeout(() => {
          router.push("/login"); // User can log in now
        }, 1500);
      },
      onError: (error) => {
        const message = error.response?.data?.message || "Verification failed. Please try again.";
        toast({
          title: "Error",
          description: message,
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const { isLoading: isResending, mutate: mutateResend } = useMutation(
    resendOtp,
    {
      onSuccess: () => {
        toast({
          title: "OTP Resent",
          description: "A new verification code has been sent to your email.",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
        setTimer(60); // Reset timer
      },
      onError: (error) => {
        const message = error.response?.data?.message || "Failed to resend OTP.";
        toast({
          title: "Error",
          description: message,
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const handleVerify = () => {
    if (!email) {
      toast({
        title: "Missing Email",
        description: "Could not find email address for verification.",
        status: "error",
      });
      return;
    }
    mutateVerify({ email, otp });
  };

  const handleResendOtp = () => {
    if (!email) {
      toast({
        title: "Missing Email",
        description: "Could not find email address to resend OTP.",
        status: "error",
      });
      return;
    }
    mutateResend({ email });
  };

  return {
    otp,
    setOtp,
    handleVerify,
    handleResendOtp,
    isVerifying,
    isResending,
    email,
    timer,
  };
}
