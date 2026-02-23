import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import theme from "../theme/theme";
import QueryClient from "../utils/queries";
import "../styles/globals.css";
import { UserProvider } from "../contexts/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ozone</title>
        <meta name="description" content="Ozone Pro-Financial Services" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ChakraProvider theme={theme}>
        <QueryClientProvider client={QueryClient}>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}
