import { html } from 'snabbdom-jsx' // eslint-disable-line
import xs from 'xstream'

const vtreeSelector = ({ component$, sources, sinks }) => {
  const vtree$ = component$.map(components => xs.combine(...components.map(x => x.DOM))).flatten()
    .map(([routedComponent, navbar]) => <div className='body'>
      <div className='header'>
        Hackernews
        {navbar}
      </div>
      {routedComponent}
    </div>)

  return { component$, sources, sinks:{ ...sinks, DOM: vtree$ } }
}

export default vtreeSelector
