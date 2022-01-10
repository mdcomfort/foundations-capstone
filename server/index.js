
// requiring the express and cors libraries
const express = require("express")
const cors = require("cors")

// invoking express
const app = express()

// assigning the server port to a variable 'port' for easier reference and editing
const port = 5000

app.use(express.json())
app.use(cors())

// requiring the code contained in controller.js
const listCtrl = require("./controller")

// destructuring from controller.js
const {
    getQuote,
    getBooks,
    getRead,
    addBook,
    deleteBook,
    deleteRead,
    moveBook
} = listCtrl 

// our server endpoints are defined and the action to carry out when one is hit is included as the second argument to app.get(), utilizing express (defined above). The corresponding code is then located in controller.js and executed
app.get('/quotes', getQuote)
app.get('/books', getBooks)
app.get('/read', getRead)
app.post('/book', addBook)
app.delete('/books/:title', deleteBook)
app.delete('/read/:title', deleteRead)
app.put('/books/:title', moveBook)

// this allows us to listen for the server port to be running and log this message to the console once it is
app.listen(port, () => console.log(`Server is live on port ${port}.`))