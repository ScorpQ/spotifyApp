// Client Imports
import { useRef, useState } from 'react'
import Track from '../Track'
import Spotify from '../Services'

// Mantine Imports
<<<<<<< HEAD
import { useForm } from '@mantine/form'
=======
import { useForm } from '@mantine/form';
>>>>>>> 7984dfa9c8af0a4543fb91e9a88e6d2ebdbf038d
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, TextInput, Flex, Box, Divider, Text } from '@mantine/core'

const Search = ({ tokenData }) => {
  const myRef = useRef(null) // It counts input length
  const [tracksData, setTracksData] = useState(null) // It holds track's data obtained as result of search
  const [createPlaylist, setCreatePlaylist] = useState([]) // It holds list of tracks selected from the search result
  const [playlistName, setPlaylistName] = useState(null)
  const [playlistDescrib, setPlaylistDescrib] = useState()
  const [opened, { open, close }] = useDisclosure(false) //Mantine Hook

<<<<<<< HEAD
  // Input validation
  const form = useForm({
    validate: {
      name: (value) => (value?.length == 0 ? 'Playlist ismi boş kalamaz' : null),
    },
  })
=======
  // Mantine Hook
  const [opened, { open, close }] = useDisclosure(false)
>>>>>>> 7984dfa9c8af0a4543fb91e9a88e6d2ebdbf038d

  // Validation config
  const form = useForm({
    initialValues: { name: '', email: '', age: 0 },

    // Functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      age: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
    },
  });

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
    console.log(await Spotify.createPlaylist(playlistName, playlistDescrib, createPlaylist, token))
  }

  return (
    <>
      <Button my={10} onClick={open}>
        Create Playlist
      </Button>

      <Modal opened={opened} onClose={close} title='Create Your Playlist'>
<<<<<<< HEAD
        <form onSubmit={form.onSubmit(console.log)}>
          <Flex direction={'column'}>
            {createPlaylist.length !== 0 && (
              <>
                <Text fw={500} mx={'md'}>
                  Create Section
                </Text>
                <Button
                  type='submit'
                  variant='filled'
                  color='teal'
                  size='md'
                  onClick={savePlaylist}
                  mb={'md'}
                  mx={'md'}
                >
                  Create Playlist
                </Button>
                <TextInput
                  {...form.getInputProps('name')}
                  onChange={({ target }) => {
                    setPlaylistName(target.value)
                    console.log(playlistName)
                  }}
                  mx={'md'}
                  ref={myRef}
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
                <Divider my='md' />
              </>
            )}
          </Flex>
        </form>
=======
        <Flex direction={'column'}>
          {createPlaylist.length !== 0 && (
            <>
              <Text fw={500} mx={'md'}>
                Create Section
              </Text>
              <Button type='submit' variant='filled' color='teal' size='md' onClick={savePlaylist} mb={'md'} mx={'md'}>
                Create Playlist
              </Button>
              <TextInput
                onChange={({ target }) => {
                  setPlaylistName(target.value)
                  console.log(playlistName)
                }}
                mx={'md'}
                ref={myRef}
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
              <Divider my='md' />
            </>
          )}
        </Flex>
>>>>>>> 7984dfa9c8af0a4543fb91e9a88e6d2ebdbf038d
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
          {/*?.data?.tracks?.items?.length > 0*/}
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
