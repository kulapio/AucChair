import React from 'react'
import styled from 'styled-components'
import { Flex, Button, Text } from 'rebass'
import colors from '../ui/colors'

const PlusButton = styled(Button).attrs({
  bg: colors.oliveGreen,
})`
  transition: 0.2s all;
  &:active {
    background: ${colors.sienna};
    transform: scale(1.1);
  }
`

export default ({ name }) => (
  <Flex
    flexDirection="row"
    flex={1}
    alignItems="center"
    mx="20px"
    style={{ maxHeight: '60px', borderRadius: '4px', overflow: 'hidden' }}
    bg={colors.oliveBrown}
    p="10px"
  >
    <Flex flex={2}>
      <Text color="white">{name}</Text>
    </Flex>
    <Flex bg="white" px="10px" style={{ borderRadius: '4px' }}>
      <Text lineHeight="40px">12m</Text>
    </Flex>
    <Flex flex={1} justifyContent="flex-end">
      <PlusButton>+ 1m</PlusButton>
    </Flex>
  </Flex>
)
