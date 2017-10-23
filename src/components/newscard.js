import { html } from 'snabbdom-jsx' //eslint-disable-line
import xs from 'xstream'

const newsCard = newsData => sources => {
  const vdom$ = xs.of(<div className='news-card'>
    <span className='content'>
      {newsData.title}
    </span>
    <span className='news-meta'>
      <span className='news-info'>
        <span className='news-score'>
          <span className='heading'>Score</span>
          <span className='value'>{newsData.score}</span>
        </span>
        <span className='news-score'>
          <span className='heading'>Time</span>
          <span className='value'>
            {`${new Date(newsData.time * 1000).getDate()}/${new Date(newsData.time * 1000).getMonth() + 1}`}
          </span>
        </span>
      </span>
      <span className='by'>{newsData.by}</span>
    </span>
  </div>)

  return {
    DOM: vdom$
  }
}

export default newsCard
