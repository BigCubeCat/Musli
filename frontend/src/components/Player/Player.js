import React, { useState, useEffect } from "react";

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);
  const setVolume = (volume) => { audio.volume = volume }

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle, setVolume];
};


export default function Player() {
  const [playing, toggle, setVolume] = useAudio("https://datashat.net/music_for_programming_1-datassette.mp3");
  const [volume, setWidgetVolume] = useState(100);

  const onVolumeChange = newValue => {
    setVolume(newValue / 100);
    setWidgetVolume(newValue);
  }
  return (
    <footer>
      <div className="Progress"></div>
      <div className="Player Song">
        <div className="Controls">
          <button><img src="/icons/previous.svg" /></button>
          <button
            onClick={toggle}
          ><img src={(playing) ? "/icons/pause.svg" : "/icons/play.svg"} />
          </button>
          <button><img src="/icons/next.svg" /></button>
        </div>
        <div className="SongInfo">
          <div>Название</div>
          <text>Автор</text>
        </div>
        <div />
        <div />
        <div className="VolumeControl">
          <input
            type="range"
            min={0} max={100}
            value={volume} onChange={e => onVolumeChange(e.target.value)}
            className="VolumeSlider"
          />
        </div>
      </div>
    </footer>
  )
}
