import { useState, useEffect, useRef } from 'react'
import './App.css'
import PokeBallSelector from './components/PokeBallSelector'
import { playSelectSound, playYesSound, playNoSound } from './sounds'

const BG_MUSIC_SRC = '/bg-music.mp3'

const LEAFEON_CITA = {
  title: 'Cocinar juntos',
  energia: 'Crecimiento natural, sin forzar.',
  plan: [
    'Ir juntos por ingredientes (mercado / súper)',
    'Cocinar algo sencillo',
    'Bibimbap fácil, pasta con verduras ,algo italiano o japones :p',
    'Comer lo que preparamos',
    'Música tranquila o no jejejej lo que gusres ',
    'Plática , kdramas, series, etc',
    'Cafecito'
  ],
}

const AMPHAROS_CITA = {
  title: 'Comida tranquila fuera',
  energia: 'Tu luz y tu humor.',
  plan: [
    'Gym con caras',
    'Comida tranquila fuera: Gami, SSAM, Kgrill, Suehiro, etc.',
    'Paseo corto: parque, alguna librería, Ikea, plaza, etc.',
    'Cafecito con postre',
    'Alguna peli de tu interés :3',
  ],
}

const ALTARIA_CITA = {
  title: 'Desayuno y dorama en casa',
  energia: 'La calma que me das.',
  plan: [
    'Desayuno fuera, algo rico :p',
    'Regresar a casa la que gustes mia o tuya ',
    'Algo sencillo de comer ',
    'Cafecito con pan ',
    'Nuestro dorama :3 en sofá, cobija (yes sr de las cobijas)',
  ],
}

const POKEMON_OPTIONS = [
  { id: 470, name: 'Leafeon', type: 'Tu cuidado y tu forma suave de querer', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/470.gif', description: 'Me gusta de ti lo inteligente que eres cuando hablas de lo que te apasiona, se nota y se contagia la emoción, me encanta escucharte.', cita: LEAFEON_CITA },
  { id: 181, name: 'Ampharos', type: 'Tu luz y tu humor', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/181.gif', description: 'Me gusta de ti tu presencia da paz y tu sentido del humor aparece justo cuando menos lo espero, me haces sentir acompañado y sonreír con cosas simples.', cita: AMPHAROS_CITA },
  { id: 334, name: 'Altaria', type: 'La calma que me das', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/334.gif', description: 'Me gusta de ti que contigo puedo estar tranquilo, cuando me abrazas o apoyas tu cabeza con la mía, todo se siente mejor.', cita: ALTARIA_CITA },
]

function App() {
  const [showTitleScreen, setShowTitleScreen] = useState(true)
  const [showIntro, setShowIntro] = useState(true)
  const [showNoScreen, setShowNoScreen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [showInfoEleccion, setShowInfoEleccion] = useState(false)
  const [showValentineScreen, setShowValentineScreen] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const [welcomeStep, setWelcomeStep] = useState(1)
  const hasTriggeredWelcomeRef = useRef(false)
  const [selectedBall, setSelectedBall] = useState(null)
  const [chosenPokemon, setChosenPokemon] = useState(null)
  const bgMusicRef = useRef(null)
  const musicStartedRef = useRef(false)

  const startBgMusic = () => {
    if (musicStartedRef.current) return
    musicStartedRef.current = true
    const audio = bgMusicRef.current
    if (audio) {
      audio.loop = true
      audio.volume = 0.6
      audio.play().catch(() => {})
    }
  }

  useEffect(() => {
    if (!showTitleScreen) return
    const handleKeyDown = () => setShowTitleScreen(false)
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showTitleScreen])

  // Mantener la música sonando al cambiar de pantalla (el audio se re-monta)
  useEffect(() => {
    if (showTitleScreen || !musicStartedRef.current) return
    const audio = bgMusicRef.current
    if (audio) {
      audio.loop = true
      audio.volume = 0.6
      audio.play().catch(() => {})
    }
  }, [showTitleScreen, showIntro])

  // Al llegar por primera vez a "Choose ur date", mostrar al muchacho con el mensaje de bienvenida
  useEffect(() => {
    if (showIntro || showTitleScreen || hasTriggeredWelcomeRef.current) return
    hasTriggeredWelcomeRef.current = true
    setShowWelcomeModal(true)
    setWelcomeStep(1)
  }, [showIntro, showTitleScreen])

  const handleSelectBall = (index) => {
    playSelectSound()
    setSelectedBall(index)
    setChosenPokemon(POKEMON_OPTIONS[index])
  }

  if (showTitleScreen) {
    return (
      <>
        <audio ref={bgMusicRef} src={BG_MUSIC_SRC} preload="auto" />
        <div
          className="app title-screen-app"
          role="button"
          tabIndex={0}
          onClick={() => { startBgMusic(); setShowTitleScreen(false); }}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') e.preventDefault(); startBgMusic(); setShowTitleScreen(false); }}
        >
          <div className="title-screen">
            <img src="/title-screen.png" alt="Valentin Adventure" className="title-screen-img" />
            <p className="title-screen-prompt">Press any key to continue</p>
          </div>
        </div>
      </>
    )
  }

  if (showIntro) {
    return (
      <>
        <audio ref={bgMusicRef} src={BG_MUSIC_SRC} preload="auto" />
        <div className="app">
        <div className={`scene ${showNoScreen ? 'scene--no' : 'scene--intro'}`}>
          {showNoScreen ? (
            <>
              <div className="no-screen-bg" />
              <button
                type="button"
                className="scene-back"
                onClick={() => setShowTitleScreen(true)}
                aria-label="Volver"
              >
                ← Back
              </button>
              <div className="no-screen">
                <img src="/no-response.png" alt="" className="no-screen-img" />
                <button
                  type="button"
                  className="intro-btn intro-btn-yes no-screen-back"
                  onClick={() => setShowNoScreen(false)}
                >
                  Volver a intentar
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="grass-bg" />
              <div className="border-frame" />
              <button
                type="button"
                className="scene-back"
                onClick={() => setShowTitleScreen(true)}
                aria-label="Volver"
              >
                ← Back
              </button>
              <div className="intro-screen">
                <div className="intro-panel">
                  <p className="intro-question">¿Te gustaría iniciar la aventura?</p>
                  <div className="intro-buttons">
              <button type="button" className="intro-btn intro-btn-yes" onClick={() => { playYesSound(); setShowIntro(false); }}>
                Sí
              </button>
              <button type="button" className="intro-btn intro-btn-no" onClick={() => { playNoSound(); setShowNoScreen(true); }}>
                No
              </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      </>
    )
  }

  const handleBack = () => {
    setShowIntro(true)
    setSelectedBall(null)
    setChosenPokemon(null)
  }

  const handleBackToSelection = () => {
    setShowValentineScreen(false)
    setSelectedBall(null)
    setChosenPokemon(null)
  }

  const showDatePage = chosenPokemon && chosenPokemon.cita

  return (
    <>
      <audio ref={bgMusicRef} src={BG_MUSIC_SRC} preload="auto" />
      <div className="app">
      <div className={`scene ${showValentineScreen ? 'scene--valentine' : ''}`}>
        <div className="grass-bg" />
        <div className="border-frame" />

        {showValentineScreen ? (
          <>
            <div className="valentine-bg" />
            <button type="button" className="scene-back" onClick={() => setShowValentineScreen(false)} aria-label="Volver">
              ← Volver
            </button>
            <div className="valentine-screen">
              <p className="valentine-korean">발렌타인 데이 축하해요</p>
              <p className="valentine-sub">Feliz San Valentín</p>
            </div>
          </>
        ) : showDatePage ? (
          <>
            <button type="button" className="scene-back" onClick={handleBackToSelection} aria-label="Elegir otra">
              ← Elegir otra
            </button>
            <button type="button" className="scene-info scene-info--date" onClick={() => setShowInfoEleccion(true)} aria-label="Mensaje">
              Mensaje
            </button>
            <div className="date-page">
              <h2 className="date-page-title">¡{chosenPokemon.name}!</h2>
              <img src={chosenPokemon.sprite} alt={chosenPokemon.name} className="date-page-sprite" />
              <div className="date-page-cita">
                <h3 className="date-cita-title">{chosenPokemon.cita.title}</h3>
                <p className="date-cita-energia"><strong>Energía:</strong> {chosenPokemon.cita.energia}</p>
                <p className="date-cita-plan-label"><strong>Plan:</strong></p>
                <ul className="date-cita-plan">
                  {chosenPokemon.cita.plan.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <button type="button" className="intro-btn intro-btn-yes date-page-continuar" onClick={() => setShowValentineScreen(true)}>
                Continuar
              </button>
            </div>
          </>
        ) : (
          <>
            <button type="button" className="scene-back" onClick={handleBack} aria-label="Volver">
              ← Back
            </button>
            <button type="button" className="scene-info" onClick={() => setShowInfo(true)} aria-label="Info">
              Info
            </button>
            <h1 className="scene-title">Choose ur date</h1>
            <PokeBallSelector
              options={POKEMON_OPTIONS}
              selectedBall={selectedBall}
              chosenPokemon={chosenPokemon}
              onSelectBall={handleSelectBall}
            />
            {chosenPokemon && !chosenPokemon.cita && (
              <div className="pokemon-reveal">
                <span className="reveal-text">¡{chosenPokemon.name}!</span>
                <img src={chosenPokemon.sprite} alt={chosenPokemon.name} className="reveal-sprite" />
              </div>
            )}
          </>
        )}

        {showInfo && !showDatePage && (
          <div className="info-overlay" onClick={() => setShowInfo(false)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Escape' && setShowInfo(false)}>
            <div className="info-card" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="info-close" onClick={() => setShowInfo(false)} aria-label="Cerrar">×</button>
              <div className="info-speech-bubble">Selecciona una opción chaparrita</div>
              <img src="/info-personaje.png" alt="" className="info-personaje" />
            </div>
          </div>
        )}
        {showWelcomeModal && !showDatePage && (
          <div className="info-overlay" role="dialog" aria-label="Mensaje del muchacho">
            <div className="info-card info-card--welcome" onClick={(e) => e.stopPropagation()}>
              <div className="info-speech-bubble info-speech-bubble--welcome">
                {welcomeStep === 1 && 'Hola Chaparrita :3'}
                {welcomeStep === 2 && 'Elegí estos pokémon porque me dijiste que eran tus favoritos y cada uno representa algo que veo en ti y lo que me gusta'}
                {welcomeStep === 3 && 'y quiero que elijas uno para nuestra cita 😊'}
              </div>
              <img src="/info-personaje.png" alt="" className="info-personaje" />
              <button
                type="button"
                className="intro-btn intro-btn-yes welcome-modal-btn"
                onClick={() => (welcomeStep < 3 ? setWelcomeStep((s) => s + 1) : setShowWelcomeModal(false))}
              >
                {welcomeStep < 3 ? 'Siguiente' : 'Entendido'}
              </button>
            </div>
          </div>
        )}
        {showInfoEleccion && (
          <div className="info-overlay" onClick={() => setShowInfoEleccion(false)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Escape' && setShowInfoEleccion(false)}>
            <div className="info-card" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="info-close" onClick={() => setShowInfoEleccion(false)} aria-label="Cerrar">×</button>
              <div className="info-speech-bubble">Excelente elección, contacta al novio real para ponerse de acuerdo</div>
              <img src="/info-personaje.png" alt="" className="info-personaje" />
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default App
