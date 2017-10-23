const componentSelector = (routes, ...components) => sources => {
  const component$ = sources.history.map(z => {
    return [
      ...routes.map(x => x(sources)).filter(x => x.route === z.pathname),
      ...components.map(x => x(sources))
    ]
  })
  return {
    component$,
    sources,
    sinks:{}
  }
}

export default componentSelector
