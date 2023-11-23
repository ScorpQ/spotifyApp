import { useState, useEffect, useCallback } from 'react'
import SearchBar from '../Searchbar'
import Spotify from '../Services'
import SearchResult from '../Searchresult/SearchResults'
import Playlist from '../Playlist'

function App() {
  const [search, setSearch] = useState()
  const [favTrack, setFavTrack] = useState([])

  // It adds the data coming from SearchBar comp. to API the as a parameter. API result used as parameter with state setter func.
  const searchWord = async (term) => {
    const searchResults = await Spotify.getSearch(term)
    console.log(searchResults)
    setSearch(searchResults)
  }

  // To test if data is coming correctly from SearchResult comp.
  const handleAdd = (track) => {
    console.log(track)
    const test = (element) => element.id === track.id
    setFavTrack((prev) => (!favTrack.some(test) ? [...prev, track] : [...prev]))
  }

  // To test if data is coming correctly the Playlist comp.
  const handleRemove = (track) => {
    setFavTrack(() => [])
  }

  return (
    <div className='App'>
      <SearchBar onChange={searchWord} />
      <div className='App-body'>
        <SearchResult onSearch={search} onAdd={handleAdd} />
        <Playlist onFavorite={favTrack} onRemove={handleRemove} />
      </div>
    </div>
  )
}

export default App
