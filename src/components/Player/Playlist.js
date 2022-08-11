import React from "react";
import Row from './Row';

const loadData = (limit = 10, page = 1) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&page=${page}`)
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
      console.log('here')
      console.log(newData)
      setMusicList(newData)
    }
    fetchRequest().catch(console.error)
  }, [])
  return (
    <div className="List">
      {musicList.map(song => <Row key={song.id} song={song} />)}
    </div>
  )
}
