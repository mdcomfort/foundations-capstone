
const getQuote = () => {
    axios.get('http://localhost:5000/quotes')
    .then((res) => {
        let data = res.data
        let quoteDiv = document.querySelector('#quote-display')
        quoteDiv.textContent = data
    })
    .catch((err) => console.log(err))
}

document.addEventListener('DOMContentLoaded', getQuote)

const getBooks = () => {
    axios.get('http://localhost:5000/books')
    .then((res) => {
        const data = res.data
        for (let i = 0; i < data.length; i++) {
            let myBookList = document.createElement('li')
            let myBookTitle = document.createElement('span')
            myBookTitle.textContent = data[i]
            myBookList.appendChild(myBookTitle)
            let deleteButton = document.createElement('button')
            deleteButton.className = 'delete-button'
            deleteButton.textContent = 'del'
            deleteButton.addEventListener('click', deleteBook)
            myBookList.appendChild(deleteButton)
            let readButton = document.createElement('button')
            readButton.className = 'read-button'
            readButton.textContent = 'read'
            readButton.addEventListener('click', moveToRead)
            myBookList.appendChild(readButton)
            document.querySelector('ul').appendChild(myBookList)
        }
    })
    .catch((err) => console.log(err))
}

const getRead = () => {
    axios.get('http://localhost:5000/read')
    .then((res) => {
        const data = res.data
        for (let i = 0; i < data.length; i++) {
            let myReadList = document.createElement('li')
            let myReadTitle = document.createElement('span')
            myReadTitle.textContent = data[i]
            myReadList.appendChild(myReadTitle)
            let deleteButton = document.createElement('button')
            deleteButton.className = 'delete-button'
            deleteButton.textContent = 'del'
            deleteButton.addEventListener('click', deleteRead)
            myReadList.appendChild(deleteButton)
            document.querySelector('#book-list-2').appendChild(myReadList)
        }
    })
}

const addBook = (event) => {
    event.preventDefault()
    let bookInput = document.querySelector("#book-input")

    let book = {
        newBook: bookInput.value
    }
    
    axios.post('http://localhost:5000/book', book)
    .then((res) => {
        let data = res.data
        let newBook = document.createElement('li')
        let newTitle = document.createElement('span')
        newTitle.textContent = data[data.length -1]
        newBook.appendChild(newTitle)
        let deleteButton = document.createElement('button')
        deleteButton.className = 'delete-button'
        deleteButton.textContent = 'del'
        deleteButton.addEventListener('click', deleteBook)
        newBook.appendChild(deleteButton)
        let readButton = document.createElement('button')
        readButton.className = 'read-button'
        readButton.textContent = 'read'
        readButton.addEventListener('click', moveToRead)
        newBook.appendChild(readButton)
        document.querySelector('ul').appendChild(newBook) 
        bookInput.value = ''
    })
    .catch((err) => console.log(err))
}

document.querySelector('form').addEventListener('submit', addBook)

const deleteBook = (event) => {
    event.preventDefault()

    let title = event.target.parentNode.firstChild.textContent

    axios.delete(`http://localhost:5000/books/${title}`)
    .then((res) => {
        document.querySelector('#book-list').innerHTML = ''
        getBooks()
    })
    .catch((err) => console.log(err))
}

const deleteRead = (event) => {
    event.preventDefault()

    let title = event.target.parentNode.firstChild.textContent

    axios.delete(`http://localhost:5000/read/${title}`)
    .then((res) => {
        document.querySelector('#book-list-2').innerHTML = ''
        getRead()
    })
    .catch((err) => console.log(err))
}

const moveToRead = (event) => {
    event.preventDefault()

    let title = event.target.parentNode.firstChild.textContent

    let bookRead = {
        bookTitle: title
    }

    axios.put(`http://localhost:5000/books/${title}`, bookRead)
    .then((res) => {
        document.querySelector('#book-list-2').innerHTML =''
        getRead()
        document.querySelector('#book-list').innerHTML = ''
        getBooks()
    })
}

getBooks()

getRead()