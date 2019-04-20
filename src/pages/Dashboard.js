import React from 'react'
import { Flex, Text } from 'rebass'
import Loadable from 'react-loadable'
import Loading from '../components/Loading'

const Tab = Loadable({
  loader: () => import('../components/Tab'),
  loading: () => <Loading />,
})

export default () => {
  const list = [
    'The Universe  ',
    'including planets, stars, galaxies,',
    'comprises all of space and time',
    ' astronomical observations led',
  ]
  return (
    <Flex flexDirection="column" width={1} pt="20px">
      {list.map((name, i) => (
        <Flex key={i} mt="20px">
          <Tab name={name} />
        </Flex>
      ))}
      <Loading size="128px" />
    </Flex>
  )
}
