import { useState, useEffect } from 'react'
import Tracklist from '../Tracklist'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

function SearchResult(props) {
  const [search, setSearch] = useState()
  const theme = useTheme()

  return (
    <div className='SearchResult'>
      <Tracklist onSearch={search} />
    </div>
  )
}

export default SearchResult
