import Track from '../Track'

const Tracklist = (props) => {
  return (
    <div className='Tracklist'>
      {props.tracks &&
        props.tracks.map((item) => {
          return <Track artist={item.artist} song={item.song} image={item.image} album={item.album} id={item.id} />
        })}
    </div>
  )
}

export default Tracklist
