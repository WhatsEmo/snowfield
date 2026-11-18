const INK = '#3a2a26'

const r1 = n => Math.round(n * 10) / 10

function hat(d = '') {
  return [
    `<g class="c-tail"${d}>`,
    `<path d="M16,-45 C14,-66 -12,-72 -28,-56 C-38,-46 -42,-29 -43,-14 L-34,-13 C-33,-20 -30,-25 -24,-29 C-20,-32 -17,-35 -16,-39 Z" fill="#d8403c" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`,
    `<circle cx="-39" cy="-9" r="6" fill="#fffaf0" stroke="${INK}" stroke-width="2"/>`,
    `</g>`,
    `<path d="M-17,-39 Q-1,-47 15,-44" fill="none" stroke="${INK}" stroke-width="11" stroke-linecap="round"/>`,
    `<path d="M-17,-39 Q-1,-47 15,-44" fill="none" stroke="#fffaf0" stroke-width="7.5" stroke-linecap="round"/>`,
  ].join('')
}

const SLIMES = {
  A: {
    d: 'M-26,0 C-38,0 -36,-22 -25,-34 C-16,-44 -7,-47 0,-47 C7,-47 16,-44 25,-34 C36,-22 38,0 26,0 Z',
    clip: 'M0,-90 H60 V10 H0 Z',
    seam: 'M0,-47 C-3,-36 3,-24 -1,-12 C-2,-7 1,-3 0,0',
    face: 'translate(0 0)',
    hat: 'translate(0 0)',
    shine: [-17, -27],
  },
  B: {
    d: 'M-18,0 C-32,0 -37,-10 -34,-20 C-32,-28 -28,-31 -25,-34 C-16,-44 -7,-47 0,-47 C7,-47 16,-44 25,-34 C28,-31 32,-28 34,-20 C37,-10 32,0 18,0 Z',
    clip: 'M0,-90 H60 V10 H0 Z',
    seam: 'M0,-47 C-3,-36 3,-24 -1,-12 C-2,-7 1,-3 0,0',
    face: 'translate(0 0)',
    hat: 'translate(0 0)',
    shine: [-17, -27],
  },
  C: {
    d: 'M-11,0 C-28,0 -37,-8 -35,-20 C-33,-28 -29,-31 -25,-34 C-16,-44 -7,-47 0,-47 C7,-47 16,-44 25,-34 C29,-31 33,-28 35,-20 C37,-8 28,0 11,0 Z',
    clip: 'M0,-90 H60 V10 H0 Z',
    seam: 'M0,-47 C-3,-36 3,-24 -1,-12 C-2,-7 1,-3 0,0',
    face: 'translate(0 0)',
    hat: 'translate(0 0)',
    shine: [-17, -27],
  },
  D: {
    d: 'M-5,0 C-24,0 -34,-10 -34,-24 C-34,-38 -20,-50 0,-50 C20,-50 34,-38 34,-24 C34,-10 24,0 5,0 Z',
    clip: 'M0,-90 H60 V10 H0 Z',
    seam: 'M0,-50 C-3,-38 3,-24 -1,-12 C-2,-7 1,-3 0,0',
    face: 'translate(0 0)',
    hat: 'translate(0 -3)',
    shine: [-17, -27],
  },
  E: {
    d: 'M-8,0 C-26,0 -36,-9 -35,-22 C-34,-33 -24,-42 -14,-46 C-9,-48 -4,-48.5 0,-48.5 C4,-48.5 9,-48 14,-46 C24,-42 34,-33 35,-22 C36,-9 26,0 8,0 Z',
    clip: 'M0,-90 H60 V10 H0 Z',
    seam: 'M0,-48.5 C-3,-37 3,-24 -1,-12 C-2,-7 1,-3 0,0',
    face: 'translate(0 0)',
    hat: 'translate(0 -1.5)',
    shine: [-17, -27],
  },
}

let clipSeq = 0

function slimeArt(flipColors, style = 'E', d = '') {
  const k = SLIMES[style]
  const first = flipColors ? '#e2554c' : '#6fcf5a'
  const second = flipColors ? '#6fcf5a' : '#e2554c'
  clipSeq += 1
  const id = `c-clip${clipSeq}`
  return [
    `<clipPath id="${id}"><path d="${k.clip}"/></clipPath>`,
    `<path d="${k.d}" fill="${first}"/>`,
    `<g clip-path="url(#${id})"><path d="${k.d}" fill="${second}"/></g>`,
    `<path d="${k.seam}" fill="none" stroke="#fffaf0" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>`,
    `<path d="${k.d}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`,
    `<ellipse cx="${k.shine[0]}" cy="${k.shine[1]}" rx="5" ry="8" fill="#ffffff" opacity="0.4" transform="rotate(28 ${k.shine[0]} ${k.shine[1]})"/>`,
    `<g transform="${k.face}">`,
    `<g class="c-eyes"><circle cx="-1" cy="-20" r="5.2" fill="#1c1414"/><circle cx="21" cy="-20" r="5.2" fill="#1c1414"/><path d="M-1,-23.2 V-16.8 M-4.2,-20 H2.2 M21,-23.2 V-16.8 M17.8,-20 H24.2" stroke="#ffd84a" stroke-width="1.9" stroke-linecap="round"/></g>`,
    `<path class="c-shut"${d} d="M6.5,-10.5 q3.5,3.5 7,0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`,
    `<g class="c-open"${d} opacity="0"><ellipse cx="10" cy="-8.5" rx="4.2" ry="4.8" fill="#5a1f1f" stroke="${INK}" stroke-width="1.6"/><ellipse cx="10" cy="-6.2" rx="2.4" ry="1.6" fill="#ff8f8f"/></g>`,
    `</g>`,
    `<g transform="${k.hat}">${hat(d)}</g>`,
  ].join('')
}

function mushroomArt(d = '') {
  return {
    body: [
      `<path d="M-27,-16 C-27,-32 -15,-41 1,-41 C18,-41 30,-33 31,-18 C32,-5 18,0 2,0 C-15,0 -27,-4 -27,-16 Z" fill="#f8ebcd" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`,
      `<path d="M-16,-5 C-6,-1.4 9,-1.4 20,-5" fill="none" stroke="#e3cfa6" stroke-width="2.5" stroke-linecap="round"/>`,
      `<g transform="translate(2 -7)">`,
      `<g class="c-eyes"><ellipse cx="3" cy="-13.5" rx="2.7" ry="4.4" fill="${INK}"/><ellipse cx="15" cy="-13.5" rx="2.7" ry="4.4" fill="${INK}"/><circle cx="3.9" cy="-15.3" r="1" fill="#ffffff"/><circle cx="15.9" cy="-15.3" r="1" fill="#ffffff"/></g>`,
      `<path d="M4.6,-7 q2.2,3 4.4,0 q2.2,3 4.4,0" fill="none" stroke="${INK}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`,
      `<ellipse cx="-4" cy="-8" rx="3.4" ry="2" fill="#ff9d9d" opacity="0.6"/>`,
      `<ellipse cx="21" cy="-8.5" rx="2.4" ry="1.8" fill="#ff9d9d" opacity="0.6"/>`,
  `</g>`,
    ].join(''),
    scarf: [
      `<path d="M-17,-24 L-26,-8 L-17,-5 L-10,-21 Z" fill="#c93a36" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>`,
      `<path d="M-23.5,-12.5 L-15,-9.5" stroke="#fffaf0" stroke-width="2.2"/>`,
      `<path d="M-21,-31 C-8,-25 8,-25 21,-31 L22,-23 C8,-17 -8,-17 -22,-23 Z" fill="#d8403c" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`,
      `<path d="M-9,-26.3 L-9,-19.3 M2,-25.6 L2,-18.6 M13,-27.5 L13,-20.4" stroke="#2f8f4e" stroke-width="2.6"/>`,
    ].join('').replace(/^/, '<g transform="translate(0 -7)">') + '</g>',
    cap: [
      `<path d="M-43,-36 C-47,-64 -23,-80 0,-80 C23,-80 47,-64 43,-36 C41,-26 28,-25 0,-25 C-28,-25 -41,-26 -43,-36 Z" fill="#f08a2c" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>`,
      `<path d="M-37,-33 C-22,-29 22,-29 37,-33" fill="none" stroke="#c9661a" stroke-width="3.5" stroke-linecap="round" opacity="0.55"/>`,
      `<ellipse cx="-26" cy="-49" rx="7.5" ry="6" fill="#ffc373"/>`,
      `<ellipse cx="25" cy="-47" rx="8" ry="6.5" fill="#ffc373"/>`,
      `<ellipse cx="0" cy="-44" rx="5.5" ry="4.2" fill="#ffc373"/>`,
      `<path class="c-snow"${d} d="M-29,-67 C-17,-84 17,-84 29,-67 C24,-61 19,-67 13,-62 C8,-57 1,-65 -5,-61 C-11,-56 -19,-65 -29,-67 Z" fill="#ffffff" stroke="#9fb6cc" stroke-width="1.6" stroke-linejoin="round"/>`,
    ].join('').replace(/^/, '<g transform="translate(0 -7)">') + '</g>',
  }
}

function spiral(cx, cy, max) {
  const pts = []
  for (let i = 0; i <= 44; i++) {
    const t = i / 44
    const a = -0.4 + t * Math.PI * 4.4
    const r = 1.5 + t * (max - 1.5)
    pts.push(`${r1(cx + Math.cos(a) * r)},${r1(cy + Math.sin(a) * r)}`)
  }
  return `M${pts.join(' L')}`
}

const SNAIL_SHELLS = {
  green: ['#63c267', '#2f7d3c'],
  blue: ['#5aa9e6', '#2a5f9e'],
  red: ['#e8605a', '#9c2f2c'],
}

const SNAILS = {
  A: {
    body: 'M-31,0 C-31,-5 -23,-8 -10,-8 L9,-8 C14,-8 15,-14 15,-20 C15,-28 27,-29 29,-21 C31,-11 29,0 21,0 Z',
    stalks: [19, -26, 16, -38, 25, -26, 29, -38],
    shell: [-6, -21, 16],
    lights: true,
  },
  B: {
    body: 'M-25,0 C-25,-5 -19,-7 -9,-7 L11,-7 C15,-7 16,-13 16,-22 C16,-33 30,-34 32,-23 C34,-10 30,0 22,0 Z',
    stalks: [20, -29, 16, -42, 28, -29, 32, -41],
    shell: [-4, -23, 20],
    lights: true,
    eye: 5.4,
    mark: 'arch',
  },
  C: {
    body: 'M-25,0 C-25,-5 -19,-7 -9,-7 L11,-7 C15,-7 16,-11 16,-16 C16,-24 28,-25 30,-17 C32,-8 29,0 22,0 Z',
    stalks: [20, -22, 18, -31, 26, -22, 30, -31],
    shell: [-4, -23, 20],
    bow: true,
  },
  D: {
    body: 'M-22,0 C-22,-5 -17,-7 -8,-7 L12,-7 C16,-7 18,-10 18,-14 C18,-22 30,-22 31,-14 C32,-7 29,0 23,0 Z',
    stalks: [22, -19, 21, -27, 28, -19, 31, -26],
    shell: [-3, -25, 23],
  },
}

SNAILS.B1 = { ...SNAILS.B, mark: 'arch' }
SNAILS.B2 = { ...SNAILS.B, mark: 'cup' }
SNAILS.B3 = { ...SNAILS.B, mark: 'side' }

function eyeMark(kind, x, y, e) {
  const line = d => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`
  if (kind === 'arch') {
    return line(`M${r1(x - e * 0.5)},${r1(y + e * 0.2)} Q${x},${r1(y - e * 0.7)} ${r1(x + e * 0.5)},${r1(y + e * 0.2)}`)
  }
  if (kind === 'cup') {
    return line(`M${r1(x - e * 0.5)},${r1(y - e * 0.2)} Q${x},${r1(y + e * 0.7)} ${r1(x + e * 0.5)},${r1(y - e * 0.2)}`)
  }
  if (kind === 'side') {
    return line(`M${r1(x)},${r1(y - e * 0.5)} Q${r1(x + e * 0.75)},${y} ${r1(x)},${r1(y + e * 0.5)}`)
  }
  return `<circle cx="${r1(x + e * 0.3)}" cy="${y}" r="${r1(e * 0.42)}" fill="${INK}"/>`
}

function snailArt(color, style = 'B') {
  const [shell, dark] = SNAIL_SHELLS[color]
  const k = SNAILS[style]
  const [cx, cy, r] = k.shell
  const [ax, ay, bx, by, ex, ey, fx, fy] = k.stalks
  const eye = k.eye ?? 3.6
  const bulbs = ['#ffd84a', '#ff6b5e', '#7be08a', '#7cc4ff', '#ffd84a']
  const lights = k.lights
    ? `<path d="M${r1(cx - r * 0.91)},${r1(cy - r * 0.42)} A${r},${r} 0 0 1 ${r1(cx + r * 0.91)},${r1(cy - r * 0.42)}" fill="none" stroke="${INK}" stroke-width="1.2"/>` +
      bulbs
        .map((c, i) => {
          const a = (205 + i * 32.5) * (Math.PI / 180)
          return `<circle class="bulb" style="animation-delay:${-i * 0.9}s" cx="${r1(cx + Math.cos(a) * r)}" cy="${r1(cy + Math.sin(a) * r)}" r="3" fill="${c}" stroke="${INK}" stroke-width="1"/>`
        })
        .join('')
    : ''
  const bow = k.bow
    ? `<g transform="translate(${cx} ${cy - r})"><path d="M0,0 L-9,-6 L-9,5 Z M0,0 L9,-6 L9,5 Z" fill="#d8403c" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/><circle r="3" fill="#ffd84a" stroke="${INK}" stroke-width="1.4"/></g>`
    : ''
  const stalkPath = `M${ax},${ay} L${bx},${by} M${ex},${ey} L${fx},${fy}`
  return {
    body: [
      `<path d="${k.body}" fill="#f6deb0" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`,
      `<path d="M25,-11 q2,2 4,0" fill="none" stroke="${INK}" stroke-width="1.5" stroke-linecap="round"/>`,
      `<ellipse cx="20.5" cy="-12" rx="2.6" ry="1.6" fill="#ff9d9d" opacity="0.6"/>`,
    ].join(''),
    stalks: [
      `<path d="${stalkPath}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`,
      `<path d="${stalkPath}" stroke="#f6deb0" stroke-width="3" stroke-linecap="round"/>`,
      `<g class="c-eyes"><circle cx="${bx}" cy="${by - 1}" r="${eye}" fill="#ffffff" stroke="${INK}" stroke-width="1.6"/><circle cx="${fx}" cy="${fy - 1}" r="${eye}" fill="#ffffff" stroke="${INK}" stroke-width="1.6"/>${eyeMark(k.mark, bx, by - 1, eye)}${eyeMark(k.mark, fx, fy - 1, eye)}</g>`,
    ].join(''),
    shell: [
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${shell}" stroke="${INK}" stroke-width="2.4"/>`,
      `<path d="${spiral(cx, cy, r - 3)}" fill="none" stroke="${dark}" stroke-width="2.2" stroke-linecap="round"/>`,
      `<ellipse cx="${r1(cx - r * 0.45)}" cy="${r1(cy - r * 0.5)}" rx="3" ry="5" fill="#ffffff" opacity="0.35" transform="rotate(40 ${r1(cx - r * 0.45)} ${r1(cy - r * 0.5)})"/>`,
      lights,
      bow,
    ].join(''),
  }
}

const KINDS = {
  slime: { period: 1.6, step: 28, air: [0.45, 0.78], burst: 3, rest: 3, shadow: 27 },
  mushroom: { period: 1.3, step: 18, air: [0.45, 0.75], burst: 4, rest: 4, shadow: 31 },
  snail: { period: 2.4, step: 8, air: [0, 1], burst: 5, rest: 2, shadow: 26 },
}
const SNAIL_STEP = { green: 8, blue: 10, red: 13 }

const pct = n => `${Math.round(n * 10000) / 100}%`

function plan(count, burst, rest) {
  const leg = []
  let left = count
  while (left > 0) {
    const n = Math.min(burst, left)
    leg.push({ move: true, periods: n })
    leg.push({ move: false, periods: rest })
    left -= n
  }
  return leg
}

function cycle(name, k, step, count) {
  const leg = plan(count, k.burst, k.rest)
  const legPeriods = leg.reduce((n, s) => n + s.periods, 0)
  const total = legPeriods * 2
  const [a, b] = k.air
  const travel = ['0%{transform:translateX(0px)}']
  const move = []
  const idle = []
  let at = 0
  let x = 0
  for (const dir of [1, -1]) {
    for (const seg of leg) {
      move.push(`${pct(at / total)}{opacity:${seg.move ? 1 : 0}}`)
      idle.push(`${pct(at / total)}{opacity:${seg.move ? 0 : 1}}`)
      if (seg.move && a === 0 && b === 1) {
        travel.push(`${pct(at / total)}{transform:translateX(${r1(x)}px)}`)
        x += dir * step * seg.periods
        travel.push(`${pct((at + seg.periods) / total)}{transform:translateX(${r1(x)}px)}`)
      } else if (seg.move) {
        for (let i = 0; i < seg.periods; i++) {
          travel.push(`${pct((at + i + a) / total)}{transform:translateX(${r1(x)}px)}`)
          x += dir * step
          travel.push(`${pct((at + i + b) / total)}{transform:translateX(${r1(x)}px)}`)
        }
      }
      at += seg.periods
    }
  }
  travel.push('100%{transform:translateX(0px)}')
  const last = '100%{opacity:1}'
  return {
    seconds: r1(total * k.period),
    css: `@keyframes ${name}{${travel.join('')}}@keyframes ${name}m{${move.join('')}${last}}@keyframes ${name}i{${idle.join('')}100%{opacity:0}}`,
  }
}

export const CREATURE_CSS = `
.c-hop,.c-cap,.c-crawl,.c-stalks,.c-shadow,.c-eyes,.c-rest{transform-box:fill-box}
.c-flip{animation-name:c-flip;animation-timing-function:step-end;animation-iteration-count:infinite}
.c-travel{animation-timing-function:linear;animation-iteration-count:infinite}
.c-show{animation-timing-function:step-end;animation-iteration-count:infinite}
.c-eyes{transform-origin:50% 50%;animation:c-blink 4.6s infinite}
.c-slime .c-hop{transform-origin:50% 100%;animation:c-slime-hop 1.6s infinite ease-in-out}
.c-slime .c-shadow{transform-origin:50% 50%;animation:c-shadow 1.6s infinite ease-in-out}
.c-slime .c-rest{transform-origin:50% 100%;animation:c-jelly 2.4s infinite ease-in-out}
.c-mushroom .c-hop{transform-origin:50% 100%;animation:c-mush-hop 1.3s infinite ease-in-out}
.c-mushroom .c-hop .c-cap{transform-origin:50% 90%;animation:c-mush-cap 1.3s infinite ease-in-out}
.c-mushroom .c-shadow{transform-origin:50% 50%;animation:c-shadow 1.3s infinite ease-in-out}
.c-mushroom .c-rest{transform-origin:50% 100%;animation:c-breathe 2.6s infinite ease-in-out}
.c-mushroom .c-rest .c-cap{transform-origin:50% 90%;animation:c-cap-rest 5.2s infinite ease-in-out}
.c-snail .c-crawl{transform-origin:0% 100%;animation:c-crawl 2.4s infinite ease-in-out}
.c-snail .c-crawl .c-stalks{transform-origin:40% 100%;animation:c-stalks 2.4s infinite ease-in-out}
.c-snail .c-rest .c-stalks{transform-origin:40% 100%;animation:c-look 4.8s infinite ease-in-out}
.c-hop .c-shut{animation:c-shut 1.6s infinite step-end}
.c-hop .c-open{animation:c-open 1.6s infinite step-end}
@keyframes c-shut{0%{opacity:1}41%{opacity:0}80%{opacity:1}100%{opacity:1}}
@keyframes c-open{0%{opacity:0}41%{opacity:1}80%{opacity:0}100%{opacity:0}}
.c-snow{transform-box:fill-box;transform-origin:50% 100%}
.c-hop .c-snow{animation:c-snow 1.3s infinite ease-in-out}
.c-flake{animation-duration:1.3s;animation-iteration-count:infinite;animation-timing-function:ease-in}
.c-f1{animation-name:c-flake1}.c-f2{animation-name:c-flake2}.c-f3{animation-name:c-flake3}
@keyframes c-snow{0%,36%{transform:translateY(0px) scale(1,1)}46%{transform:translateY(1px) scale(1.03,0.92)}61%{transform:translateY(-3.5px) scale(0.98,1.06)}75%{transform:translateY(1.5px) scale(1.04,0.88)}86%{transform:translateY(-1px) scale(0.99,1.04)}100%{transform:translateY(0px) scale(1,1)}}
@keyframes c-flake1{0%,59%{opacity:0;transform:translate(0px,-13px)}61%{opacity:1;transform:translate(0px,-13px)}92%{opacity:1}100%{opacity:0;transform:translate(-7px,50px)}}
@keyframes c-flake2{0%,61%{opacity:0;transform:translate(0px,-13px)}63%{opacity:1;transform:translate(0px,-13px)}93%{opacity:1}100%{opacity:0;transform:translate(8px,53px)}}
@keyframes c-flake3{0%,64%{opacity:0;transform:translate(0px,-12px)}66%{opacity:1;transform:translate(0px,-12px)}94%{opacity:1}100%{opacity:0;transform:translate(-13px,64px)}}
.c-tail{transform-box:fill-box;transform-origin:64% 30%}
.c-hop .c-tail{animation:c-tail-hop 1.6s infinite ease-in-out}
.c-rest .c-tail{animation:c-tail-rest 2.4s infinite ease-in-out}
@keyframes c-tail-hop{0%,30%{transform:rotate(0deg)}41%{transform:rotate(-4deg)}55%{transform:rotate(-7deg)}63%{transform:rotate(6deg)}76%{transform:rotate(28deg)}84%{transform:rotate(-7deg)}91%{transform:rotate(5deg)}96%{transform:rotate(-2deg)}100%{transform:rotate(0deg)}}
@keyframes c-tail-rest{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-2.5deg)}}
.bulb{animation:c-bulb 4.5s infinite ease-in-out}
@keyframes c-flip{0%{transform:scaleX(1)}50%{transform:scaleX(-1)}100%{transform:scaleX(-1)}}
@keyframes c-blink{0%,91%{transform:scaleY(1)}94%{transform:scaleY(0.1)}97%,100%{transform:scaleY(1)}}
@keyframes c-slime-hop{0%,30%{transform:translateY(0px) scale(1,1)}41%{transform:translateY(0px) scale(1.1,0.86)}55%{transform:translateY(-19px) scale(0.93,1.1)}63%{transform:translateY(-23px) scale(1,1)}78%{transform:translateY(0px) scale(1.12,0.84)}89%{transform:translateY(0px) scale(0.97,1.04)}100%{transform:translateY(0px) scale(1,1)}}
@keyframes c-mush-hop{0%{transform:translateY(0px) rotate(0deg) scale(1,1)}11%{transform:translateY(0px) rotate(-3deg) scale(1,1)}23%{transform:translateY(0px) rotate(3deg) scale(1,1)}34%{transform:translateY(0px) rotate(0deg) scale(1,1)}42%{transform:translateY(0px) rotate(0deg) scale(1.06,0.92)}55%{transform:translateY(-11px) rotate(0deg) scale(0.96,1.06)}61%{transform:translateY(-13px) rotate(0deg) scale(1,1)}75%{transform:translateY(0px) rotate(0deg) scale(1.08,0.9)}88%,100%{transform:translateY(0px) rotate(0deg) scale(1,1)}}
@keyframes c-mush-cap{0%,36%{transform:rotate(0deg) scale(1,1)}46%{transform:rotate(0deg) scale(1.05,0.88)}58%{transform:rotate(-5deg) scale(0.96,1.08)}75%{transform:rotate(3deg) scale(1.09,0.82)}86%{transform:rotate(1deg) scale(0.98,1.05)}94%,100%{transform:rotate(0deg) scale(1,1)}}
@keyframes c-shadow{0%,41%{transform:scale(1);opacity:0.16}62%{transform:scale(0.7);opacity:0.08}78%,100%{transform:scale(1);opacity:0.16}}
@keyframes c-jelly{0%,100%{transform:scale(1,1)}50%{transform:scale(1.04,0.95)}}
@keyframes c-breathe{0%,100%{transform:scale(1,1)}50%{transform:scale(1.025,0.965)}}
@keyframes c-cap-rest{0%,100%{transform:rotate(-1.5deg)}50%{transform:rotate(1.5deg)}}
@keyframes c-crawl{0%,100%{transform:scale(1,1)}50%{transform:scale(1.07,0.96)}}
@keyframes c-stalks{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(5deg)}}
@keyframes c-look{0%,100%{transform:rotate(0deg)}25%{transform:rotate(-12deg)}40%{transform:rotate(-12deg)}65%{transform:rotate(9deg)}80%{transform:rotate(9deg)}}
@keyframes c-bulb{0%,100%{opacity:1}50%{opacity:0.55}}
`

let seq = 0

function copies(kind, variant, k, delay, shape) {
  const d = delay ? ` style="animation-delay:${delay}s"` : ''
  const still = `<ellipse cx="0" cy="1" rx="${k.shadow}" ry="4" fill="#1b2a44" opacity="0.16"/>`
  const live = `<ellipse class="c-shadow"${d} cx="0" cy="1" rx="${k.shadow}" ry="4" fill="#1b2a44" opacity="0.16"/>`
  if (kind === 'slime') {
    const style = typeof shape === 'string' ? shape : 'E'
    return {
      move: `${live}<g class="c-hop"${d}>${slimeArt(variant === 'flip', style, d)}</g>`,
      idle: `${still}<g class="c-rest">${slimeArt(variant === 'flip', style)}</g>`,
    }
  }
  if (kind === 'mushroom') {
    const art = mushroomArt()
    const live2 = mushroomArt(d)
    const flakes =
      `<circle class="c-flake c-f1"${d} cx="-43" cy="-52" r="3.2" fill="#ffffff" stroke="#9fb6cc" stroke-width="0.8" opacity="0"/>` +
      `<circle class="c-flake c-f2"${d} cx="43" cy="-55" r="2.7" fill="#ffffff" stroke="#9fb6cc" stroke-width="0.8" opacity="0"/>` +
      `<circle class="c-flake c-f3"${d} cx="-37" cy="-66" r="2.3" fill="#ffffff" stroke="#9fb6cc" stroke-width="0.8" opacity="0"/>`
    const { cw = 1, ch = 1, bw = 1.2, bh = 1.12 } = shape ?? {}
    const whole = (c, art = mushroomArt()) =>
      `<g transform="scale(${bw} ${bh})">${art.body}${art.scarf}</g>` +
      `<g transform="translate(0 ${r1(-32 * bh)}) scale(${cw} ${ch}) translate(0 32)"><g class="c-cap"${c}>${art.cap}</g></g>`
    return { move: `${live}<g class="c-hop"${d}>${whole(d, live2)}</g>${flakes}`, idle: `${still}<g class="c-rest">${whole('')}</g>` }
  }
  const art = snailArt(variant, typeof shape === 'string' ? shape : 'B')
  const whole = `${art.body}<g class="c-stalks">${art.stalks}</g>`
  return {
    move: `${still}<g class="c-crawl"${d}>${whole}</g>${art.shell}`,
    idle: `${still}<g class="c-rest">${whole}</g>${art.shell}`,
  }
}

export function creature({ kind, x, y, scale = 1, range = 0, delay = 0, variant, state, shape, faceLeft = false }) {
  seq += 1
  const id = `c-t${seq}`
  const k = KINDS[kind]
  const base = `translate(${x} ${y}) scale(${faceLeft ? -scale : scale} ${scale})`
  const art = copies(kind, variant, k, delay, shape)

  if (state === 'idle' || state === 'move') {
    return { svg: `<g class="c-${kind}" transform="${base}">${art[state]}</g>`, css: '' }
  }

  const step = kind === 'snail' ? SNAIL_STEP[variant] : k.step
  const count = Math.max(1, Math.round(range / scale / step))
  const made = cycle(id, k, step, count)
  const time = `animation-duration:${made.seconds}s;animation-delay:${delay}s`
  const svg =
    `<g class="c-${kind}" transform="${base}"><g class="c-travel" style="animation-name:${id};${time}"><g class="c-flip" style="${time}">` +
    `<g class="c-show" style="animation-name:${id}m;${time}">${art.move}</g>` +
    `<g class="c-show" style="animation-name:${id}i;${time}" opacity="0">${art.idle}</g>` +
    `</g></g></g>`
  return { svg, css: made.css }
}
