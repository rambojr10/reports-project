const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('dist'))

app.get('/bitacora', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist/bitacora.html'))
})

app.listen(port, _ => console.log(`Server on port: ${port}`))