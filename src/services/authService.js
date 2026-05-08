import axios from "axios";
import authedFetch from "../utils/hooks/api";

export const fetchUserDetails = async (payload) => {
  const { data } = await authedFetch.get(``, payload);
  return data;
};

// export const loginUser = async (payload) => {
//   const { data } = await axios.post(``, payload);
//   return data;
// };
export const fetchUserEmail = async (email) => {

    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/profile/findbymail?email=${email}`);
    return data;
}

export const encryptPassword = async (payload) => {
  
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/profile/user/encrypt`, payload);
  return data;
}
export const registerUser = async (payload) => {
  console.log("Payload", payload)
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/register`, payload);
  localStorage.setItem("ozone_access_token", data.accessToken);
  // localStorage.setItem("UIN", data.UIN); // remove if not in response
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`,
    payload
  );
  localStorage.setItem("ozone_access_token", data.accessToken);
  return data;
};

export const verifyEmail = async (payload) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/verify-email`,
    payload
  );
  return data;
};

export const resendOtp = async (payload) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/resend-otp`,
    payload
  );
  return data;
};

export const forgotPassword = async (payload) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/forgot-password`,
    payload
  );
  return data;
};

export const resetPassword = async (payload) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/reset-password`,
    payload
  );
  return data;
};


export const initKyc = async (payload) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/profile/user/kyc`,
    payload
  );
  return data;
};

export const fetchProfile = async () => {
  const { data } = await authedFetch.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/users/profile`
  );
  return data;
};

export const updateProfile = async (payload) => {
  const { data } = await authedFetch.patch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/users/profile`,
    payload
  );
  return data;
};

export const initiateTransfer = async (payload) => {
  const { data } = await authedFetch.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/transfers`,
    payload
  );
  return data;
};

export const fetchTransfers = async () => {
  const { data } = await authedFetch.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/transfers`
  );
  return data;
};

export const getExchnagesByUserId = async () => {
  // The backend currently does not implement the /exchanges/user endpoint.
  // Returning an empty array to prevent 404 Not Found errors on the frontend.
  return { data: [] };
};


