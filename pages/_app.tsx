import { Navbar, Loading, Toast } from "../components";
import GlobalStyle from "../styles/Global";
import { ThemeProvider } from "styled-components";
import theme from "../styles/Theme";
import GlobalContext, { useGlobalContext } from "../Context";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://rs-personal-server.herokuapp.com"
    : "http://localhost:5000";

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
        <Toast />
        {!isNoNavbar && <Navbar />}
        <RevalidateLogin />
        <Component {...pageProps} />
      </GlobalContext>
    </ThemeProvider>
  );
}

const RevalidateLogin = () => {
  const { refreshToken } = useGlobalContext(({ actions }) => actions);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      refreshToken(token);
    }
  }, []);

  return <> </>;
};
export default App;
