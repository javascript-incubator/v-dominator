import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { makeHTTPDriver } from '@cycle/http'
import { makeHistoryDriver } from '@cycle/history'
import { App } from './app'

const main = App

const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver(),
  history: makeHistoryDriver(),
}

run(main, drivers)
