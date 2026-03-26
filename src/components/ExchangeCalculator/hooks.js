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
  const { user } = useContext(UserContext);
  const [exchangeAmount, setExchangeAmount] = useState(100);

  const [exchange, setExchangeDetails] = useState({
    currency1: "USD", // Default to USD if available
    currency2: "NGN",
  });

  const { data: currencies } = useQuery(["availableCurrencies"], fetchCurrencies);

  // Auto-set first available currency if not set
  useEffect(() => {
    if (currencies?.length > 0 && !exchange.currency1) {
      setExchangeDetails(prev => ({ ...prev, currency1: currencies[0].code }));
    }
  }, [currencies]);

  const { data: currencyPair } = useQuery(
    ["pairCurrencies", exchange?.currency1],
    () => fetchCurrencyPair(exchange?.currency1),
    { enabled: !!exchange?.currency1 }
  );

  const { data: comingSoonPairs } = useQuery("comingsoonPairs", fetchComingSoonPairs);

  const handleExchangeDetails = (event) => {
    const { name, value } = event.target;
    setExchangeDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmountChange = (newValue) => {
    if (newValue === "" || newValue === null) {
        setExchangeAmount(0);
        return;
    }
    const sanitizedValue = String(newValue).replace(/-/g, "");
    setExchangeAmount(Number(sanitizedValue));
  };

  const { data: exchangeDetails } = useQuery(
    ["exchangeCalculate", exchange.currency1, exchange.currency2, exchangeAmount],
    fetchExchangeDetails,
    {
      enabled: !!exchangeAmount && !!exchange.currency1 && !!exchange.currency2,
    }
  );

  const handleContinue = (event) => {
    event.preventDefault();
    
    // Store details for the transfer page
    const transactionDetails = {
      senderCurrency: exchange.currency1,
      destinationCurrency: exchange.currency2,
      amount: exchangeAmount,
      ...exchangeDetails,
    };
    
    localStorage.setItem("pendingTransfer", JSON.stringify(transactionDetails));

    if (user) {
      router.push("/dashboard/transfers");
    } else {
      router.push("/signup");
    }
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
