import { Navbar } from '../components'
import GlobalStyle from '../styles/Global'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/Theme'
import GlobalContext from '../Context'
import { useRouter } from 'next/router'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5000'

function App({ Component, pageProps }) {
  const path = useRouter().pathname

  const noNavbarRoutes = ['/account/login', '/account/register']

  const isNoNavbar = noNavbarRoutes.includes(path)
  return (
    <ThemeProvider theme={theme}>
      <GlobalContext>
        <GlobalStyle />
        {!isNoNavbar && <Navbar />}
        <Component {...pageProps} />
      </GlobalContext>
    </ThemeProvider>
  )
}

export default App
