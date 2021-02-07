import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import {
  Blog,
  Partners,
  About,
  Article,
  Home,
  Content,
  AccountForms,
  NotFound
} from './Pages'
import { Header } from './components'

import GlobalStyle from './styles/Global'
import { ThemeProvider } from 'styled-components'
import theme from './styles/Theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Switch>
          <Route exact path='/account/:form' component={AccountForms} />
          <Routes />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

function Routes() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/article/:_id' component={Article} />
        <Route exact path='/content/:_id' component={Content} />

        <Route exact path='/about' component={About} />
        <Route exact path='/partners' component={Partners} />
        <Route exact path='/blog' component={Blog} />
        <Route exact path='/' component={Home} />
        <Route exact component={NotFound} />
      </Switch>
    </>
  )
}

export default App
