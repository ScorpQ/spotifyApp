import { useState, useEffect } from 'react'
import SearchBar from '../Searchbar/SearchBar'
import Spotify from '../Services/Spotify'
import './App.css'

function App() {
  const [search, setSearch] = useState()

  const handleChange = (parameter) => {
    setSearch(parameter)
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await Spotify.getSearch(search)
      console.log(result)
    }

    fetchData()
  }, [search])

  return (
    <div className='App'>
      <SearchBar handleChange={handleChange} />
    </div>
  )
}

export default App
