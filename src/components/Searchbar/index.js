import { useState, useCallback } from 'react'

function SearchBar(props) {
  const [term, setTerm] = useState(null)

  const handleTermChange = ({ target }) => {
    setTerm(target.value)
    props.onChange(target.value) /* props.onChange içerisine hook verince ilk data okumuyor searchbar'da. */
  }

  return (
    <div className='SearchBar'>
      <input onChange={handleTermChange} type='text' />
    </div>
  )
}

export default SearchBar
