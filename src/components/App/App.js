import { useState, useEffect, useCallback } from 'react'
import SearchBar from '../Searchbar/SearchBar'
import Spotify from '../Services/Spotify'
import './App.css'

function App() {
  const [search, setSearch] = useState([])

  const searchWord = async (term) => {
    const searchResults = await Spotify.getSearch(term)
    setSearch(searchResults)
  }

  useEffect(() => {
    console.log(search)
  })

  return (
    <div className='App'>
      <SearchBar onChange={searchWord} />
    </div>
  )
}

export default App
