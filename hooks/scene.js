import { CREATURE_CSS, creature } from './creatures.js'

const INK = '#3a2a26'
const r1 = n => Math.round(n * 10) / 10

function rng(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

const DARK = {
  sky0: '#0f1433',
  sky1: '#1f2556',
  sky2: '#3b3a78',
  sky3: '#6a4f86',
  hill0: '#3a4178',
  hill1: '#454d86',
  hill2: '#565f9a',
  ground: '#6f7bb8',
  shade: '#525d9c',
  pine: '#1c3b47',
  pine2: '#27505a',
  frost: '#b3bfe8',
  wall: '#6d4b55',
  wall2: '#553842',
  roof: '#3a2530',
  door: '#3c2934',
  glass: '#ffd45e',
  smoke: '#b5bce6',
  halo: 0.7,
}

const vars = set =>
  Object.entries(set)
    .map(([k, v]) => `--${k}:${v}`)
    .join(';')

function pine(x, y, h) {
  const w = h * 0.5
  const tiers = [0, 0.28, 0.54]
    .map((t, i) => {
      const top = y - h + h * t * 0.9
      const bottom = y - h * 0.12 - h * (0.56 - t) * 0.5 + h * 0.3
      const half = w * (0.42 + i * 0.29)
      return (
        `<path class="${i % 2 ? 'p2' : 'p1'}" d="M${r1(x)},${r1(top)} L${r1(x + half)},${r1(bottom)} L${r1(x - half)},${r1(bottom)} Z"/>` +
        `<path class="fr" d="M${r1(x)},${r1(top)} L${r1(x + half * 0.5)},${r1(top + (bottom - top) * 0.5)} Q${r1(x + half * 0.2)},${r1(top + (bottom - top) * 0.38)} ${r1(x)},${r1(top + (bottom - top) * 0.52)} Q${r1(x - half * 0.2)},${r1(top + (bottom - top) * 0.38)} ${r1(x - half * 0.5)},${r1(top + (bottom - top) * 0.5)} Z"/>`
      )
    })
    .reverse()
    .join('')
  return `<rect class="dr" x="${r1(x - h * 0.035)}" y="${r1(y - h * 0.16)}" width="${r1(h * 0.07)}" height="${r1(h * 0.16)}"/>${tiers}`
}

function bulbs(points) {
  const colors = ['#ffd84a', '#ff6b5e', '#7be08a', '#7cc4ff']
  return points
    .map(
      ([x, y], i) =>
        `<circle class="bulb" style="animation-delay:${-i * 0.7}s" cx="${x}" cy="${y}" r="3.4" fill="${colors[i % 4]}" stroke="${INK}" stroke-width="0.8"/>`,
    )
    .join('')
}

const glass = (x, y, w, h) =>
  `<rect class="gs" x="${x}" y="${y}" width="${w}" height="${h}" rx="2"/><path d="M${x + w / 2},${y} V${y + h} M${x},${y + h / 2} H${x + w}" stroke="${INK}" stroke-width="2" opacity="0.6"/><path class="fr" d="M${x - 3},${y + h} h${w + 6} v4 h${-w - 6} Z"/>`
const wreath = (x, y) =>
  `<circle cx="${x}" cy="${y}" r="7" fill="none" stroke="#2f8f4e" stroke-width="4"/><circle cx="${x}" cy="${y + 6.5}" r="2.2" fill="#d8403c"/>`
const stack = (x, top, w, h) =>
  `<rect class="w2" x="${x}" y="${top}" width="${w}" height="${h}"/><path class="fr" d="M${x - 4},${top + 2} q${w / 2 + 4},-10 ${w + 8},0 l0,5 l${-w - 8},0 Z"/>`

const HOUSES = {
  A: {
    top: [30, -124],
    halo: [-32, -34],
    lights: [-38, -58, -25, -57, -12, -59, 12, -59, 25, -57, 38, -58],
    art: () =>
      stack(20, -122, 20, 44) +
      `<rect class="wl" x="-50" y="-62" width="100" height="62"/><rect class="w2" x="-50" y="-8" width="100" height="8"/>` +
      `<path class="rf" d="M-64,-56 L0,-110 L64,-56 Z"/>` +
      `<path class="fr" d="M-70,-54 L0,-116 L70,-54 Q62,-48 56,-56 Q50,-50 44,-60 L0,-98 L-44,-60 Q-50,-50 -56,-56 Q-62,-48 -70,-54 Z"/>` +
      `<rect class="dr" x="6" y="-36" width="22" height="36" rx="3"/>` +
      wreath(17, -40) +
      glass(-44, -46, 24, 24),
  },
  B: {
    top: [23, -164],
    halo: [0, -66],
    lights: [-30, -92, -18, -90, -6, -92, 6, -92, 18, -90, 30, -92],
    art: () =>
      stack(14, -162, 18, 46) +
      `<rect class="wl" x="-36" y="-98" width="72" height="98"/><rect class="w2" x="-36" y="-8" width="72" height="8"/>` +
      `<path class="rf" d="M-48,-90 L0,-150 L48,-90 Z"/>` +
      `<path class="fr" d="M-54,-88 L0,-157 L54,-88 Q47,-82 42,-90 Q37,-84 32,-94 L0,-136 L-32,-94 Q-37,-84 -42,-90 Q-47,-82 -54,-88 Z"/>` +
      `<circle class="gs" cx="0" cy="-108" r="8"/><path d="M0,-116 V-100 M-8,-108 H8" stroke="${INK}" stroke-width="1.6" opacity="0.6"/>` +
      `<rect class="dr" x="-11" y="-34" width="22" height="34" rx="3"/>` +
      wreath(0, -38) +
      glass(-29, -78, 18, 20) +
      glass(11, -78, 18, 20),
  },
  C: {
    top: [-41, -104],
    halo: [-26, -28],
    lights: [-60, -46, -44, -44, -28, -46, -12, -44, 4, -46, 20, -44, 36, -46, 52, -44],
    art: () =>
      stack(-50, -102, 18, 42) +
      `<rect class="wl" x="-70" y="-50" width="140" height="50" rx="3"/>` +
      `<path d="M-70,-12 H70 M-70,-25 H70 M-70,-38 H70" class="lg" fill="none" stroke-width="2"/>` +
      `<path class="rf" d="M-84,-44 L0,-86 L84,-44 Z"/>` +
      `<path class="fr" d="M-90,-42 L0,-92 L90,-42 Q82,-36 76,-44 Q70,-38 64,-48 L0,-76 L-64,-48 Q-70,-38 -76,-44 Q-82,-36 -90,-42 Z"/>` +
      `<rect class="dr" x="26" y="-34" width="22" height="34" rx="3"/>` +
      wreath(37, -38) +
      glass(-56, -38, 22, 20) +
      glass(-20, -38, 22, 20),
  },
  D: {
    top: [24, -110],
    halo: [0, -30],
    lights: [],
    art: () =>
      stack(18, -108, 13, 36) +
      `<path class="wl" d="M-46,0 L-46,-40 C-46,-92 46,-92 46,-40 L46,0 Z"/>` +
      `<path class="fr" d="M-51,-42 C-49,-102 49,-102 51,-42 Q43,-36 37,-45 Q29,-37 21,-47 Q11,-39 0,-49 Q-11,-39 -21,-47 Q-29,-37 -37,-45 Q-43,-36 -51,-42 Z"/>` +
      `<path class="dr" d="M-11,0 V-24 a11,11 0 0 1 22,0 V0 Z"/>` +
      `<circle class="gs" cx="-28" cy="-26" r="9"/><circle class="gs" cx="28" cy="-26" r="9"/>` +
      `<path d="M-28,-35 V-17 M-37,-26 H-19 M28,-35 V-17 M19,-26 H37" stroke="${INK}" stroke-width="1.6" opacity="0.6"/>` +
      wreath(0, -42),
  },
  E: {
    top: [29, -110],
    halo: [0, -50],
    lights: [-46, -18, -36, -38, -26, -58, 26, -58, 36, -38, 46, -18],
    art: () =>
      stack(22, -108, 14, 40) +
      `<path class="rf" d="M-60,0 L0,-120 L60,0 Z"/><path class="wl" d="M-40,0 L0,-84 L40,0 Z"/>` +
      `<path class="fr" d="M-68,2 L0,-130 L68,2 L55,2 L0,-108 L-55,2 Z"/>` +
      `<rect class="dr" x="-10" y="-30" width="20" height="30" rx="3"/>` +
      `<circle class="gs" cx="0" cy="-52" r="9"/><path d="M0,-61 V-43 M-9,-52 H9" stroke="${INK}" stroke-width="1.6" opacity="0.6"/>` +
      wreath(0, -34),
  },
}

function house(x, y, s, flip, far, kind = 'A') {
  const k = HOUSES[kind]
  const count = far ? (s < 0.45 ? 4 : 7) : 12
  const gap = 8.4 / count
  let flow = ''
  for (let i = 0; i < count; i++) {
    flow += `<circle class="sm strm${i % 2 ? ' strm2' : ''}" style="animation-delay:${r1(-i * gap)}s" cx="0" cy="0" r="${i % 3 ? 9 : 10.5}"/>`
  }
  const pts = []
  for (let i = 0; i < k.lights.length; i += 2) pts.push([k.lights[i], k.lights[i + 1]])
  return (
    `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"${far ? ` opacity="${far}"` : ''}>` +
    `<circle cx="${k.halo[0]}" cy="${k.halo[1]}" r="46" fill="url(#glow)" style="opacity:var(--halo)"/>` +
    `<g opacity="0.5" transform="translate(${k.top[0]} ${k.top[1]})">${flow}</g>` +
    k.art() +
    (far ? '' : bulbs(pts)) +
    `</g>`
  )
}

function bigTree(x, y) {
  const tier = (top, bottom, half, cls) =>
    `<path class="${cls}" d="M0,${top} L${half},${bottom} Q${half * 0.5},${bottom + 10} 0,${bottom} Q${-half * 0.5},${bottom + 10} ${-half},${bottom} Z"/>` +
    `<path class="fr" d="M0,${top} L${half * 0.45},${top + (bottom - top) * 0.45} Q${half * 0.2},${top + (bottom - top) * 0.34} 0,${top + (bottom - top) * 0.48} Q${-half * 0.2},${top + (bottom - top) * 0.34} ${-half * 0.45},${top + (bottom - top) * 0.45} Z"/>`
  const balls = [
    [-30, -40, '#d8403c'],
    [20, -52, '#ffd84a'],
    [44, -30, '#7cc4ff'],
    [-10, -96, '#ffd84a'],
    [24, -108, '#d8403c'],
    [-28, -122, '#7cc4ff'],
    [8, -160, '#d8403c'],
    [-14, -178, '#ffd84a'],
  ]
    .map(([bx, by, c]) => `<circle cx="${bx}" cy="${by}" r="5.5" fill="${c}" stroke="${INK}" stroke-width="1.2"/>`)
    .join('')
  return (
    `<g transform="translate(${x} ${y})">` +
    `<rect class="dr" x="-9" y="-22" width="18" height="24"/>` +
    tier(-110, -20, 78, 'p1') +
    tier(-170, -84, 60, 'p2') +
    tier(-222, -146, 42, 'p1') +
    `<path d="M-58,-44 Q0,-18 60,-50 M-42,-106 Q0,-84 44,-112 M-26,-164 Q0,-148 28,-168" fill="none" stroke="#ffe9a8" stroke-width="2.4" stroke-linecap="round" opacity="0.9"/>` +
    balls +
    bulbs([
      [-44, -36],
      [-16, -28],
      [14, -30],
      [40, -40],
      [-30, -100],
      [0, -93],
      [30, -103],
      [-14, -158],
      [14, -159],
    ]) +
    `<path class="star" d="M0,-246 L5.5,-231 L21,-230 L9,-220 L13,-205 L0,-214 L-13,-205 L-9,-220 L-21,-230 L-5.5,-231 Z" fill="#ffd84a" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>` +
    `</g>`
  )
}

function snowman(x, y, s, flip) {
  return (
    `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">` +
    `<ellipse cx="0" cy="1" rx="30" ry="5" fill="#1b2a44" opacity="0.14"/>` +
    `<path d="M-20,-40 L-42,-58 M20,-40 L44,-54 M44,-54 l8,-6 M44,-54 l9,2" stroke="#6b4630" stroke-width="3" stroke-linecap="round"/>` +
    `<circle class="sb" cx="0" cy="-24" r="26" stroke="${INK}" stroke-width="2"/>` +
    `<circle class="sb" cx="0" cy="-62" r="18" stroke="${INK}" stroke-width="2"/>` +
    `<path d="M-15,-50 Q0,-42 15,-50 L15,-44 Q0,-36 -15,-44 Z" fill="#2f8f4e" stroke="${INK}" stroke-width="1.6"/><path d="M-12,-45 L-17,-30 L-9,-29 L-6,-44 Z" fill="#2f8f4e" stroke="${INK}" stroke-width="1.6"/>` +
    `<circle cx="2" cy="-67" r="2.2" fill="${INK}"/><circle cx="11" cy="-67" r="2.2" fill="${INK}"/>` +
    `<path d="M7,-62 L22,-59 L7,-57 Z" fill="#f08a2c" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>` +
    `<circle cx="2" cy="-30" r="2.4" fill="${INK}"/><circle cx="3" cy="-18" r="2.4" fill="${INK}"/>` +
    `<path d="M-15,-78 h30 M-10,-78 v-16 h20 v16" fill="${INK}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="M-10,-83 h20" stroke="#d8403c" stroke-width="3.5"/>` +
    `</g>`
  )
}

function gift(x, y, w, h, body, ribbon) {
  return (
    `<g transform="translate(${x} ${y})"><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="2" fill="${body}" stroke="${INK}" stroke-width="1.6"/>` +
    `<path d="M0,${-h} V0 M${-w / 2},${-h * 0.55} H${w / 2}" stroke="${ribbon}" stroke-width="4"/>` +
    `<path d="M0,${-h} q-9,-10 -11,-2 q3,5 11,2 q9,-10 11,-2 q-3,5 -11,2" fill="${ribbon}" stroke="${INK}" stroke-width="1.2"/></g>`
  )
}

function cane(x, y) {
  const d = `M${x},${y} V${y - 30} q0,-12 10,-12 q9,0 9,10`
  return `<path d="${d}" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#fffaf0" stroke-width="5" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#d8403c" stroke-width="5" stroke-dasharray="5 6"/>`
}

function snowfall() {
  const rand = rng(5)
  let out = ''
  for (let i = 0; i < 36; i++) {
    const x = r1(rand() * 100)
    const dur = r1(30 + rand() * 24)
    out += `<circle class="fl" style="animation-duration:${dur}s;animation-delay:${r1(-rand() * dur)}s" cx="${x}%" cy="-10" r="${r1(1.8 + rand() * 2.4)}"/>`
  }
  return out
}

function stars() {
  const rand = rng(3)
  let out = ''
  for (let i = 0; i < 50; i++) {
    out += `<circle cx="${r1(rand() * 100)}%" cy="${r1(rand() * 62)}%" r="${r1(0.9 + rand() * 1.4)}" fill="#fff6d6"/>`
  }
  return out
}

const SCENE_CSS = `
.s0{stop-color:var(--sky0)}.s1{stop-color:var(--sky1)}.s2{stop-color:var(--sky2)}.s3{stop-color:var(--sky3)}
.h0{fill:var(--hill0)}.h1{fill:var(--hill1)}.h2{fill:var(--hill2)}.gd{fill:var(--ground)}.sh{fill:var(--shade)}
.p1{fill:var(--pine)}.p2{fill:var(--pine2)}.fr{fill:var(--frost)}.sb{fill:var(--frost)}
.wl{fill:var(--wall)}.w2{fill:var(--wall2)}.rf{fill:var(--roof)}.dr{fill:var(--door)}.gs{fill:var(--glass)}.gl{fill:var(--glass)}
.sm{fill:var(--smoke)}.fl{fill:var(--frost)}
.l0,.l1,.l2,.l3,.d1,.d2{animation-duration:44s;animation-iteration-count:infinite;animation-timing-function:ease-in-out;animation-direction:alternate}
.d1{animation-name:d1}.d2{animation-name:d2}.l0{animation-name:l0}.l1{animation-name:l1}.l2{animation-name:l2}.l3{animation-name:l3}
@keyframes d1{0%{transform:translateX(-6px)}100%{transform:translateX(6px)}}
@keyframes d2{0%{transform:translateX(-13px)}100%{transform:translateX(13px)}}
@keyframes l0{0%{transform:translateX(-6px)}100%{transform:translateX(6px)}}
@keyframes l1{0%{transform:translateX(-14px)}100%{transform:translateX(14px)}}
@keyframes l2{0%{transform:translateX(-24px)}100%{transform:translateX(24px)}}
@keyframes l3{0%{transform:translateX(-36px)}100%{transform:translateX(36px)}}
.lg{stroke:var(--wall2)}
.strm{transform-box:fill-box;transform-origin:50% 50%;animation:strm 8.4s infinite linear}
.strm2{animation-name:strm2}
@keyframes strm{0%{transform:translate(0px,0px) scale(0.75)}20%{transform:translate(4px,-20px) scale(1)}45%{transform:translate(15px,-62px) scale(1.45);opacity:1}70%{transform:translate(29px,-108px) scale(1.95);opacity:0.75}100%{transform:translate(45px,-160px) scale(2.4);opacity:0}}
@keyframes strm2{0%{transform:translate(0px,0px) scale(0.8)}20%{transform:translate(7px,-19px) scale(1.1)}45%{transform:translate(19px,-60px) scale(1.6);opacity:1}70%{transform:translate(33px,-106px) scale(2.1);opacity:0.75}100%{transform:translate(47px,-158px) scale(2.6);opacity:0}}
.sc{transform:scale(var(--s)) translate(-800px,-1000px)}
.fl{animation-name:fall;animation-iteration-count:infinite;animation-timing-function:linear}
.star{transform-box:fill-box;transform-origin:50% 50%;animation:star 5s infinite ease-in-out}
@keyframes fall{0%{transform:translate(0px,0px)}100%{transform:translate(14px,2400px)}}
@keyframes star{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
`

const CREATURES = [
  { kind: 'slime', x: 100, y: 521, range: 26, scale: 0.22, delay: -5, layer: 0 },
  { kind: 'snail', variant: 'blue', x: 226, y: 554, range: 44, scale: 0.27, delay: -17, layer: 0 },
  { kind: 'mushroom', x: 1456, y: 523, range: 20, scale: 0.15, delay: -8.6, layer: 0 },
  { kind: 'mushroom', x: 200, y: 662, range: 32, scale: 0.25, delay: -2.4, layer: 1 },
  { kind: 'slime', variant: 'flip', x: 1350, y: 676, range: 62, scale: 0.37, delay: -11.2, layer: 1 },
  { kind: 'snail', variant: 'green', x: 150, y: 886, range: 300, scale: 0.8, delay: -7 },
  { kind: 'slime', variant: 'flip', x: 560, y: 900, range: 250, scale: 0.8, delay: -4.2 },
  { kind: 'mushroom', x: 330, y: 918, range: 200, scale: 0.85, delay: -3.1 },
  { kind: 'slime', x: 1000, y: 912, range: 230, scale: 0.85, delay: -13.5 },
  { kind: 'mushroom', x: 780, y: 944, range: 220, scale: 0.9, delay: -9.4 },
  { kind: 'snail', variant: 'red', x: 600, y: 990, range: 350, scale: 0.95, delay: -11 },
]

export function buildScene() {
  let css = CREATURE_CSS + SCENE_CSS
  const actors = CREATURES.map(c => {
    const made = creature(c)
    css += made.css
    const svg = c.layer !== undefined ? made.svg : c.y > 960 ? `<g class="d2">${made.svg}</g>` : c.y > 900 ? `<g class="d1">${made.svg}</g>` : made.svg
    return [c.x, svg, c.layer ?? 3]
  })
  let fit = `svg{${vars(DARK)};--s:0.24}`
  for (let w = 600; w <= 3200; w += 100) {
    fit += `@media (min-width:${w}px){svg{--s:${Math.round(((w + 50) * 0.7) / 16) / 100}}}`
  }
  const hills = (cls, y, d) => `<path class="${cls}" d="M-900,${y} H2 V1000 H-900 Z M1598,${y} H2500 V1000 H1598 Z"/><path class="${cls}" d="${d}"/>`
  const layers = [
    {
      cls: 'l0',
      hills: hills('h0', 540, 'M0,540 C120,500 260,540 400,620 C560,700 1040,700 1200,620 C1340,540 1480,500 1600,540 L1600,1000 L0,1000 Z'),
      items: [
        [120, pine(120, 532, 46), 2],
        [245, pine(245, 552, 40), 2],
        [1480, pine(1480, 532, 46), 2],
        [1355, pine(1355, 552, 40), 2],
        [185, house(185, 536, 0.36, false, 0.8)],
        [300, house(300, 576, 0.3, true, 0.8)],
        [1415, house(1415, 536, 0.36, true, 0.8)],
        [1300, house(1300, 576, 0.3, false, 0.8)],
        [40, house(40, 524, 0.3, false, 0.8, 'C')],
        [1560, house(1560, 524, 0.3, true, 0.8, 'C')],
      ],
    },
    {
      cls: 'l1',
      hills: hills('h1', 650, 'M0,650 C140,610 280,660 420,730 C600,800 1000,800 1180,730 C1320,660 1460,610 1600,650 L1600,1000 L0,1000 Z'),
      items: [
        [60, pine(60, 652, 84), 2],
        [250, pine(250, 668, 70), 2],
        [1540, pine(1540, 652, 84), 2],
        [1350, pine(1350, 668, 70), 2],
        [155, house(155, 652, 0.62, false, 0.92, 'D')],
        [330, house(330, 706, 0.5, true, 0.92, 'E')],
        [1445, house(1445, 652, 0.62, true, 0.92, 'E')],
        [1270, house(1270, 706, 0.5, false, 0.92, 'D')],
      ],
    },
    {
      cls: 'l2',
      hills: hills('h2', 770, 'M0,770 C160,740 320,790 480,820 C700,850 900,850 1120,820 C1280,790 1440,740 1600,770 L1600,1000 L0,1000 Z'),
      items: [
        [40, pine(40, 800, 150), 2],
        [1570, pine(1570, 800, 150), 2],
        [235, house(235, 800, 1.05, false)],
        [345, pine(345, 826, 120), 2],
        [1445, house(1445, 796, 0.95, true, undefined, 'C')],
      ],
    },
    {
      cls: 'l3',
      hills:
        hills('gd', 840, 'M0,840 C180,816 340,846 520,850 C760,856 900,856 1100,850 C1280,846 1440,816 1600,840 L1600,1000 L0,1000 Z') +
        `<path class="sh" opacity="0.4" d="M-900,920 H0 V1000 H-900 Z M1600,918 H2500 V1000 H1600 Z"/>` +
        `<path class="sh" opacity="0.4" d="M0,920 C200,896 420,932 640,916 C900,898 1180,932 1380,916 C1480,908 1560,922 1600,918 L1600,1000 L0,1000 Z"/>`,
      items: [
        [1345, bigTree(1345, 858), 2],
        [1290, gift(1290, 862, 30, 24, '#d8403c', '#ffd84a'), 2],
        [1318, gift(1318, 866, 24, 18, '#2f8f4e', '#fffaf0'), 2],
        [1392, gift(1392, 864, 28, 22, '#5aa9e6', '#d8403c'), 2],
        [1418, `<g transform="translate(1418 874) rotate(76)">${cane(0, 0)}</g><path class="gd" d="M1404,880 q10,-12 24,-4 q8,-6 14,4 Z"/>`, 2],
        [95, snowman(95, 872, 1, false)],
        [1545, snowman(1545, 884, 0.9, true)],
        [330, gift(330, 862, 24, 20, '#d8403c', '#fffaf0')],
      ],
    },
  ]
  for (const a of actors) layers[a[2]].items.push([a[0], a[1], 1])
  const order = items => items.slice().sort((a, b) => (a[2] ?? 0) - (b[2] ?? 0))
  const all = layers.map(l => `<g class="${l.cls}">${l.hills}${order(l.items).map(i => i[1]).join('')}</g>`).join('')
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">` +
    `<style>${fit}${css}</style>` +
    `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop class="s0" offset="0"/><stop class="s1" offset="0.2"/><stop class="s2" offset="0.42"/><stop class="s3" offset="0.6"/></linearGradient>` +
    `<radialGradient id="glow"><stop offset="0" stop-color="#fff6c8" stop-opacity="0.95"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient></defs>` +
    `<rect width="100%" height="100%" fill="url(#sky)"/>` +
    stars() +
    `<svg x="9%" y="12%" overflow="visible"><circle r="120" fill="url(#glow)" opacity="0.5"/><circle r="40" fill="#fff3c8"/><circle cx="-12" cy="-10" r="7" fill="#eadfae"/><circle cx="13" cy="12" r="5" fill="#eadfae"/></svg>` +
    `<svg x="50%" y="100%" overflow="visible"><g class="sc">${all}</g></svg>` +
    snowfall() +
    `</svg>`
  )
}
