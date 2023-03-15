let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
  //BASE_NAME = 'aiden'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://aiden.org/prod'
  //BASE_NAME = 'kobe'
} else {
  BASE_URL = 'http://aiden.org/test'
  //BASE_NAME = 'james'
}

export { TIME_OUT, BASE_URL }
