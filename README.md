# foundations-capstone
For my Bright Paths Foundations Capstone I made a book list application called Book Nook. Book Nook was inspired by my love of reading and a curiosity about how to write code that is able to move and display user input between lists. 

This project was built using HTML, CSS, JavaScript and Axios on the front-end, with Express, Cors and Node.js to build out my server on the back-end.

At the top of the page there’s a header that displays a quote. When landing on the site, a random quote is displayed and loads with the page using a DOM Content Loaded event listener. Below, you can enter the title of a work you’d like to add to your reading list. Once added, the list item can be removed or moved to the “Read” list using the delete and read buttons. When the book title is entered, the information is sent to the server for storage using an Axios request and then the updated data set is returned to the front-end to populate the list. This process is repeated for deletions as well as marking books as read.

In styling the buttons, I wanted to stay with the language aesthetic and thus used ‘del’ and ‘read’ as labels. For the Read list, I decided to use an image as the background. The CSS flex display option allows more of the image to be shown as the Read list grows. There was something motivating to me about seeing more of the image displayed as books were marked as Read and added. The flex option also allows each list to grow or shrink as items are added or removed.

A challenge I faced while building this project was figuring out how to update both lists in my Axios request promise when I moved a book from Reading List to Read. To solve this, I invoked my GET request functions within my .then, allowing the successful back-end change created by my PUT request to be reflected again on the front-end.

Thank you for checking out my first project! I'm always looking to make things better. Please feel free to reach out with any questions or comments.
