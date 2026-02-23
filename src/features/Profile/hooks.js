import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getUser } from "../../services/authService";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function profileHooks() {
  const router = useRouter();
  const { query } = useRouter();

  const { userId } = useContext(UserContext);

  const {
    data: userProfile,
    isLoading,
    // error,
  } = useQuery([userId], getUser);

  return {
    userProfile,
    isLoading,
  };
}
