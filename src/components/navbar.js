import { html } from 'snabbdom-jsx' //eslint-disable-line
import xs from 'xstream'

export default function navbar (sources) {
  const goToLatest$ = sources.DOM.select('#loadLatest').events('click').map(_ => '/latest')
  const goToTop$ = sources.DOM.select('#loadTop').events('click').map(_ => '/top')

  const vtree$ = sources.history.map(location => <div className='navbar'>
    <div
      className={`${location.pathname === '/latest' ? 'navbar-item-active' : ''} navbar-item`}
      id='loadLatest'
    >Latest News
    </div>
    <div
      className={`${location.pathname === '/top' ? 'navbar-item-active' : ''} navbar-item`}
      id='loadTop'
    >Top News</div>
  </div>)

  return {
    DOM: vtree$,
    history: xs.merge(goToLatest$, goToTop$),
    HTTP: xs.never()
  }
}
