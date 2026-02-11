import { useState } from 'react'
import './PokeBallSelector.css'

function PokeBall({ index, pokemon, isSelected, onClick, position }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`poke-ball-wrap poke-ball--${position}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="poke-ball-hover">
          <img src={pokemon.sprite} alt={pokemon.name} className="poke-ball-hover-sprite" />
          <span className="poke-ball-hover-name">{pokemon.name}</span>
          <span className="poke-ball-hover-type">{pokemon.type}</span>
          <p className="poke-ball-hover-desc">{pokemon.description}</p>
        </div>
      )}
      <button
        type="button"
        className={`poke-ball ${isSelected ? 'selected' : ''}`}
        onClick={() => onClick(index)}
        aria-label={`Elegir ${pokemon.name}`}
      >
        <div className="poke-ball-shade" />
        <img src="/pokeball.png" alt="" className="poke-ball-img" />
      </button>
    </div>
  )
}

function PokeBallSelector({ options, selectedBall, onSelectBall }) {
  const positions = ['left', 'center', 'right']

  return (
    <div className="poke-ball-selector">
      {options.map((pokemon, index) => (
        <PokeBall
          key={pokemon.id}
          index={index}
          pokemon={pokemon}
          position={positions[index]}
          isSelected={selectedBall === index}
          onClick={onSelectBall}
        />
      ))}
    </div>
  )
}

export default PokeBallSelector
