const express = require("express")
const cors = require("cors")
const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

const listCtrl = require("./controller")

const {
    getQuote,
    getBooks,
    getRead,
    addBook,
    deleteBook,
    deleteRead,
    moveBook
} = listCtrl

app.get('/quotes', getQuote)
app.get('/books', getBooks)
app.get('/read', getRead)
app.post('/book', addBook)
app.delete('/books/:title', deleteBook)
app.delete('/read/:title', deleteRead)
app.put('/books/:title', moveBook)


app.listen(port, () => console.log(`Server is live on port ${port}.`))