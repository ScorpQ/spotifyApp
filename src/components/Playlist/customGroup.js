import { Box, Container, Group, Text, Image } from '@mantine/core'
import { useHover } from '@mantine/hooks'

export function CustomGroup({ item }) {
  const { hovered, ref } = useHover()

  return (
    <Group
      p='10'
      align='flex-start'
      gap='10'
      mb='15'
      ref={ref}
      style={
        hovered
          ? { backgroundColor: 'RGB(219 225 231)', borderRadius: '5px', cursor: 'pointer' }
          : { backgroundColor: 'rgb(242,243,244)', borderRadius: '5px', cursor: 'pointer' }
      }
    >
      <Image h={100} w={100} fit='contain' src={item.image} />
      <Text fw={700} c='black'>
        {item.name}
      </Text>
    </Group>
  )
}
