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
  console.log("Payload",payload)
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/profiles`, payload);
  localStorage.setItem("ozone_access_token", data.token);
  localStorage.setItem("UIN", data.UIN);
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/local`,
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

export const setPassword = async (payload) => {
  console.log(payload);
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/profile/user/setpassword`,
    payload
  );
  return data;
};

export const getUser = async (payload) => {
  console.log(payload);
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/profile/user/${payload.queryKey[0]}`
  );
  return data;
};

export const getExchnagesByUserId = async (payload) => {
  const tokenValue = localStorage.getItem("OZONE_KEY");
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/exchanges/user`,
    {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    }
  );
  return data;
};

export const changePassword = async (payload) => {
  console.log(payload);
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/profile/user/changepassword`,
    payload
  );
  return data;
};

export const completePasswordReset = async (payload) => {
  console.log(payload);
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/profile/user/resetpassword`,
    payload
  );
  return data;
};
