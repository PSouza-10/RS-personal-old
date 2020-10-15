import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Blog, Partners, About, Article, Home } from './Pages'
import { Header } from './components'

import GlobalStyle from './styles/Global'
import { ThemeProvider } from 'styled-components'
import returnTheme from './styles/Theme'

function App() {
  const [darkMode, setDarkMode] = React.useState(
    JSON.parse(localStorage.getItem('theme'))
  )

  return (
    <ThemeProvider theme={returnTheme(darkMode)}>
      <Router>
        <GlobalStyle />
        <Header setTheme={setDarkMode} theme={darkMode} />
        <Routes />
      </Router>
    </ThemeProvider>
  )
}

function Routes() {
  return (
    <>
      <Route exact path='/article/:_id' component={Article} />
      <Route exact path='/about' component={About} />
      <Route exact path='/partners' component={Partners} />
      <Route exact path='/blog' component={Blog} />
      <Route exact path='/' component={Home} />
    </>
  )
}

export default App
