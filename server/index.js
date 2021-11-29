const express = require("express")
const cors = require("cors")
const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

const listCtrl = require("./controller")

const {getQuote} = listCtrl
const {getBooks} = listCtrl
const {addBook} = listCtrl
const {deleteBook} = listCtrl


app.get('/quotes', getQuote)
app.get('/books', getBooks)
app.post('/book', addBook)
app.delete('/books/:title', deleteBook)


app.listen(port, () => console.log(`Server is live on port ${port}.`))