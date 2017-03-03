import React, { Component } from 'react'
import { connect } from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import { Router } from 'react-router'

import { changeLocation } from './ducks'
import Routes from './routes'

const history = createBrowserHistory()

class ReduxRouter extends Component {

  handleLocationChange(location, action) {
    const { dispatch } = this.props

    dispatch(changeLocation(location))
  }

  componentDidMount() {
    this.unsubscribe = history.listen(this.handleLocationChange.bind(this))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  componentWillReceiveProps() {
    console.log('d')
  }

  render() {
    return (
      <Router history={history}>
        <Routes/>
      </Router>
    )

  }
}

export const { push, replace, go, goBack, goForward } = history
export default connect()(ReduxRouter)
