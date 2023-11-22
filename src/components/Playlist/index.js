import Tracklist from '../Tracklist'

const Playlist = (props) => {
  return (
    <div className='Playlist'>
      <Tracklist tracks={props.onFavorite} isAdded={false} />
    </div>
  )
}

export default Playlist
