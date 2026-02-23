import { extendTheme } from "@chakra-ui/react";
import "@fontsource/figtree";

const theme = extendTheme({
  colors: {
    black: "#000000",
    white: "#FFFFFF",
    offwhite: "#F8FDFB",
    primary: {
      50: "#FFEDEE",
      100: "#FFC4C7",
      200: "#FF9CA0",
      300: "#FF7379",
      400: "#F84950",
      500: "#D6333A",
      600: "#B42127",
      700: "#921318",
      800: "#70080D",
      900: "#4E0105",
    },
    blue: {
      50: "#F5FAFF",
      100: "#DEF1FF",
      200: "#C8E7FF",
      300: "#B1DEFF",
      400: "#93CAF2",
      500: "#6CA6D0",
      600: "#4C84AE",
      700: "#31658C",
      800: "#1C496A",
      900: "#0D2F48",
    },
  },
  fonts: {
    body: "Figtree, sans-serif",
    heading: "Figtree, sans-serif",
  },
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    "2xl": "1366px",
    "3xl": "1440px",
    "4xl": "1556px",
  },
});

export default theme;
