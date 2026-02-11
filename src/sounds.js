/**
 * Sonidos con Web Audio API (sin archivos externos)
 */

function getAudioContext() {
  if (!window.__audioContext) {
    window.__audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return window.__audioContext
}

function playTone(frequency, duration, type = 'sine', volume = 0.15) {
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = frequency
    osc.type = type
    gain.gain.setValueAtTime(volume, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + duration)
  } catch (_) {}
}

/** Sonido al seleccionar una Poké Ball (click tipo juego) */
export function playSelectSound() {
  playTone(440, 0.08, 'sine', 0.12)
  setTimeout(() => playTone(660, 0.06, 'sine', 0.1), 50)
}

/** Sonido al pulsar Sí (positivo, alegre) */
export function playYesSound() {
  playTone(523, 0.1, 'sine', 0.15)
  setTimeout(() => playTone(659, 0.1, 'sine', 0.12), 80)
  setTimeout(() => playTone(784, 0.15, 'sine', 0.1), 160)
}

/** Sonido al pulsar No (suave, diferente) */
export function playNoSound() {
  playTone(392, 0.12, 'sine', 0.12)
  setTimeout(() => playTone(330, 0.15, 'sine', 0.1), 100)
}

/** Sonido genérico al hacer clic en cualquier botón */
export function playClickSound() {
  playTone(520, 0.06, 'sine', 0.12)
}
