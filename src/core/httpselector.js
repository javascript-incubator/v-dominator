import xs from 'xstream'

const httpSelector = ({ component$, sources, sinks }) => {
  const http = component$.map(components => xs.merge(...components.map(x => x.HTTP))).flatten()
  return { component$, sources, sinks: { ...sinks, HTTP: http } }
}

export default httpSelector
