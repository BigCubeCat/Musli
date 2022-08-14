import React from "react";
import Rate from '../ColorPicker/Rate';

export default function Row({ song }) {
  return (
    <div key={song.id} className="Song">
      <div className="SongInfo">
        <div>{song.name}</div>
        <div className="Text">{song.author}</div>
      </div>
      <div>
        <Rate combination={song.combination} />
        {/* TODO: Оценка */}
      </div>
    </div>
  )
}

