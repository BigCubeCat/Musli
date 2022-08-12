import React from 'react';


export default function Header() {
  return (
    <header>
      <div className="head">
        <h2>Musli</h2>
        <button onClick={() => { console.log("press") }}><a>login</a></button>
      </div>
    </header>
  )
}
