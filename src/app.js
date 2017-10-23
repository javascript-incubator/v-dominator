import componentsSelector from './core/componentsselector'
import httpSelector from './core/httpselector'
import historySelector from './core/historyselector'
import vtreeSelector from './core/vtreeselector'
import sinkSelector from './core/sinkselector'
import composeR from './futils/composer'
import navbar from './components/navbar'
import { latestNews, topNews } from './components/newsListComponent'

import './styles/style.scss'

export function App (sources) {
  return composeR(
    componentsSelector([latestNews, topNews], navbar),
    httpSelector,
    historySelector,
    vtreeSelector,
    sinkSelector
  )(sources)
}
