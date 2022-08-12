import React from "react";
import Colors from '../ColorPicker/Colors';
import Playlist from '../Player/Playlist';

export default function Main() {
  return (
    <div className="Main">
      <Colors />
      <Playlist />
    </div>
  )
}
