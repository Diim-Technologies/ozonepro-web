import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 1 day
      staleTime: 1000 * 60 * 60 * 12, // 12 hours
      retry: false,
    },
  },
});

export default queryClient;
