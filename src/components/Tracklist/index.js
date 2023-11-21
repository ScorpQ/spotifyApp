import Track from '../Track'

const Tracklist = (props) => {
  return (
    <div className='Tracklist'>
      <Track onSearch={props.onSearch} />
    </div>
  )
}

export default Tracklist
