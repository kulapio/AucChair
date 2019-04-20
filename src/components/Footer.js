import React from 'react'
import { Flex, Text } from 'rebass'
import colors from '../ui/colors'

export default () => (
  <Flex
    flexDirection="column"
    bg={colors.oliveBrown}
    width={1}
    style={{ position: 'absolute', bottom: '-10px', height: '100px' }}
  >
    <Flex flex={2} />
    <Flex flex={1} bg={colors.darkGreen} />
  </Flex>
)
