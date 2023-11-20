import { useState, useEffect, useCallback } from 'react'
import SearchBar from '../Searchbar'
import Spotify from '../Services'
import SearchResult from '../Searchresult/SearchResults'
import Playlist from '../Playlist'
import './App.css'

function App() {
  const [search, setSearch] = useState()

  const searchWord = async (term) => {
    const searchResults = await Spotify.getSearch(term)
    setSearch(searchResults)
  }

  return (
    <div className='App'>
      <SearchBar onChange={searchWord} />
      <>
        <SearchResult onSearch={search} />
      </>
    </div>
  )
}

export default App
