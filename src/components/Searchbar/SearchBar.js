import { useState, useCallback } from 'react'

function SearchBar(props) {
  const [term, setTerm] = useState(null)

  const handleTermChange = ({ target }) => {
    setTerm(target.value)
    props.onChange(term)
  }

  return (
    <div className='SearchBar'>
      <input onChange={handleTermChange} type='text' />
    </div>
  )
}

export default SearchBar
