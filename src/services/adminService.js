import authedFetch from "../utils/hooks/api";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const fetchAdminStats = async () => {
  const { data } = await authedFetch.get(`${BASE_URL}/admin/stats`);
  return data;
};

export const fetchAllUsers = async () => {
  const { data } = await authedFetch.get(`${BASE_URL}/admin/users`);
  return data;
};

export const softDeleteUser = async (id) => {
  const { data } = await authedFetch.delete(`${BASE_URL}/admin/users/${id}`);
  return data;
};

export const fetchAllTransfers = async () => {
  const { data } = await authedFetch.get(`${BASE_URL}/admin/transfers`);
  return data;
};

export const fetchAllKyc = async () => {
  const { data } = await authedFetch.get(`${BASE_URL}/admin/kyc`);
  return data;
};

export const updateTransferStatus = async (id, status) => {
  const { data } = await authedFetch.patch(`${BASE_URL}/admin/transfers/${id}/status`, { status });
  return data;
};

export const updateUserStatus = async (id, status) => {
  const { data } = await authedFetch.patch(`${BASE_URL}/admin/users/${id}/status`, { status });
  return data;
};

export const fetchAllExchangeRates = async () => {
  const { data } = await authedFetch.get(`${BASE_URL}/admin/exchange-rates`);
  return data;
};

export const setExchangeRate = async (payload) => {
  const { data } = await authedFetch.post(`${BASE_URL}/admin/exchange-rates`, payload);
  return data;
};
