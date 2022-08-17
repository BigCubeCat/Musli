import React from "react";
import Rate from '../ColorPicker/Rate';

export default function Row({ toggleMe, song }) {
  return (
    <div key={song.id} className="Song">
      <div className="container">
        <button className="PlayButton" onClick={toggleMe}>
          <img src="/icons/play.svg" />
        </button>
        <div className="SongInfo">
          <div>{song.name}</div>
          <div className="Text">{song.author}</div>
        </div>
      </div>
      <div>
        <Rate combination={song.combination} />
        {/* TODO: Оценка */}
      </div>
    </div >
  )
}

