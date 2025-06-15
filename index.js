require('dotenv').config();
import connectToMongo from './db';
import express, { json } from 'express';

connectToMongo();
const app = express()
const port = 8080

app.get('/', (req, res) => { //initial page
  res.send('Hello World!')
})

app.use(json())

//available routes
app.use('/api/create-job',require('./endpoints/create-job').default)
app.use('/api/matches/candidates',require('./endpoints/matches/candidates'))
app.use('/api/match-action',require('./endpoints/match-action'))
app.use('/api/upload-resume',require('./endpoints/upload-resume'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
