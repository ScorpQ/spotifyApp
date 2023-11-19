import { useState, useEffect, useCallback } from 'react'
import SearchBar from '../Searchbar/SearchBar'
import Spotify from '../Services/Spotify'
import './App.css'
import SearchResult from '../Searchresult/SearchResults'

function App() {
  const [search, setSearch] = useState()

  const searchWord = async (term) => {
    const searchResults = await Spotify.getSearch(term)
    setSearch(searchResults)
  }

  return (
    <div className='App'>
      <SearchBar onChange={searchWord} />
      <SearchResult onSearch={search} />
    </div>
  )
}

export default App
