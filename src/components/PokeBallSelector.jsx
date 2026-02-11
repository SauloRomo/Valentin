import { useState, useMemo } from 'react'
import './PokeBallSelector.css'

function PokeBall({ index, pokemon, isSelected, onSelect, position, isExpanded, onTap }) {
  const [isHovered, setIsHovered] = useState(false)
  const showPanel = isHovered || isExpanded

  return (
    <div
      className={`poke-ball-wrap poke-ball--${position}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showPanel && (
        <div className={`poke-ball-hover ${isExpanded ? 'poke-ball-hover--touch' : ''}`}>
          <img src={pokemon.sprite} alt={pokemon.name} className="poke-ball-hover-sprite" />
          <span className="poke-ball-hover-name">{pokemon.name}</span>
          <span className="poke-ball-hover-type">{pokemon.type}</span>
          <p className="poke-ball-hover-desc">{pokemon.description}</p>
          {isExpanded && (
            <button
              type="button"
              className="poke-ball-hover-choose"
              onClick={(e) => { e.stopPropagation(); onSelect(); }}
            >
              Elegir
            </button>
          )}
        </div>
      )}
      <button
        type="button"
        className={`poke-ball ${isSelected ? 'selected' : ''}`}
        onClick={onTap}
        aria-label={isExpanded ? `Elegir ${pokemon.name}` : `Ver ${pokemon.name}`}
      >
        <div className="poke-ball-shade" />
        <img src="/pokeball.png" alt="" className="poke-ball-img" />
      </button>
    </div>
  )
}

function PokeBallSelector({ options, selectedBall, onSelectBall }) {
  const positions = ['left', 'center', 'right']
  const [expandedBall, setExpandedBall] = useState(null)
  const isTouchDevice = useMemo(() => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0), [])

  const handleTap = (index) => {
    if (isTouchDevice) {
      if (expandedBall === index) {
        onSelectBall(index)
        setExpandedBall(null)
      } else {
        setExpandedBall(index)
      }
    } else {
      onSelectBall(index)
    }
  }

  const handleSelect = (index) => {
    onSelectBall(index)
    setExpandedBall(null)
  }

  return (
    <div className="poke-ball-selector">
      {options.map((pokemon, index) => (
        <PokeBall
          key={pokemon.id}
          index={index}
          pokemon={pokemon}
          position={positions[index]}
          isSelected={selectedBall === index}
          isExpanded={expandedBall === index}
          onSelect={() => handleSelect(index)}
          onTap={() => handleTap(index)}
        />
      ))}
    </div>
  )
}

export default PokeBallSelector
