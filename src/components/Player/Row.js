import React from "react";

export default function Row({ song }) {
  return (
    <div key={song.id}>
      {song.title}
    </div>
  )
}

