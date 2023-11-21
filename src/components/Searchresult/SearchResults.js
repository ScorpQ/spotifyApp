import { useState, useEffect } from 'react'
import Tracklist from '../Tracklist'

function SearchResult(props) {
  const [search, setSearch] = useState()

  return (
    <div className='SearchResult'>
      <Tracklist tracks={props.onSearch} onAdd={props.onAdd} />
    </div>
  )
}

export default SearchResult
