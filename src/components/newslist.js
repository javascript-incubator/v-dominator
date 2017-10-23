import { html } from 'snabbdom-jsx' //eslint-disable-line
import newsCard from './newscard'
import { mutatorScroll } from '../utils/mutators'
import xs from 'xstream'

const newsList = newsType => sources => {
  const request$ = xs.of({
    url: `https://hn-normalizer.herokuapp.com/${newsType}/0/10`,
    category: 'hntop',
  })

  const response$ = sources.HTTP
    .select('hntop')
    .flatten()
    .map(res => res.body)

  const loadMoreResponse$ = sources.HTTP
    .select('hntopload')
    .flatten()
    .map(res => res.body)
    .startWith([])
    .map(mutatorScroll('.news-section-cards'))

  const newsCards$ = xs.combine(response$, loadMoreResponse$)
    .map(([res, loadMore]) => [...res, ...loadMore].map(y => newsCard(y)(sources)))

  const loadMoreRequest$ = xs.combine(
    sources.DOM.select('#load-more-top').events('click'),
    newsCards$
  ).map(([clicks, newCards]) => ({
    url: `https://hn-normalizer.herokuapp.com/${newsType}/${newCards.length}/${newCards.length + 10}`,
    category: 'hntopload'
  }))

  const newsCardsDom$ = newsCards$
    .map(newsCards => xs.combine(...newsCards.map(x => x.DOM))).flatten().startWith(null)

  const vdom$ = newsCardsDom$.map(cards => <div className='news-section'>
    <div className='news-section-cards'>
      {(cards && cards.map(y => <span className='news-card-border'>{y}</span>)) ||
        <span className='loading-text'>Loading</span>}
    </div>
    <div className='load-more' id='load-more-top'>Load More</div>
  </div>)

  return {
    DOM: vdom$,
    route: `/${newsType}`,
    history: xs.never(),
    HTTP: xs.merge(request$, loadMoreRequest$)
  }
}

export default newsList
