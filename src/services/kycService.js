import axios from "axios";
import authedFetch from "../utils/hooks/api";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const initiateKyc = async (payload) => {
  // payload: { workflowId, callback }
  const { data } = await authedFetch.post(`${BASE_URL}/kyc/initiate`, payload);
  return data;
};

export const getMyKycStatus = async () => {
  const { data } = await authedFetch.get(`${BASE_URL}/kyc/me`);
  return data;
};

// Admin services (if needed on frontend)
export const getAllKycs = async (params) => {
  const { data } = await authedFetch.get(`${BASE_URL}/kyc/admin/all`, { params });
  return data;
};

export const updateKycStatus = async (id, status) => {
  const { data } = await authedFetch.patch(`${BASE_URL}/kyc/admin/${id}/status`, { status });
  return data;
};
