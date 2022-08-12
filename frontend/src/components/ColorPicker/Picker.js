import React from "react";

export const BUTTON_COLORS = [  // Основанно на тесте Люшера
  '#f22f23',
  '#1e9773',
  '#004984',
  '#f2de00',
  '#231f21',
  '#99938f',
  '#d32481',
  '#c65223',
];

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
