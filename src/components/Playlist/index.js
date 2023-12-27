import Tracklist from '../Tracklist'
import { Group, Avatar, Text, Accordion } from '@mantine/core'

const Playlist = ({ data }) => {
  const AccordionLabel = (data) => {
    return (
      <Group wrap='nowrap'>
        <Avatar src={data.image} radius='sm' h='150' w='150' />
        <div>
          <Text size='xl'>{data.name}</Text>
          <Text size='lg' c='dimmed' fw={400}>
            {data.description}
          </Text>
        </div>
      </Group>
    )
  }

  return (
    data &&
    data.map((item) => {
      return (
        <Accordion my={10} chevronPosition='right' variant='contained'>
          <Accordion.Item key={item.id} value={item.name}>
            <Accordion.Control>
              <AccordionLabel {...item} />
            </Accordion.Control>
            <Accordion.Panel>
              <Tracklist playlistId={item.id} />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      )
    })
  )
}

export default Playlist

{
  /* <Tracklist tracks={props.onFavorite} isAdded={false} onRemove={props.onRemove} /> */
}
