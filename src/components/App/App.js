import { useState, useEffect } from 'react'
import SearchBar from '../Searchbar/SearchBar'
import getData from '../Services/Spotify'
import getToken from '../Services/Token'
import './App.css'

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const result = await getToken()
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
