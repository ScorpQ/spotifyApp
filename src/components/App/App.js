import { useState, useEffect, useCallback } from 'react'
import SearchBar from '../Searchbar'
import Spotify from '../Services'
import SearchResult from '../Searchresult/SearchResults'
import Playlist from '../Playlist'
import './App.css'

function App() {
  const [search, setSearch] = useState()
  const [favTrack, setFavTrack] = useState({})

  // It adds the data coming from SearchBar comp. to API the as a parameter. API result used as parameter with state setter func.
  const searchWord = async (term) => {
    const searchResults = await Spotify.getSearch(term)
    console.log(searchResults)
    setSearch(searchResults)
  }

  // To test if data is coming correctly from SearchResult comp.
  const handleChange = (item) => {
    console.log(item)
  }

  return (
    <div className='App'>
      <SearchBar onChange={searchWord} />
      <div className='body'>
        <SearchResult onSearch={search} onAdd={handleChange} />
        <Playlist />
      </div>
    </div>
  )
}

export default App
