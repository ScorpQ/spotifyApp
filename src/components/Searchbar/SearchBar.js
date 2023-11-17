import { useState, useEffect } from 'react'

function SearchBar() {
  const [search, setSearch] = useState()
  const test = () => {
    console.log('test')
  }

  return (
    <div className='SearchBar'>
      <input type='text' />
    </div>
  )
}

export default SearchBar
