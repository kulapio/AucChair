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

export default ({ partyId, chair }) => {
  const isWin =
    partyId === chair.winnerParty.id &&
    chair.bidAmount &&
    Math.floor(chair.bidAmount) > 0
  return (
    <Flex
      flexDirection="row"
      flex={1}
      alignItems="center"
      mx="20px"
      style={{ minHeight: '80px', maxHeight: '80px', borderRadius: '4px' }}
      bg={isWin ? colors.tan : colors.oliveBrown}
      p="10px"
    >
      <Flex flex={2} style={{ overflow: 'hidden' }}>
        <Text color={isWin ? colors.darkGreen : 'white'}>{`${chair.id}. ${
          chair.chair
        }`}</Text>
      </Flex>
      <Flex>
        <Flex
          bg="white"
          px="10px"
          mr="5px"
          style={{ borderRadius: '4px', minWidth: '75px' }}
          justifyContent="flex-end"
        >
          <Text lineHeight="40px" color={colors.darkGreen}>{`${Math.floor(
            chair.bidAmount,
          )}m`}</Text>
        </Flex>
        <Flex
          flex={1}
          justifyContent="flex-end"
          style={{ position: 'relative' }}
        >
          {isWin && (
            <Flex style={{ position: 'absolute', left: '10px' }}>
              <Favicon width="23" height="58" />
            </Flex>
          )}
          <PlusButton
            isWin={isWin}
            enable={!isWin}
            onClick={() =>
              !isWin && bid(partyId, chair.id, Math.floor(chair.bidAmount))
            }
          >
            + 10m
          </PlusButton>
        </Flex>
      </Flex>
    </Flex>
  )
}
