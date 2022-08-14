import React, { useState, useEffect } from "react";
import Progress from './Progress';

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);
  const setVolume = (volume) => { audio.volume = volume }
  const setTime = percent => {
    const time = percent / 100 * audio.duration;
    audio.currentTime = time;
    return time;
  }
  const getTime = () => audio.currentTime;

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

  return [playing, toggle, setVolume, setTime, audio];
};


export default function Player({ url = "http://127.0.0.1:5000/tr.mp3" }) {
  const [playing, toggle, setVolume, setTime, audio] = useAudio(url);
  const [volume, setWidgetVolume] = useState(100);
  const [timePercent, setTimePercent] = useState(90);

  const onVolumeChange = newValue => {
    setVolume(newValue / 100);
    setWidgetVolume(newValue);
  }
  /**
  текущая точка воспроизведения
  */
  const setCurrentTime = (percent) => {
    setTimePercent(percent);
    setTime(percent)
  }
  return (
    <footer>
      <Progress setCurrentTime={setCurrentTime} timePercent={timePercent} audio={audio} />
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
    </footer >
  )
}
