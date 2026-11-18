import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'
import { buildScene } from './scene.js'

const SCENE = buildScene()

const { theme, problems } = makeColors({
  label: 'Snowfield',
  roles: { accent: '#7d5fd0', danger: '#c2453f', success: '#3f8a5a', warning: '#b07d1c', pro: '#b0508f' },
  only: 'dark',
  dark: {
    gray: {
      anchors: {
        'surface-0': '#171a38',
        'surface-1': '#1e2145',
        'surface-2': '#252950',
        'surface-3': '#2b2f5a',
        'text-primary': '#ece8fb',
        'text-secondary': '#c9c3e6',
        'text-muted': '#a49ec8',
      },
    },
  },
})

const LOOK: ThemeSetArgs = {
  colors: theme,
  backdrop: { scene: 'snowfield', glass: { blur: 6, opacity: 0.45 } },
  overrideColorScheme: 'dark',
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }

    const { Svg } = $.ui.resolve(e)

    return <Svg source={SCENE} alt="A snowy village at night with slimes, mushrooms and snails" isInteractive />
  })
}
