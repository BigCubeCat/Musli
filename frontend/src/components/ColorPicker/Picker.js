import React from "react";
import { useDispatch } from 'react-redux';
import { setCombination } from '../../state/audio';
import { BUTTON_COLORS } from './COLORS';

const ColorButton = ({ color, index, onClick, selected }) => {
  return <div className="buttonContainer">
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={(selected) ? 'selected' : ""}>
    </button>
  </div>
}

export default function Picker() {
  const dispatch = useDispatch();
  const [colors, setColors] = React.useState(BUTTON_COLORS.map(_ => false));
  const [countSelected, setCountSelected] = React.useState(0);

  const setColor = (index) => {
    if (countSelected === 2) {
      const newColors = BUTTON_COLORS.map((_, i) => {
        return index === i
      })
      setColors(newColors);
      setCountSelected(1);
      return;
    }
    let newCountSelected = 0;
    const newColors = [];
    for (let i in colors) {
      if (index == i) {
        newColors.push(!colors[i]);
      } else {
        newColors.push(colors[i]);
      }
      newCountSelected += (newColors[i]) ? 1 : 0
    }
    let combination = "";
    for (let i = 0; i < 8; ++i) {
      if (newColors[i]) combination += i;
    }
    if (combination.length === 2)
      dispatch(setCombination(combination));

    setColors(newColors);
    setCountSelected(newCountSelected);
  }

  return (
    <div className="Picker">
      {
        BUTTON_COLORS.map(
          (color, i) =>
            <ColorButton
              key={i}
              color={color}
              index={i}
              onClick={() => setColor(i)}
              selected={colors[i]}
            />
        )
      }
    </div>
  )
}
