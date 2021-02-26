import { Navbar, Loading } from "../components";
import GlobalStyle from "../styles/Global";
import { ThemeProvider } from "styled-components";
import theme from "../styles/Theme";
import GlobalContext from "../Context";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
axios.defaults.baseURL = "http://localhost:5000";

function App({ Component, pageProps }) {
  const router = useRouter();
  const path = router.pathname;
  const [isLoading, setIsLoading] = useState(false);

  const noNavbarRoutes = ["/account/login", "/account/register"];
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setIsLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setIsLoading(false);
    });
    router.events.on("routeChangeError", () => {
      setIsLoading(false);
    });

    return () => {
      router.events.off("routeChangeStart", () => {});
    };
  }, []);
  const isNoNavbar = noNavbarRoutes.includes(path);

  return (
    <ThemeProvider theme={theme}>
      <GlobalContext>
        <GlobalStyle />
        <Loading wholePage isVisible={isLoading} />
        {!isNoNavbar && <Navbar />}
        <Component {...pageProps} />
      </GlobalContext>
    </ThemeProvider>
  );
}

export default App;
