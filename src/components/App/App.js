import { useState, useEffect } from 'react'
import SearchBar from '../Searchbar/SearchBar'
import Spotify from '../Services/Spotify'
import './App.css'

function App() {
  const [search, setSearch] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const result = await Spotify.getSearch()
      console.log(result)
    }

    fetchData()
  }, [])

  return (
    <div className='App'>
      <SearchBar />
    </div>
  )
}

export default App
