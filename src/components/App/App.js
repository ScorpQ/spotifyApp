// Client Imports
import { useState, useEffect } from 'react'
import Spotify from '../Services'
import Playlist from '../Playlist'
import SearchModel from '../SearchModal'
import { useParams } from 'react-router-dom'

// Mantine Imports
import { Box, Flex } from '@mantine/core'

function App() {
  const queryParameters = new URLSearchParams(window.location.search)
  const type = queryParameters.get('code')
  let token = ''
  const [myPlaylist, setmMyPlaylist] = useState() // XXXX
  const [favTrack, setFavTrack] = useState([]) // XXXX

  const yetki = async () => {
    Spotify.redirectToPage()
  }
  /*
  useEffect(() => {
    const heral = async () => {
      token = await Spotify.getTokenPCKE()
      console.log(token)
      console.log('type var')
    }

    type && heral()
  }, [type])
    */
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
      <SearchModel tokenData={token} />
      <Box w={1200}>
        <Playlist data={myPlaylist} />
      </Box>
      <button onClick={yetki}>yetkilendir</button>
    </Flex>
  )
}

export default App
