const express = require('express')
const app = express()
const PORT = process.env.PORT || 3006
const routes = require('./routes')

app.use(express.static('public'))
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}`)
})