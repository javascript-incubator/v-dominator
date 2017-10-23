import xs from 'xstream'

const historySelector = ({ component$, sources, sinks }) => {
  return { component$,
    sources,
    sinks:{
      ...sinks,
      history: component$.map(components => xs.merge(...components.map(x => x.history))).flatten().startWith('/top')
    }
  }
}

export default historySelector
