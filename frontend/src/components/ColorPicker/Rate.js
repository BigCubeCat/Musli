import React from "react";
import { useSelector } from 'react-redux';
import { BUTTON_COLORS } from './COLORS';

export default function Rate({ combination = '88' }) {
  return (
    <div className="Rate">
      <div className="Left" style={{ backgroundColor: BUTTON_COLORS[+combination[0]] }} />
      <div className="Right" style={{ backgroundColor: BUTTON_COLORS[+combination[1]] }} />
    </div>
  )
}
