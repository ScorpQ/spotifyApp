// Client Imports
import { useState, useEffect } from 'react'
import Spotify from '../Services'
import Playlist from '../Playlist'
import SearchModel from '../SearchModal'

// Mantine Imports
import { Box, Flex } from '@mantine/core'

function App() {
  // GÜNCEL
  const [myPlaylist, setmMyPlaylist] = useState() // XXXX
  const [favTrack, setFavTrack] = useState([]) // XXXX

  const yetki = async () => {
    Spotify.redirectToPage()
  }

  useEffect(() => {
    // Burada bence parametreolan code var mı yok mu diye kontrol et böylece redirect yap...
    // Veya cookie'de
    const firstAutho = async () => {
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

    // !getCookie(code) ? Spotify.redirectToPage() : console.log("Cookie var")
    firstAutho()
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
    <Flex align={'center'} direction={'column'}>
      <SearchModel onNewPlaylistReceived={setmMyPlaylist} />
      <Box w={1200}>
        <Playlist data={myPlaylist} />
      </Box>
      <button onClick={yetki}>yetkilendir</button>
    </Flex>
  )
}

export default App
