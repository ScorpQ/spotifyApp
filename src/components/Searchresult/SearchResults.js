import { useState, useEffect } from 'react'
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
      {props.onSearch &&
        props.onSearch.map((item) => {
          return (
            <Card sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component='div' variant='h5'>
                    {item.name}
                  </Typography>
                  <Typography variant='subtitle1' color='text.secondary' component='div'>
                    {item.artist}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                  <IconButton aria-label='previous'>
                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                  </IconButton>
                  <IconButton aria-label='play/pause'>
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <IconButton aria-label='next'>
                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                  </IconButton>
                </Box>
              </Box>
              <CardMedia component='img' sx={{ width: 151 }} image={item.image} alt='Live from space album cover' />
              <AddCircleOutlineIcon
                onClick={() => {
                  console.log('ehe')
                }}
              />
            </Card>
          )
        })}
    </div>
  )
}

export default SearchResult
