import React, { useState, useEffect, useRef } from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from './components/Loading'
import colors from './ui/colors'
import { getParty, getChairs } from './api/api'

const NotFoundPage = Loadable({
  loader: () => import('./pages/404'),
  loading: () => <Loading />,
})

const Dashboard = Loadable({
  loader: () => import('./pages/Dashboard'),
  loading: () => <Loading />,
})

const Nav = Loadable({
  loader: () => import('./components/Nav'),
  loading: () => <Loading />,
})

const Footer = Loadable({
  loader: () => import('./components/Footer'),
  loading: () => <Loading />,
})

const PageContainer = styled(Flex).attrs({
  flexDirection: 'column',
  alignItems: 'center',
})`
  margin: -10px;
  min-height: 100vh;
  background-color: ${colors.bg};
  font-family: Helvetica;
`

const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default () => {
  const partyId =
    (window.location.pathname + window.location.hash)
      .replace(/\D/g, '')
      .split('')[0] || '0'

  const [party, setParty] = useState({
    id: -1,
    name: 'พรรค undefined',
    budget: 0,
  })

  const [chairs, setChairs] = useState([])

  useInterval(() => {
    ;(async () => {
      const chairs = await getChairs()
      const party = await getParty(partyId)

      const stake = chairs
        .filter(chair => chair.winnerParty.id === partyId)
        .map(chair => chair.bidAmount)
        .reduce((a, b) => a - 0 + (b - 0), 0)

      party.budget = party.budget - stake

      setParty(party)
      setChairs(chairs)
    })()
  }, 1000)

  return (
    <PageContainer>
      <Router>
        <Nav party={party} />
        <Switch>
          <Route
            exact
            path="/:id"
            component={() => <Dashboard chairs={chairs} partyId={partyId} />}
          />
          <Route path="/" component={NotFoundPage} />
        </Switch>
      </Router>
      <Footer name={party.name} />
    </PageContainer>
  )
}
