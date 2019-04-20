import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import styled from 'styled-components'

const loading = <div>...loading</div>

const NotFoundPage = Loadable({
  loader: () => import('./pages/404'),
  loading: () => loading,
})

const Dashboard = Loadable({
  loader: () => import('./pages/Dashboard'),
  loading: () => loading,
})

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/" component={NotFoundPage} />
    </Switch>
  </Router>
)
