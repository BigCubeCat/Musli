import React from "react";
import Row from './Row';
import { setById, setList } from '../../state/audio';
import { useDispatch } from "react-redux";

const loadData = async (combination = '01', limit = 10, page = 0) => {
  return fetch(
    `http://127.0.0.1:5000/songs/combination/${combination}/${page}/${limit}`
  )
    .then(res => res.json())
    .then(json => json)
    .catch(console.error);
}

export default function Playlist() {
  const dispatch = useDispatch();
  const [musicList, setMusicList] = React.useState([]);

  React.useEffect(() => {
    const fetchRequest = async () => {
      const newData = await loadData()
      dispatch(setList(newData.songs))
      console.log(newData)
      setMusicList(newData.songs)
    }
    fetchRequest().catch(console.error)
  }, [])
  return (
    <div className="List">
      {(musicList) && musicList.map((song, id) =>
        <Row key={song.id} song={song} toggleMe={() => dispatch(setById(id))} />
      )}
    </div>
  )
}
