"use client"
import { useEffect, useRef, useState } from 'react'

type Dir = { x: number; y: number }

export default function GamesPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [score, setScore] = useState(0)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current!
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf = 0
    let last = performance.now()

    // Simple maze (0 path, 1 wall, 2 coin). Keep small for mobile.
    const layout: number[][] = [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,2,2,2,0,2,2,2,2,2,0,2,2,2,1],
      [1,2,1,1,0,1,1,0,1,1,0,1,1,2,1],
      [1,2,0,0,2,0,0,2,0,0,2,0,0,2,1],
      [1,2,1,0,1,1,0,1,0,1,1,0,1,2,1],
      [1,2,0,2,0,0,2,0,2,0,0,2,0,2,1],
      [1,2,1,0,1,1,0,0,0,1,1,0,1,2,1],
      [1,2,0,2,0,0,2,2,2,0,0,2,0,2,1],
      [1,2,1,0,1,1,0,1,0,1,1,0,1,2,1],
      [1,2,0,0,2,0,0,2,0,0,2,0,0,2,1],
      [1,2,1,1,0,1,1,0,1,1,0,1,1,2,1],
      [1,2,2,2,0,2,2,2,2,2,0,2,2,2,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ]

    // Count coins initially
    let totalCoins = 0
    for (let r = 0; r < layout.length; r++) {
      for (let c = 0; c < layout[0].length; c++) {
        if (layout[r][c] !== 1) layout[r][c] = layout[r][c] === 0 ? 2 : layout[r][c]
        if (layout[r][c] === 2) totalCoins++
      }
    }

    const state = {
      rows: layout.length,
      cols: layout[0].length,
      cell: 24,
      player: { x: 1.5, y: 1.5, dir: { x: 1, y: 0 } as Dir, desired: { x: 1, y: 0 } as Dir, speed: 6 },
      score: 0,
      totalCoins,
    }

    function resize() {
      const maxWidth = Math.min(window.innerWidth - 16, 520)
      // Compute cell size to fit width
      state.cell = Math.floor(maxWidth / state.cols)
      const w = state.cell * state.cols
      const h = state.cell * state.rows
      canvas.width = w
      canvas.height = h
    }

    function isWall(nx: number, ny: number) {
      const r = Math.round(ny)
      const c = Math.round(nx)
      return layout[r]?.[c] === 1
    }

    function canMove(dir: Dir, pos: { x: number; y: number }) {
      const tx = Math.round(pos.x)
      const ty = Math.round(pos.y)
      const nx = tx + dir.x
      const ny = ty + dir.y
      return layout[ny]?.[nx] !== 1
    }

    function step(dt: number) {
      // Allow turn at cell centers
      const px = state.player.x
      const py = state.player.y
      const cx = Math.round(px)
      const cy = Math.round(py)
      const distToCenter = Math.hypot(px - cx, py - cy)

      if (distToCenter < 0.12 && (state.player.desired.x !== state.player.dir.x || state.player.desired.y !== state.player.dir.y)) {
        if (canMove(state.player.desired, { x: cx, y: cy })) {
          state.player.dir = { ...state.player.desired }
          state.player.x = cx
          state.player.y = cy
        }
      }

      // Move along current dir if possible
      const speedCellsPerSec = state.player.speed
      const move = speedCellsPerSec * dt
      let nx = state.player.x + state.player.dir.x * move
      let ny = state.player.y + state.player.dir.y * move

      // Block by walls: if next tile is wall, snap to center
      const nextTileX = Math.round(nx)
      const nextTileY = Math.round(ny)
      if (layout[nextTileY]?.[nextTileX] === 1) {
        nx = Math.round(state.player.x)
        ny = Math.round(state.player.y)
      }

      state.player.x = nx
      state.player.y = ny

      // Eat coin at current center tile
      const r = Math.round(state.player.y)
      const c = Math.round(state.player.x)
      if (layout[r]?.[c] === 2) {
        layout[r][c] = 0
        state.score += 10
        setScore(state.score)
        if (state.score / 10 >= state.totalCoins) {
          setComplete(true)
        }
      }
    }

    function draw() {
      const cell = state.cell
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Background
      ctx.fillStyle = '#0b0b10'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw maze
      for (let y = 0; y < state.rows; y++) {
        for (let x = 0; x < state.cols; x++) {
          const v = layout[y][x]
          const px = x * cell
          const py = y * cell
          if (v === 1) {
            ctx.fillStyle = 'rgba(0,229,255,0.12)'
            ctx.strokeStyle = 'rgba(0,229,255,0.55)'
            ctx.lineWidth = 2
            ctx.fillRect(px, py, cell, cell)
            ctx.strokeRect(px + 1, py + 1, cell - 2, cell - 2)
          } else if (v === 2) {
            ctx.fillStyle = '#00e5ff'
            ctx.beginPath()
            ctx.arc(px + cell / 2, py + cell / 2, Math.max(2, cell * 0.12), 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // Player
      const px = state.player.x * cell
      const py = state.player.y * cell
      const radius = cell * 0.38
      const gradient = ctx.createRadialGradient(px - radius * 0.3, py - radius * 0.3, radius * 0.2, px, py, radius)
      gradient.addColorStop(0, '#ff4da6')
      gradient.addColorStop(1, '#ff007a')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(px, py, radius, 0, Math.PI * 2)
      ctx.fill()
      // Draw $ sign
      ctx.fillStyle = 'white'
      ctx.font = `${Math.floor(radius)}px sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('$', px, py + 1)

      // Score (top-left)
      ctx.fillStyle = 'rgba(230,230,235,0.9)'
      ctx.font = `${Math.max(12, Math.floor(cell * 0.5))}px system-ui, -apple-system, Segoe UI, Roboto`
      ctx.fillText(`Score: ${state.score}`, cell * 1, cell * 1)

      if (complete) {
        ctx.fillStyle = 'rgba(0,0,0,0.55)'
        ctx.fillRect(0, canvas.height / 2 - 30, canvas.width, 60)
        ctx.fillStyle = '#00e5ff'
        ctx.font = `${Math.max(14, Math.floor(cell * 0.7))}px system-ui`
        ctx.textAlign = 'center'
        ctx.fillText('All coins eaten! 🎉', canvas.width / 2, canvas.height / 2)
      }
    }

    function loop(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      step(dt)
      draw()
      raf = requestAnimationFrame(loop)
    }

    function setDesired(dir: Dir) {
      state.player.desired = dir
    }

    function onKey(e: KeyboardEvent) {
      const k = e.key.toLowerCase()
      if (k === 'arrowup' || k === 'w') setDesired({ x: 0, y: -1 })
      else if (k === 'arrowdown' || k === 's') setDesired({ x: 0, y: 1 })
      else if (k === 'arrowleft' || k === 'a') setDesired({ x: -1, y: 0 })
      else if (k === 'arrowright' || k === 'd') setDesired({ x: 1, y: 0 })
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', resize)
    resize()
    last = performance.now()
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Touch controls for mobile
  const Btn = ({ label, onPress }: { label: string; onPress: () => void }) => (
    <button
      onPointerDown={onPress}
      className="button-secondary px-3 py-2 text-xs"
      aria-label={label}
    >
      {label}
    </button>
  )

  return (
    <main className="section py-8 sm:py-12">
      <h1 className="section-title">Games</h1>
      <div className="card p-3 sm:p-4">
        <p className="mb-3 text-sm text-white/80">Guide the $JOBLESS puck to eat all neon coins. Use arrow keys/WASD, or the on-screen controls below.</p>
        <div className="flex justify-center">
          <canvas ref={canvasRef} className="rounded-lg border border-white/10 bg-black" />
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 sm:gap-3">
          {/* On-screen D-Pad */}
          <Btn label="Up" onPress={() => (window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' })))} />
        </div>
        <div className="mt-2 flex items-center justify-center gap-2 sm:gap-3">
          <Btn label="Left" onPress={() => (window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' })))} />
          <Btn label="Down" onPress={() => (window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })))} />
          <Btn label="Right" onPress={() => (window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' })))} />
        </div>
      </div>
    </main>
  )
}

