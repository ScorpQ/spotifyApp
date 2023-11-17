import { useState, useEffect } from 'react'

function SearchBar() {

  const test = () => {
    console.log("test")
  }

  return (
    <div className='SearchBar'>
      <input type='text' onChange={test} />
    </div>
  )
}

export default SearchBar
