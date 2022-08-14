import React from "react";
import Row from './Row';

const loadData = async (combination = '01', limit = 10, page = 0) => {
  return fetch(
    `http://127.0.0.1:5000/songs/combination/${combination}/${page}/${limit}`
  )
    .then(res => res.json()).
    then(json => json)
    .catch(console.error);
}

export default function Playlist() {
  // TODO: Сделать получение выбранного цвета из контекста
  // TODO: При нажатии на элемент отправлять его Row в Player
  const [musicList, setMusicList] = React.useState([]);

  React.useEffect(() => {
    const fetchRequest = async () => {
      const newData = await loadData()
      console.log(newData)
      setMusicList(newData.songs)
    }
    fetchRequest().catch(console.error)
  }, [])
  return (
    <div className="List">
      {(musicList) && musicList.map(song => <Row key={song.id} song={song} />)}
    </div>
  )
}
