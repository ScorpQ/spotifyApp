import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { Card, Image, Text, Box, Flex } from '@mantine/core'

const Track = ({ isAdded, onAdd, onRemove, onSearch, trackData }) => {
  const addTrack = () => {
    onAdd(trackData)
  }

  const removeTrack = () => {
    onRemove(trackData)
  }

  const renderAction = () => {
    return isAdded ? <AddCircleOutlineIcon onClick={addTrack} /> : <RemoveCircleOutlineIcon onClick={removeTrack} />
  }

  return (
    <Card shadow='sm' radius='md' withBorder style={{ flexDirection: 'row' }}>
      <Flex mih={50} gap='md' justify='flex-start' align='flex-start' direction='row' wrap='wrap' miw={'100%'}>
        <Box h={160} w={160} display={'flex'} style={{ alignItems: 'center' }}>
          <Image
            src={onSearch ? trackData.album.images[0].url : trackData.image}
            alt={onSearch ? trackData.name : trackData.name}
          />
        </Box>
        <Box>
          <Text fw={500}>{trackData.name}</Text>
          <Text size='sm' c='dimmed'>
            {onSearch ? trackData.artists[0].name : trackData.artist}
          </Text>
        </Box>
        {onSearch && renderAction()}
      </Flex>
    </Card>
  )
}

export default Track
