// Client Imports
import { useRef, useState } from 'react'
import Track from '../Track'
import Spotify from '../Services'

// Mantine Imports
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, TextInput, Flex, Box, Divider, Text, RadioGroup, Radio } from '@mantine/core'

const Search = ({ onNewPlaylistReceived }) => {
  const myRef = useRef(null) // It counts input length
  const playlistNameRef = useRef(null)
  const [tracksData, setTracksData] = useState(null) // It holds track's data obtained as result of search
  const [createPlaylist, setCreatePlaylist] = useState([]) // It holds list of tracks selected from the search result
  const [playlistDescrib, setPlaylistDescrib] = useState()
  const [value, setValue] = useState('react')
  const [opened, { open, close }] = useDisclosure(false) //Mantine Hook

  // Input validation
  const form = useForm({
    validate: {
      name: (value) => (!value.length ? 'Playlist ismi boş kalamaz' : null),
    },
  })

  // It sends get request and it views search result according to search word.
  const listTracks = async (searchWord) => {
    return await Spotify.getSearchResult(searchWord)
  }

  // if içerisinde inputa veri mi eklendi yoksa silindi mi ona bakılır. Bu belirlemeye göre useRef ile tutulan
  // counter güncellenir. Böylece ancak 3. karakterden sonra get isteği atılır.
  const searchChange = async () => {
    const response = myRef.current.value.length > 3 ? await listTracks(myRef.current.value) : null
    setTracksData(response)
  }

  const addToList = (track) => {
    !createPlaylist.includes(track) && setCreatePlaylist((prevList) => [...prevList, track])
  }

  const removeFromList = (track) => {
    setCreatePlaylist(
      createPlaylist.filter((item) => {
        return item !== track
      })
    )
  }

  const savePlaylist = async () => {
    const token = await Spotify.getTokenPCKE()
    console.log(await Spotify.createPlaylist(playlistNameRef.current.value, playlistDescrib, createPlaylist, token))
    onNewPlaylistReceived(await Spotify.getPlaylist())
  }

  return (
    <>
      <Button my={10} onClick={open}>
        Create Playlist
      </Button>

      <Modal opened={opened} onClose={close} title='Create Your Playlist'>
        <form onSubmit={form.onSubmit(console.log)}>
          {createPlaylist.length !== 0 && (
            <Flex direction={'column'}>
              <Text fw={500} mx={'md'}>
                Create Section
              </Text>
              <Button type='submit' variant='filled' color='teal' size='md' onClick={savePlaylist} mb={'md'} mx={'md'}>
                Create Playlist
              </Button>
              <TextInput
                {...form.getInputProps('name')}
                mx={'md'}
                ref={playlistNameRef}
                size='lg'
                radius='md'
                placeholder='Type Playlist Name'
              />
              <TextInput
                onChange={({ target }) => {
                  setPlaylistDescrib(target.value)
                  console.log(playlistDescrib)
                }}
                mt={'md'}
                mx={'md'}
                ref={myRef}
                size='lg'
                radius='md'
                placeholder='Type Playlist Description'
              />
              <RadioGroup value={value} onChange={setValue} required>
                <Radio value='true' label='public' />
                <Radio value='false' label='private' />
              </RadioGroup>
              <Divider my='md' />
            </Flex>
          )}
        </form>
        <Text fw={500} mx={'md'}>
          Search Section
        </Text>
        <TextInput
          mb={'md'}
          mx={'md'}
          ref={myRef}
          size='lg'
          radius='md'
          placeholder='Search your track'
          onChange={searchChange}
        />
        <Flex direction={'row'} justify={'space-around'}>
          {tracksData?.data?.tracks?.items?.length > 0 && (
            <Box>
              {tracksData.data.tracks.items.map((item) => {
                return <Track trackData={item} onSearch={true} isAdded={true} onAdd={addToList} />
              })}
            </Box>
          )}
          {createPlaylist && (
            <Box>
              {createPlaylist.map((item) => {
                return <Track trackData={item} onSearch={true} isAdded={false} onRemove={removeFromList} />
              })}
            </Box>
          )}
        </Flex>
      </Modal>
    </>
  )
}

export default Search

{
  /* <Tracklist tracks={props.onFavorite} isAdded={false} onRemove={props.onRemove} /> */
}
