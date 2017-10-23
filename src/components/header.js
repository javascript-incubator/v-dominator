import { html } from 'snabbdom-jsx' //eslint-disable-line
import xs from 'xstream'

export default function component1 (sources) {
  const request$ = xs.of({
    url: 'https://hacker-news.firebaseio.com/v0/item/15515630.json?print=pretty', // GET method by default
    category: 'hn',
  })

  const response$ = sources.HTTP
    .select('hn')
    .flatten()

  const vdom$ = response$
    .map(x => x.body)
    .startWith('Loading...')
    .map(text => <h1>{text.title}</h1>)

  return {
    DOM: vdom$,
    HTTP: request$
  }
}
