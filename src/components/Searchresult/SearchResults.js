import { useState, useEffect } from 'react'
import Tracklist from '../Tracklist'

function SearchResult(props) {
  const [search, setSearch] = useState()

  return (
    <div className='SearchResult'>
      <Tracklist onSearch={props.onSearch} />
    </div>
  )
}

export default SearchResult
