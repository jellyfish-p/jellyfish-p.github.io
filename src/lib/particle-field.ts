/**
 * 粒子背景引擎（纯 Canvas 2D，无依赖）
 *
 * - 粒子随机漂浮，碰到边缘反弹
 * - 鼠标半径内的粒子被吸引，靠得太近时轻微排斥，避免全部挤成一团
 * - 两个粒子距离小于 linkDistance 时连线，越近线越亮
 */

export interface ParticleFieldOptions {
  /** 每多少平方像素放一个粒子 */
  density: number
  minCount: number
  maxCount: number
  /** 粒子之间自动连线的最大距离（px） */
  linkDistance: number
  /** 鼠标吸引半径（px） */
  pointerRadius: number
  /** 鼠标吸引强度 */
  pointerForce: number
  /** 自由漂浮时的最大速度（px / 帧） */
  maxSpeed: number
  /** 任何时候都不低于这个速度（px / 帧），避免粒子停住 */
  minSpeed: number
  /** 粒子与连线颜色，格式 "r, g, b" */
  color: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

interface Point {
  x: number
  y: number
}

const DEFAULTS: ParticleFieldOptions = {
  density: 11000,
  minCount: 36,
  maxCount: 140,
  linkDistance: 130,
  pointerRadius: 200,
  pointerForce: 0.11,
  maxSpeed: 0.6,
  minSpeed: 0.2,
  color: '255, 255, 255',
}

/** 连线透明度分档数。同档的线合并成一条 path 绘制，减少 stroke 调用 */
const ALPHA_BUCKETS = 8
const LINK_MAX_ALPHA = 0.32
const POINTER_LINK_MAX_ALPHA = 0.5
/** 离鼠标小于这个距离时改为排斥 */
const POINTER_CORE = 28

export class ParticleField {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private readonly opts: ParticleFieldOptions
  private particles: Particle[] = []
  private pointer: Point | null = null
  private width = 0
  private height = 0
  private frame = 0
  private lastTime = 0
  private running = false

  constructor(canvas: HTMLCanvasElement, options: Partial<ParticleFieldOptions> = {}) {
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas 2D is not supported')
    this.canvas = canvas
    this.ctx = ctx
    this.opts = { ...DEFAULTS, ...options }
  }

  /** 按视口尺寸重设画布，并按面积增减粒子数量（保留已有粒子的位置） */
  resize(width: number, height: number): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.width = width
    this.height = height
    this.canvas.width = Math.round(width * dpr)
    this.canvas.height = Math.round(height * dpr)
    this.canvas.style.width = `${width}px`
    this.canvas.style.height = `${height}px`
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const { density, minCount, maxCount } = this.opts
    const target = clamp(Math.round((width * height) / density), minCount, maxCount)

    for (const p of this.particles) {
      p.x = Math.min(p.x, width)
      p.y = Math.min(p.y, height)
    }
    while (this.particles.length < target) this.particles.push(this.spawn())
    this.particles.length = target

    if (!this.running) this.draw()
  }

  setPointer(x: number, y: number): void {
    this.pointer = { x, y }
    if (!this.running) this.draw()
  }

  clearPointer(): void {
    this.pointer = null
    if (!this.running) this.draw()
  }

  start(): void {
    if (this.running) return
    this.running = true
    this.lastTime = 0
    this.frame = requestAnimationFrame(this.tick)
  }

  /** 停止动画，画面保持在最后一帧 */
  stop(): void {
    this.running = false
    cancelAnimationFrame(this.frame)
  }

  private spawn(): Particle {
    const angle = Math.random() * Math.PI * 2
    const { minSpeed, maxSpeed } = this.opts
    const speed = minSpeed + Math.random() * (maxSpeed - minSpeed)
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() < 0.15 ? 2.5 : 1.5,
    }
  }

  private tick = (now: number): void => {
    // dt 以 60fps 的一帧为 1。切到后台再回来时限制步长，避免粒子瞬移
    const dt = this.lastTime ? Math.min((now - this.lastTime) / (1000 / 60), 3) : 1
    this.lastTime = now
    this.step(dt)
    this.draw()
    this.frame = requestAnimationFrame(this.tick)
  }

  private step(dt: number): void {
    const { pointerRadius, pointerForce, maxSpeed, minSpeed } = this.opts
    const pointer = this.pointer
    const r2 = pointerRadius * pointerRadius

    for (const p of this.particles) {
      // 随机游走，让轨迹不是直线
      p.vx += (Math.random() - 0.5) * 0.02 * dt
      p.vy += (Math.random() - 0.5) * 0.02 * dt

      let attracted = false
      if (pointer) {
        const dx = pointer.x - p.x
        const dy = pointer.y - p.y
        const d2 = dx * dx + dy * dy
        if (d2 < r2 && d2 > 0.01) {
          const d = Math.sqrt(d2)
          const f =
            d < POINTER_CORE
              ? -pointerForce * 1.5 * (1 - d / POINTER_CORE)
              : pointerForce * (1 - d / pointerRadius)
          p.vx += (dx / d) * f * dt
          p.vy += (dy / d) * f * dt
          attracted = true
        }
      }

      // 被吸引时允许更快，并加阻尼让粒子绕着鼠标而不是直线冲过去；
      // 鼠标离开后速度慢慢回落到漂浮速度
      const limit = attracted ? maxSpeed * 5 : maxSpeed
      const speed = Math.hypot(p.vx, p.vy)
      if (attracted) {
        p.vx *= 0.97
        p.vy *= 0.97
      }
      if (speed > limit) {
        const k = attracted ? limit / speed : 0.97
        p.vx *= k
        p.vy *= k
      }

      // 最低速度：太慢时沿当前方向加速；几乎静止时随机挑一个方向
      const current = Math.hypot(p.vx, p.vy)
      if (current < minSpeed) {
        if (current < 1e-6) {
          const angle = Math.random() * Math.PI * 2
          p.vx = Math.cos(angle) * minSpeed
          p.vy = Math.sin(angle) * minSpeed
        } else {
          p.vx *= minSpeed / current
          p.vy *= minSpeed / current
        }
      }

      p.x += p.vx * dt
      p.y += p.vy * dt

      if (p.x < 0) {
        p.x = 0
        p.vx = Math.abs(p.vx)
      } else if (p.x > this.width) {
        p.x = this.width
        p.vx = -Math.abs(p.vx)
      }
      if (p.y < 0) {
        p.y = 0
        p.vy = Math.abs(p.vy)
      } else if (p.y > this.height) {
        p.y = this.height
        p.vy = -Math.abs(p.vy)
      }
    }
  }

  private draw(): void {
    const { ctx, particles } = this
    const { linkDistance, pointerRadius, color } = this.opts
    ctx.clearRect(0, 0, this.width, this.height)

    // 粒子之间的连线，按透明度分档批量绘制
    const buckets: number[][] = Array.from({ length: ALPHA_BUCKETS }, () => [])
    const l2 = linkDistance * linkDistance
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i]!
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j]!
        const dx = a.x - b.x
        const dy = a.y - b.y
        const d2 = dx * dx + dy * dy
        if (d2 >= l2) continue
        const strength = 1 - Math.sqrt(d2) / linkDistance
        const bucket = Math.min(ALPHA_BUCKETS - 1, Math.floor(strength * ALPHA_BUCKETS))
        buckets[bucket]!.push(a.x, a.y, b.x, b.y)
      }
    }

    ctx.lineWidth = 1
    buckets.forEach((segments, i) => {
      if (segments.length === 0) return
      ctx.strokeStyle = `rgba(${color}, ${(((i + 1) / ALPHA_BUCKETS) * LINK_MAX_ALPHA).toFixed(3)})`
      ctx.beginPath()
      for (let k = 0; k < segments.length; k += 4) {
        ctx.moveTo(segments[k]!, segments[k + 1]!)
        ctx.lineTo(segments[k + 2]!, segments[k + 3]!)
      }
      ctx.stroke()
    })

    // 鼠标与半径内粒子的连线
    const pointer = this.pointer
    if (pointer) {
      for (const p of particles) {
        const d = Math.hypot(pointer.x - p.x, pointer.y - p.y)
        if (d >= pointerRadius) continue
        ctx.strokeStyle = `rgba(${color}, ${((1 - d / pointerRadius) * POINTER_LINK_MAX_ALPHA).toFixed(3)})`
        ctx.beginPath()
        ctx.moveTo(pointer.x, pointer.y)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      }
    }

    // 方形粒子
    ctx.fillStyle = `rgba(${color}, 0.75)`
    for (const p of particles) {
      const half = p.size / 2
      ctx.fillRect(p.x - half, p.y - half, p.size, p.size)
    }
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}
