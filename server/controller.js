const books = []

module.exports = {
    getQuote: (req, res) => {
        let quotes = ['"There are years that ask questions and there are years that answer." -Their Eyes Were Watching God', '"I am not afraid of storms, for I am learning how to sail my ship." -Little Women', '"This above all: To thine own self be true, And it must follow, as the night the day, Thou canst not then be false to any man." -Hamlet', '"I took a deep breath and listened to the old brag of my heart: I am, I am, I am." -The Bell Jar']
        let randomIndex = Math.floor(Math.random() * quotes.length)
        let randomQuote = quotes[randomIndex]
        res.status(200).send(randomQuote)
    },
    getBooks: (req, res) => {
        console.log(books)
        res.status(200).send(books)
    },
    addBook: (req, res) => {
        let {newBook} = req.body
        books.push(newBook)
        res.status(200).send(books)
        console.log(books)
    },
    deleteBook: (req, res) => {
        let bookDelete = req.params.title
        for (let i = 0; i < books.length; i++) {
            if (books[i] === bookDelete) {
                console.log(books[i])
                books.splice(i, 1)
            } 
        }
        res.status(200).send(books)
    }
}