import { useState, useMemo } from 'react'
import { playClickSound } from '../sounds'
import './PokeBallSelector.css'

function PokeBall({ index, pokemon, isSelected, onSelect, position, isExpanded, onTap }) {
  const [isHovered, setIsHovered] = useState(false)
  const showPanelInBall = isHovered && !isExpanded

  return (
    <div
      className={`poke-ball-wrap poke-ball--${position}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showPanelInBall && (
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
        playClickSound()
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

  const expandedPokemon = expandedBall !== null ? options[expandedBall] : null

  return (
    <>
      {expandedPokemon && (
        <div className="poke-ball-panel-wrapper">
          <div className="poke-ball-hover poke-ball-hover--touch">
            <img src={expandedPokemon.sprite} alt={expandedPokemon.name} className="poke-ball-hover-sprite" />
            <span className="poke-ball-hover-name">{expandedPokemon.name}</span>
            <span className="poke-ball-hover-type">{expandedPokemon.type}</span>
            <p className="poke-ball-hover-desc">{expandedPokemon.description}</p>
            <button
              type="button"
              className="poke-ball-hover-choose"
              onClick={(e) => { e.stopPropagation(); handleSelect(expandedBall); }}
            >
              Elegir
            </button>
          </div>
        </div>
      )}
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
    </>
  )
}

export default PokeBallSelector
