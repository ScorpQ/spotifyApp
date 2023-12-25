import { useState, useEffect } from 'react'
import Track from '../Track'
import Spotify from '../Services'

const Tracklist = ({ playlistId }) => {
  const [track, setTrack] = useState()

  useEffect(() => {
    const getTracks = async () => {
      try {
        const response = await Spotify.getTracks(playlistId)
        console.log(response)
        setTrack(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    getTracks()
  }, [])

  return (
    track &&
    track.map((item) => {
      return <Track trackData={item} onSearch={false} />
    })
  )
}

export default Tracklist
