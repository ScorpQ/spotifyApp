// Client Imports
import { useState, useEffect } from 'react'
import Spotify from '../Services'
import Playlist from '../Playlist'
import SearchModel from '../SearchModal'

// Mantine Imports
import { AppShell, Burger, Box, Center, ScrollArea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

function App() {
  const [myPlaylist, setmMyPlaylist] = useState() // XXXX
  const [favTrack, setFavTrack] = useState([]) // XXXX
  const [opened, { toggle }] = useDisclosure() // Mantine Hook

  useEffect(() => {
    const initalActions = async () => {
      if (!document.cookie.split(';').find((eleman) => eleman.includes('redirect'))) {
        Spotify.redirectToPage()
        document.cookie = `redirect=true;`
      }
    }

    const playlistDetails = async () => {
      try {
        const searchResults = await Spotify.getPlaylist()
        setmMyPlaylist(searchResults)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    initalActions()
    playlistDetails()
  }, [])

  // To test if data is coming correctly from SearchResult comp.
  const handleAdd = (track) => {
    console.log(track)
    const test = (element) => element.id === track.id
    setFavTrack((prev) => (!favTrack.some(test) ? [...prev, track] : [...prev]))
  }

  // To test if data is coming correctly the Playlist comp.
  const handleRemove = (track) => {
    let test = (element) => element.id !== track.id
    setFavTrack((favTrack) => favTrack.filter(test))
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 350,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding='md'
    >
      <AppShell.Header bg='var(--mantine-color-gray-light)'>
        <Box pos='relative'>
          <Burger pos='absolute' top='13px' left='10px' opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
          <Center pos='absolute' top='10px' left='calc(50% - 59px)'>
            <SearchModel onNewPlaylistReceived={setmMyPlaylist} />
          </Center>
        </Box>
      </AppShell.Header>
      <AppShell.Navbar p='sm'>
        <ScrollArea h={'100vh'} scrollbarSize={2} scrollHideDelay={0} pr='10'>
          <Playlist data={myPlaylist} />
        </ScrollArea>
      </AppShell.Navbar>
      <AppShell.Main>SELECTED PLAYLIST DATA</AppShell.Main>
    </AppShell>
  )
}

export default App
