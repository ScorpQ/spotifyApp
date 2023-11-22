import { useState, useEffect } from 'react'
import Tracklist from '../Tracklist'

function SearchResult(props) {
  return (
    <div className='SearchResult'>
      <Tracklist tracks={props.onSearch} isAdded={true} onAdd={props.onAdd} />
    </div>
  )
}

export default SearchResult
