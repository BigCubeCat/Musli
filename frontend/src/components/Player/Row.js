import React from "react";

export default function Row({ song }) {
  return (
    <div key={song.id} className="Song">
      <div className="Controls">
        <button><img src="/icons/previous.svg" /></button>
        <button><img src="/icons/pause.svg" /></button>
        <button><img src="/icons/next.svg" /></button>
      </div>
    </div>
  )
}

