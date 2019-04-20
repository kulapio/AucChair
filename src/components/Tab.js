import React from 'react'
import styled from 'styled-components'
import { Flex, Button, Text } from 'rebass'
import colors from '../ui/colors'
import { bid } from '../api/api'
import Loadable from 'react-loadable'
import Loading from './Loading'

const PlusButton = styled(Button).attrs(props => ({
  bg: props.isWin ? colors.brick : colors.oliveGreen,
}))`
  transition: 0.2s all;
  ${props =>
    props.enable &&
    `&:active {
    background: ${colors.sienna};
    transform: scale(1.1);
  }`}
`

const Favicon = Loadable({
  loader: () => import('../images/favicon'),
  loading: () => <Loading />,
})

export default ({ partyId, chair }) => (
  <Flex
    flexDirection="row"
    flex={1}
    alignItems="center"
    mx="20px"
    style={{ maxHeight: '60px', borderRadius: '4px' }}
    bg={partyId === chair.winnerParty.id ? colors.tan : colors.oliveBrown}
    p="10px"
  >
    <Flex flex={2} style={{ overflow: 'hidden' }}>
      <Text
        color={partyId === chair.winnerParty.id ? colors.darkGreen : 'white'}
      >{`${chair.id}. ${chair.chair}`}</Text>
    </Flex>
    <Flex>
      <Flex bg="white" px="10px" mr="5px" style={{ borderRadius: '4px' }}>
        <Text lineHeight="40px" color={colors.darkGreen}>{`${Math.floor(
          chair.bidAmount,
        )}m`}</Text>
      </Flex>
      <Flex flex={1} justifyContent="flex-end" style={{ position: 'relative' }}>
        {partyId === chair.winnerParty.id && (
          <Flex style={{ position: 'absolute', left: '10px' }}>
            <Favicon width="23" height="58" />
          </Flex>
        )}
        <PlusButton
          isWin={partyId === chair.winnerParty.id}
          enable={partyId !== chair.winnerParty.id}
          onClick={() =>
            partyId !== chair.winnerParty.id &&
            bid(partyId, chair.id, Math.floor(chair.bidAmount))
          }
        >
          + 1m
        </PlusButton>
      </Flex>
    </Flex>
  </Flex>
)
