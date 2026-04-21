import { useState, useEffect, useContext } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { verifyEmail, resendOtp } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";

export default function verifyHooks() {
  const router = useRouter();
  const toast = useToast();
  const { email } = router.query;
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const { user, handleUser } = useContext(UserContext);

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
          title: "Email Verified!",
          description: "Your email has been verified. Welcome to Ozone!",
          status: "success",
          position: "top",
          duration: 4000,
          isClosable: true,
        });

        // Update the user in context so isEmailVerified becomes true
        // This allows the DashboardLayout guard to pass
        if (user) {
          const updatedUser = { ...user, isEmailVerified: true };
          handleUser(updatedUser);
        }

        // Determine where to send the user:
        // - If they have a token (came from login), go to dashboard
        // - If no token, they need to log in (came from registration)
        const hasToken = !!localStorage.getItem("ozone_access_token");
        setTimeout(() => {
          if (hasToken) {
            const role = user?.role || data?.user?.role;
            if (role === "ADMIN") {
              router.push("/admin");
            } else {
              router.push("/dashboard");
            }
          } else {
            router.push("/login");
          }
        }, 1500);
      },
      onError: (error) => {
        const message =
          error.response?.data?.message ||
          "Verification failed. Please try again.";
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
        setTimer(60); // Reset countdown
      },
      onError: (error) => {
        const message =
          error.response?.data?.message || "Failed to resend OTP.";
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
        position: "top",
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
        position: "top",
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
