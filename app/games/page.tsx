"use client"
import { useEffect, useRef, useState } from 'react'
import { getLinks } from '@/lib/links'
import Navbar from '@/components/Navbar'

export default function GamesPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [score, setScore] = useState(0)
  const [running, setRunning] = useState(true)
  const [copied, setCopied] = useState(false)
  const links = getLinks()
  // Touch control bridges (set by game loop)
  const setLeftRef = useRef<((v: boolean) => void) | null>(null)
  const setRightRef = useRef<((v: boolean) => void) | null>(null)
  const jumpRef = useRef<(() => void) | null>(null)

  async function copyCA() {
    try {
      await navigator.clipboard.writeText(links.mint)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch (e) {
      console.error('Copy failed', e)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf = 0
    let last = performance.now()

    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1))

    // Runner sprite
    const runner = new Image()
    runner.src = '/runner.png'
    let runnerReady = false
    runner.onload = () => (runnerReady = true)

    // World state for Endless Climber
    const state = {
      width: 400,
      height: 600,
      t: 0,
      gameOver: false,
      cam: 0, // camera y offset (top of screen in world coords)
      score: 0,
      // Movement/input
      left: false,
      right: false,
      player: {
        x: 200,
        y: 0, // will set after layout
        w: 48,
        h: 48,
        vx: 0,
        vy: 0,
        onGround: false,
      },
      platforms: [] as { x: number; y: number; w: number; h: number; dx?: number }[],
      minSpawnY: 0, // highest (smallest) y spawned so far
    }

    // Initial layout
    const START_PLATFORM_Y = 520
    function setup() {
      state.platforms = []
      state.cam = 0
      state.score = 0
      setScore(0)
      // Base platform near bottom
      state.platforms.push({ x: 80, y: START_PLATFORM_Y, w: 240, h: 12 })
      // A few initial steps upward
      let y = START_PLATFORM_Y
      for (let i = 0; i < 6; i++) {
        y -= 80 + Math.random() * 30
        state.platforms.push({ x: 40 + Math.random() * (state.width - 160), y, w: 140 + Math.random() * 80, h: 12, dx: Math.random() < 0.3 ? (Math.random() < 0.5 ? 40 : -40) : 0 })
      }
      state.minSpawnY = y
      state.player.x = 200
      state.player.y = START_PLATFORM_Y - state.player.h
      state.player.vx = 0
      state.player.vy = 0
      state.player.onGround = true
      state.gameOver = false
    }
    setup()

    function resize() {
      const maxW = Math.min(520, window.innerWidth - 16)
      const ratio = state.height / state.width
      const cssW = Math.floor(maxW)
      const cssH = Math.floor(cssW * ratio)
      canvas.style.width = cssW + 'px'
      canvas.style.height = cssH + 'px'
      canvas.width = Math.floor(cssW * DPR)
      canvas.height = Math.floor(cssH * DPR)
    }

    function jump() {
      if (state.gameOver) return restart()
      if (state.player.onGround) {
        state.player.vy = -520
        state.player.onGround = false
      }
    }
    // Expose controls to JSX touch handlers
    setLeftRef.current = (v: boolean) => {
      state.left = v
    }
    setRightRef.current = (v: boolean) => {
      state.right = v
    }
    jumpRef.current = () => {
      jump()
    }
    function restart() {
      setup()
    }

    function handleInput(dt: number) {
      const accel = 1200
      const maxSpeed = 240
      if (state.left) state.player.vx -= accel * dt
      if (state.right) state.player.vx += accel * dt
      if (!state.left && !state.right) state.player.vx *= 0.9
      state.player.vx = Math.max(-maxSpeed, Math.min(maxSpeed, state.player.vx))
    }

    function spawnUpward() {
      // Ensure platforms exist above the current camera by at least 800px
      const targetY = state.cam - 800
      while (state.minSpawnY > targetY) {
        const gap = 90 + Math.random() * 40
        const w = 120 + Math.random() * 120
        const y = state.minSpawnY - gap
        const x = 20 + Math.random() * (state.width - w - 40)
        const moving = Math.random() < 0.35
        const dx = moving ? (Math.random() < 0.5 ? 50 : -50) : 0
        state.platforms.push({ x, y, w, h: 12, dx })
        state.minSpawnY = y
      }
    }

    function step(dt: number) {
      if (state.gameOver) return
      state.t += dt

      // Input and horizontal motion
      handleInput(dt)
      const prevY = state.player.y

      // Gravity and integration
      state.player.vy += 1800 * dt
      state.player.x += state.player.vx * dt
      state.player.y += state.player.vy * dt

      // Screen wrap horizontally
      if (state.player.x < -state.player.w / 2) state.player.x = state.width + state.player.w / 2
      if (state.player.x > state.width + state.player.w / 2) state.player.x = -state.player.w / 2

      // Moving platforms wiggle
      for (const p of state.platforms) {
        if (p.dx) {
          p.x += p.dx * dt * 0.6
          if (p.x < 10 || p.x + p.w > state.width - 10) p.dx = -p.dx
        }
      }

      // Landing on platforms (only when falling)
      const px = state.player.x
      const pw = state.player.w
      const ph = state.player.h
      if (state.player.vy > 0) {
        const prevBottom = prevY + ph
        const nextBottom = state.player.y + ph
        for (const p of state.platforms) {
          const hitX = px + pw > p.x && px < p.x + p.w
          const passesThrough = prevBottom <= p.y && nextBottom >= p.y
          if (hitX && passesThrough) {
            state.player.y = p.y - ph
            state.player.vy = 0
            state.player.onGround = true
            break
          }
        }
      } else if (state.player.vy < -10) {
        state.player.onGround = false
      }

      // Camera follows upward; never moves down
      const marginTop = 0.35 * state.height
      const screenY = state.player.y - state.cam
      if (screenY < marginTop) {
        state.cam = Math.max(0, state.player.y - marginTop)
      }

      // Spawn new platforms above
      spawnUpward()

      // Cull old platforms below view
      const H = state.height
      state.platforms = state.platforms.filter((p) => p.y - state.cam < H + 80)

      // Game over if we fall below bottom edge
      if (state.player.y - state.cam > H + 50) {
        state.gameOver = true
      }

      // Score is height climbed (in pixels -> points)
      state.score = Math.max(state.score, Math.floor(state.cam / 10))
      setScore(state.score)
    }

    // Deterministic pseudo-random for chart background
    function rand(n: number) {
      const s = Math.sin(n * 999.91) * 43758.5453
      return s - Math.floor(s)
    }

    function drawChartBackground(W: number, H: number) {
      // Grid lines (horizontal price levels and vertical separators)
      ctx.fillStyle = '#0b0e13'
      ctx.fillRect(0, 0, W, H)

      const grid = 60
      ctx.strokeStyle = 'rgba(255,255,255,0.07)'
      ctx.lineWidth = 1
      // Horizontal lines
      const startBand = Math.floor(state.cam / grid) - 2
      const endBand = Math.floor((state.cam + H) / grid) + 2
      for (let b = startBand; b <= endBand; b++) {
        const y = b * grid - state.cam
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
        ctx.stroke()
      }
      // Vertical separators
      for (let x = 0; x <= W; x += 70) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, H)
        ctx.stroke()
      }

      // Y-axis labels (fake price scale)
      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      ctx.font = '12px system-ui, -apple-system, Segoe UI, Roboto'
      const priceBase = 69000
      const dollarsPerPx = 2.2
      for (let b = startBand; b <= endBand; b++) {
        const yWorld = b * grid
        const price = Math.round(priceBase + (state.cam + (yWorld - state.cam)) * dollarsPerPx)
        const y = yWorld - state.cam
        ctx.fillText(`$${price.toLocaleString()}`, 8, Math.max(12, y - 6))
      }

      // Candlestick-like hints per band (deterministic so they don't flicker)
      for (let b = startBand; b <= endBand; b++) {
        for (let k = 0; k < 5; k++) {
          const r1 = rand(b * 17.3 + k)
          const r2 = rand(b * 29.7 + k)
          const r3 = rand(b * 41.1 + k)
          const x = 40 + r1 * (W - 80)
          const bodyH = 12 + r2 * 36
          const yCenter = b * grid + (r3 - 0.5) * grid
          const yTop = yCenter - bodyH / 2 - state.cam
          const yBot = yCenter + bodyH / 2 - state.cam
          const bullish = r3 > 0.5
          ctx.strokeStyle = 'rgba(255,255,255,0.15)'
          ctx.beginPath()
          ctx.moveTo(x + 3, yTop - 8)
          ctx.lineTo(x + 3, yBot + 8)
          ctx.stroke()
          ctx.fillStyle = bullish ? 'rgba(0, 200, 120, 0.25)' : 'rgba(220, 70, 90, 0.25)'
          ctx.fillRect(x, yTop, 6, bodyH)
        }
      }

      // Top ticker bar
      ctx.fillStyle = 'rgba(10,12,16,0.9)'
      ctx.fillRect(0, 0, W, 26)
      ctx.fillStyle = 'rgba(255,255,255,0.85)'
      ctx.font = '13px system-ui, -apple-system, Segoe UI, Roboto'
      const livePrice = (69000 + state.cam * dollarsPerPx).toFixed(2)
      ctx.fillText(`JOBLESS/USDC  ${livePrice}`, 10, 17)
    }

    function draw() {
      // Clear and size
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const W = canvas.width / DPR
      const H = canvas.height / DPR

      // Crypto chart themed background
      drawChartBackground(W, H)

      // Platforms
      for (const p of state.platforms) {
        const y = p.y - state.cam
        ctx.fillStyle = 'rgba(255,255,255,0.9)'
        ctx.fillRect(p.x, y, p.w, p.h)
        ctx.strokeStyle = 'rgba(0,0,0,0.25)'
        ctx.strokeRect(p.x + 0.5, y + 0.5, p.w - 1, p.h - 1)
      }

      // Runner
      const size = 64
      const px = state.player.x
      const py = state.player.y - state.cam
      if (runnerReady) {
        ctx.save()
        ctx.translate(px - size / 2, py - size)
        ctx.drawImage(runner, 0, 0, size, size)
        ctx.restore()
      } else {
        ctx.fillStyle = '#ff007a'
        ctx.beginPath()
        ctx.arc(px, py - size / 2, size / 2.2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Score overlay
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.font = '14px system-ui, -apple-system, Segoe UI, Roboto'
      ctx.fillText(`Height: ${Math.floor(state.cam)} px  Score: ${state.score}`, 10, 44)

      if (state.gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.55)'
        ctx.fillRect(0, H / 2 - 36, W, 72)
        ctx.fillStyle = '#ffffff'
        ctx.textAlign = 'center'
        ctx.font = '18px system-ui'
        ctx.fillText('Fell off the chart — tap to restart', W / 2, H / 2)
        ctx.textAlign = 'left'
      }
    }

    function loop(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!state.gameOver) step(dt)
      draw()
      raf = requestAnimationFrame(loop)
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') state.left = true
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') state.right = true
      if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') {
        e.preventDefault()
        jump()
      }
    }
    function onKeyUp(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') state.left = false
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') state.right = false
    }
    function onPointerDown() {
      jump()
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointerdown', onPointerDown)
    resize()
    last = performance.now()
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  return (
    <>
      <Navbar />
      <main className="section py-8 sm:py-12">
        <h1 className="section-title">Games</h1>
        <div className="mb-4 sm:mb-6 card p-4 text-center">
          <p className="text-base sm:text-lg font-semibold text-white/90">
            Have a little fun while you are waiting for the inevitable $jobless pump!
          </p>
          <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <code className="truncate font-mono text-sm sm:text-base text-white/90 px-2 max-w-full">
              {links.mint || 'Add NEXT_PUBLIC_JOBLESS_MINT'}
            </code>
            <button
              onClick={copyCA}
              className="button-secondary px-3 py-2 text-xs sm:text-sm"
              aria-label={copied ? 'Copied contract address' : 'Copy contract address'}
            >
              {copied ? 'Copied' : 'Copy CA'}
            </button>
          </div>
        </div>
        <div className="card p-3 sm:p-4">
          <p className="mb-3 text-sm text-white/80">Endless Climber — JOBLESS charts only go up! Move with A/D or ◀▶ and jump with Space/Up. Don’t fall off the platforms.</p>
          <div className="flex justify-center">
            <div className="relative select-none">
              <canvas ref={canvasRef} className="rounded-lg border border-white/10 bg-black touch-none" />
              {/* Mobile touch zones: bottom-left/right for movement */}
              <div
                className="absolute left-0 right-1/2 top-1/2 bottom-0 opacity-0 sm:opacity-0"
                aria-label="Move left"
                onPointerDown={() => setLeftRef.current?.(true)}
                onPointerUp={() => setLeftRef.current?.(false)}
                onPointerCancel={() => setLeftRef.current?.(false)}
                onPointerLeave={() => setLeftRef.current?.(false)}
              />
              <div
                className="absolute left-1/2 right-0 top-1/2 bottom-0 opacity-0 sm:opacity-0"
                aria-label="Move right"
                onPointerDown={() => setRightRef.current?.(true)}
                onPointerUp={() => setRightRef.current?.(false)}
                onPointerCancel={() => setRightRef.current?.(false)}
                onPointerLeave={() => setRightRef.current?.(false)}
              />
              {/* Jump button centered at bottom */}
              <button
                type="button"
                className="absolute bottom-3 left-1/2 -translate-x-1/2 transform px-6 py-3 rounded-full bg-pink-600/90 text-white text-sm font-semibold shadow-md active:translate-y-px sm:hidden"
                onPointerDown={(e) => { e.preventDefault(); jumpRef.current?.() }}
                aria-label="Jump"
              >
                Jump
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
