import Track from '../Track'

const Tracklist = (props) => {
  return (
    <div className='Tracklist'>
      {props.tracks &&
        props.tracks.map((item) => {
          return (
            <Track
              isAdded={props.isAdded}
              onAdd={props.onAdd}
              onRemove={props.onRemove}
              item={item}
              artist={item.artist}
              song={item.song}
              image={item.image}
              album={item.album}
              key={item.id}
            />
          )
        })}
    </div>
  )
}

export default Tracklist
