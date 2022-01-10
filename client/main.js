
// function 'getQuote' created to retrieve a quote from the server
const getQuote = () => {
    axios.get('http://localhost:5000/quotes') // server endpoint
    .then((res) => {
        let data = res.data
        let quoteDiv = document.querySelector('#quote-display')
        quoteDiv.textContent = data
    })
    .catch((err) => console.log(err))
}

// display the quote when the DOM has loaded
document.addEventListener('DOMContentLoaded', getQuote)


// function 'getBooks' created to retrieve the list of books for the To Read list from the server and display them as specified in the .then code below
const getBooks = () => {
    axios.get('http://localhost:5000/books') // server endpoint
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

// function 'getRead' created to retrieve the list of Read books from the server and display them as specified in the .then code below
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

// function 'addBook' created to add a new book to the To Read list and display it as specified in the .then code below
const addBook = (event) => {
    event.preventDefault()
    let bookInput = document.querySelector("#book-input") // sets bookInput to the text input field

    let book = {
        newBook: bookInput.value // sets the value to the value found at the text input field
    }
    
    axios.post('http://localhost:5000/book', book) // server endpoint, object sent to the server
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

// event listener added to listen for the submit event and execute addBook when the user hits enter or clicks 'Add to list'
document.querySelector('form').addEventListener('submit', addBook)


// function 'deleteBook' created to delete a book from the To Read list
const deleteBook = (event) => {
    event.preventDefault()

    let title = event.target.parentNode.firstChild.textContent // sets the variable 'title' to the text at this location, which is the book title there

    axios.delete(`http://localhost:5000/books/${title}`) // server endpoint, title is sent along as a param
    .then((res) => {
        document.querySelector('#book-list').innerHTML = '' // clear what is currently displayed at this location
        getBooks() // get the updated list of books
    })
    .catch((err) => console.log(err))
}


// function 'deleteRead' does the same as above, but for the Read list
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


// function 'moveToRead' created to send the title information from the To Read list to the Read list
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


getBooks() // getBooks is invoked when the code first runs to populate the To Read list with any book entries currently there

getRead() // getRead is invoked as well to do the same for the Read list