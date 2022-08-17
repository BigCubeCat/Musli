import React, { useEffect, useState } from 'react';


const toNormalTime = (time) => {
  let result = Math.floor(time);
  if (result > 60) {
    let time = ("" + result / 60).split('.');
    return time[0] + ":" + Math.ceil(time[1] * 60);
  }
  return "0:" + ("" + result).padStart(2, '0');
}

export default function Progress({ setCurrentTime, audio }) {
  const [timePercent, setTimePercent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimePercent(Math.floor(audio.currentTime / audio.duration * 100));
    }, 1000)
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="Progress">
      <div className="Value" style={{ width: timePercent + "%" }} />
      <div className="Time"
        onClick={e => {
          setCurrentTime(Math.floor(e.clientX / window.innerWidth * 100));
          setTimePercent(Math.floor(audio.currentTime / audio.duration * 100));
        }}
      >
        {toNormalTime(audio.currentTime)}
      </div>
    </div >
  )
}
