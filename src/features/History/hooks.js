import { useQuery } from "react-query";
import { getExchnagesByUserId } from "../../services/authService";
import { useRouter } from "next/router";

export default function historyHooks() {
  const router = useRouter();

  const {
    data: transactionHistory,
    isLoading,
  
  } = useQuery(["getExchnagesByUserId"], getExchnagesByUserId,);


 

  return {
    transactionHistory,
    isLoading,
  };
}
