import { useState, useEffect } from 'react'
import SearchBar from '../Searchbar'
import Spotify from '../Services'
import SearchResult from '../Searchresult'

import './App.css'

function App() {
  const [search, setSearch] = useState()

  const handleChange = async (results) => {
    const result = await Spotify.getSearch(results)
    setSearch(result)
  }

  return (
    <div className='App'>
      <SearchBar handleChange={handleChange} />
      <SearchResult handleResutls={search} />
    </div>
  )
}

export default App
