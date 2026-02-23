import axios from "axios";

export const fetchCurrencies = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/supported-currencies`
  );
  return data;
};


export const fetchCurrencyPair = async (pair) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/exchange-details/base-pairs?basePair=${pair}`
  );
  return data;
};

export const fetchComingSoonPairs = async (pair) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/exchange-details/coming-soon`
  );
  return data;
};

export const fetchExchangeDetails = async (payload) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/exchange-details/currency-pair?pair=${payload.queryKey[1]}&amount=${payload.queryKey[2]}`
  );
  return data;
};

export const createExchange = async (payload) => {
  
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/exchanges`,
    payload
  );
  return data;
};


