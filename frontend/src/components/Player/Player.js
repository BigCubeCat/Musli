import React, { useState, useEffect } from "react";
import Progress from './Progress';
import { useSelector } from 'react-redux';

const toNormalTime = (time) => {
  let result = Math.floor(time);
  if (result > 60) {
    let time = ("" + result / 60).split('.');
    return time[0] + ":" + Math.ceil(time[1] * 60);
  }
  return "0:" + ("" + result).padStart(2, '0');
}


const loadSource = (source) => {
  return fetch(`http://127.0.0.1:5000/${source}`)
    .then(resp => resp.blob())
    .then(data => data)
    .catch(console.error())
}

const useAudio = src => {
  const [audio, setAudio] = useState(new Audio("https://datashat.net/music_for_programming_1-datassette.mp3"))
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);
  const setVolume = (volume) => { audio.volume = volume }
  const setTime = percent => {
    const time = percent / 100 * audio.duration;
    audio.currentTime = time;
    return time;
  }

  useEffect(() => {
    const loadData = async () => {
      console.log("here")
      const blob = await loadSource(src)
      const blobUrl = URL.createObjectURL(blob);
      const audio = new Audio();
      audio.src = blobUrl;
      setAudio(audio);
    }
    loadData().catch(console.error)
  }, [])

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

const API_ADDRESS = 'http://127.0.0.1:5000/'

export default function Player() {
  const currentSong = useSelector(state => state.audio.currentAudio);
  const [playing, toggle, setVolume, setTime, audio] = useAudio(currentSong.source);
  const [volume, setWidgetVolume] = useState(100);

  const onVolumeChange = newValue => {
    setVolume(newValue / 100);
    setWidgetVolume(newValue);
  }
  /**
  текущая точка воспроизведения
  */
  const [timePercent, setTimePercent] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimePercent(Math.floor(audio.currentTime / audio.duration * 100));
      setCurrentTime(audio.currentTime)
    }, 1000)
    return () => {
      clearInterval(interval);
    };
  }, []);
  console.log(audio.duration, audio.currentTime)
  return (
    <footer>
      <div className="Progress">
        <div className="Value" style={{ width: timePercent + "%" }} />
        <div className="Time"
          onClick={e => {
            setCurrentTime(Math.floor(e.clientX / window.innerWidth * 100));
            setTimePercent(Math.floor(audio.currentTime / audio.duration * 100));
          }}
        >
          {toNormalTime(currentTime)}
        </div>
      </div >
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
          <div>{currentSong.name}</div>
          <div className="Text">{currentSong.author}</div>
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
