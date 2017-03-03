import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import ReduxRouter from './routes'
import configureStore from './store'

const store = configureStore()

const renderComponent = () =>
  <Provider store={store}>
    <ReduxRouter/>
  </Provider>


ReactDOM.render(
  renderComponent(),
  root
)
