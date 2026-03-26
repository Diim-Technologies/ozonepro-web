import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const fetchCurrencies = async () => {
  const { data } = await axios.get(`${BASE_URL}/currencies`);
  return data;
};

export const fetchExchangeRates = async () => {
  const { data } = await axios.get(`${BASE_URL}/exchange-rates`);
  return data;
};

export const fetchExchangeDetails = async ({ queryKey }) => {
  const [_, base, target, amount] = queryKey;
  const { data } = await axios.get(
    `${BASE_URL}/exchange-rates/calculate?base=${base}&target=${target}&amount=${amount}`
  );
  return data;
};

export const fetchComingSoonPairs = async () => {
  // Placeholder for now
  return { data: ["USD/CAD", "EUR/CAD", "GBP/CAD"] };
};

export const fetchCurrencyPair = async (base) => {
    const { data } = await axios.get(`${BASE_URL}/exchange-rates`);
    const targets = data.filter(r => r.baseCurrency === base).map(r => r.targetCurrency);
    return { data: targets };
};
