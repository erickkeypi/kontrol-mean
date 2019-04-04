import Debug from 'debug'
import app from './app'

const PORT = 3000
const debug = new Debug('kontrol-MEAN:root')


app.listen(PORT, () => {
  debug(PORT)
})
