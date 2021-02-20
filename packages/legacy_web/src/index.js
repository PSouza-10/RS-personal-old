import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import axios from 'axios'
import url from './urlConfig'
import ActionProvider from './actions'

axios.defaults.baseURL = url
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ActionProvider>
        <App />
      </ActionProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
