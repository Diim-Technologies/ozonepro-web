import { useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import {
  fetchCurrencies,
  fetchExchangeDetails,
  fetchComingSoonPairs,
  fetchCurrencyPair
} from "../../services/exchangeService";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/UserContext";

export default function exchangeCalculatorHooks() {
  const router = useRouter();
  const { clientPhoneNumber } = useContext(UserContext);
  const [dataFromLocalStorage, setDataFromLocalStorage] = useState({});


  const [exchangeAmount, setExchangeAmount] = useState(0);

  const [exchange, setExchangeDetails] = useState({
    currency1: "NGN",
    currency2: "CAD",
  });


  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = JSON.parse(localStorage.getItem("transactionDetails"));
      setDataFromLocalStorage({ ...data });
    }
  }, [exchangeAmount]);

  const {
    data: currencies,
    // isLoading,
    // error,
  } = useQuery(["availableCurrencies"], fetchCurrencies);

  const {
    data: currencyPair,
    // isLoading,
    // error,
  } = useQuery(["pairCurrencies", exchange?.currency1],() => fetchCurrencyPair(exchange?.currency1));
  const {
    data: comingSoonPairs,
    // isLoading,
    // error,
  } = useQuery("comingsoonPairs", fetchComingSoonPairs);

  const handleExchangeDetails = (event) => {
    const { name, value } = event.target;
    setExchangeDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmountChange = (newValue) => {
    // Remove the minus sign from the input value
    const sanitizedValue = newValue.replace(/-/g, "");

    // Update the input value only if it doesn't contain a minus sign
    if (sanitizedValue !== newValue) {
      setExchangeAmount(sanitizedValue);
    } else {
      setExchangeAmount(newValue);
    }
  };

  const {
    data: exchangeDetails,
    // isLoading,
    // error,
  } = useQuery(
    [
      "exchangeDetails",
      `${exchange.currency1}${exchange.currency2}`,
      exchangeAmount,
    ],
    fetchExchangeDetails,
    {
      enabled: !!exchangeAmount,
      onSuccess: (data) => {
        // handleResponseData(data);
      },
    }
  );

  const transactionDetails = {
    ...exchange,
    ...exchangeDetails,
    exchangeAmount: exchangeAmount,
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(
      "transactionDetails",
      JSON.stringify(transactionDetails)
    );
  }

  // console.log(exchangeDetails);
  // console.log(exchangeAmount);
  // console.log(exchange);

  const handleContinue = (event) => {
    event.preventDefault();
    const message = `Hi there! I'm interested in exchanging ${dataFromLocalStorage?.exchangeAmount} of ${dataFromLocalStorage?.currency1} to ${dataFromLocalStorage?.currency2}. Can we proceed with the transaction?`;

    const url = `https://wa.me/${clientPhoneNumber}?text=${message}`;


    window.open(url, "_blank");
  };

  return {
    exchangeDetails,
    exchange,
    currencies,
    currencyPair,
    comingSoonPairs,
    handleContinue,
    exchangeAmount,
    handleExchangeDetails,
    handleAmountChange,
  };
}
