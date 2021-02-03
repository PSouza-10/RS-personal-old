const prodUrl = ''
const devUrl = 'http://localhost:5000'

export default process.env.NODE_ENV === 'production' ? prodUrl : devUrl
