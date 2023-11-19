import { useState, useEffect } from 'react'

function SearchResult(props) {
  const [search, setSearch] = useState()

  return (
    <div className='SearchResult'>
      {props.onSearch &&
        props.onSearch.map((item) => {
          return (
            <p>
              {item.artist} & {item.song}
            </p>
          )
        })}
    </div>
  )
}

export default SearchResult
