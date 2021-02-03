import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Blog, Partners, About, Article, Home, Content } from './Pages'
import { Header } from './components'

import GlobalStyle from './styles/Global'
import { ThemeProvider } from 'styled-components'
import theme from './styles/Theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Header />

        <Routes />
      </Router>
    </ThemeProvider>
  )
}

function Routes() {
  return (
    <>
      <Route exact path='/article/:_id' component={Article} />
      <Route exact path='/content/:_id' component={Content} />
      <Route exact path='/about' component={About} />
      <Route exact path='/partners' component={Partners} />
      <Route exact path='/blog' component={Blog} />
      <Route exact path='/' component={Home} />
    </>
  )
}

export default App
