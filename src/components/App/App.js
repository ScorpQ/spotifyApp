// Client Imports
import { useState, useEffect, useCallback } from 'react'
import Spotify from '../Services'
import Playlist from '../Playlist'
import SearchModel from '../SearchModal'

// Mantine Imports
import { Box, Flex, Button } from '@mantine/core'

function App() {
  const [myPlaylist, setmMyPlaylist] = useState() // XXXX
  const [favTrack, setFavTrack] = useState([]) // XXXX

  const yetki = () => {
    if (!localStorage.getItem('acces_token')) Spotify.redirectToPage()
  }

  // Fetch data at first render
  useEffect(() => {
    const playlistDetails = async () => {
      try {
        const searchResults = await Spotify.getPlaylist()
        setmMyPlaylist(searchResults)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

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
      <SearchModel />
      <Box w={1200}>
        <Playlist data={myPlaylist} />
      </Box>
      <button onClick={yetki}>yetkilendir</button>
    </Flex>
  )
}

export default App
