export default (...fns) => fns.reduce((v, fn) => (...args) => fn(v(...args)))
