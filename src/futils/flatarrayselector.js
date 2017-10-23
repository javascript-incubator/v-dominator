export default (stream, key) => stream.map(x => x.reduce((a, i) => [...a.map(y => y[key]), ...i], []))
