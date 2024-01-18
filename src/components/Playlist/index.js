import { CustomGroup } from "./customGroup"


const Playlist = ({ data }) => {
  // Mantine Hooks

  return (
    data &&
    data.map((item) => {
      return (
        <CustomGroup item={item}/>
      )
    })
  )
}

export default Playlist

{
  /* <Tracklist tracks={props.onFavorite} isAdded={false} onRemove={props.onRemove} /> */
}
