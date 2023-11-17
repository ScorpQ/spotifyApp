import { useState, useEffect } from 'react'

function SearchBar({ handleChange }) {
  return (
    <div className='SearchBar'>
      <input
        onChange={({ target }) => {
          handleChange(target.value)
        }}
        type='text'
      />
    </div>
  )
}

export default SearchBar
