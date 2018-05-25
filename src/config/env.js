let DEV = 'development',
  TEST = 'testing',
  PROD = 'production'

const ENV = () => {
  let host = window.location.host
  if (host === 'localhost:8090') {
    return DEV
  } else if (host === '') {
    return TEST
  } else if (host === '' || host === '') {
    return PROD
  } else {
    return 'Unknown'
  }
}

export default ENV()
export { DEV, TEST, PROD }
