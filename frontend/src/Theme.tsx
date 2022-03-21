import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
const theme = createTheme({
  palette: {
    primary: {
      main: "#1a237e",
    },
    secondary: {
      main: "#e8eaf6",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});

const Theme = ({children}:any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
