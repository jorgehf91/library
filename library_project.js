let myLibrary = [];
let bookCount = 0;

function Book(title, author, pages, read, id) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read 
    this.uniqueId = id
    
    let isRead;

    if (this.read) { isRead = 'has been read'}
    else if (!this.read) { isRead = 'not read yet'}
    

    this.info = () => { console.log(`${title} by ${author}, ${pages} pages, ${isRead}`)}
}

let addBookToLibrary = () => {
    
    if (myLibrary.length == 0) {
        bookCount = 0;
    } 
    else if (myLibrary.length == 1) {
        bookCount = 1;
    }
    else {
        bookCount = myLibrary.length;
    }
 

    let titleForm = prompt('Enter book title: ');
    if(titleForm == null || titleForm.length <=0 ){
        return
    }
    let authorForm = prompt('Enter book author: ');
    if(authorForm == null || authorForm.length <=0 ){
        return
    }
    let pagesForm = prompt('Enter book pages: ');
    if(pagesForm == null || pagesForm .length <=0 ){
        return
    }
    let isReadForm = prompt('have you read the book? (yes/no format): ').toLowerCase();
    if(isReadForm == null || isReadForm.length <=0 ){
        return 
    }
    // else if (isReadForm !== 'yes' || isReadForm !== 'no' ) {
    //     return
    // }
    

    newBook = Object.create(Book.prototype);
    
    newBook.title = titleForm;
    newBook.author = authorForm;
    newBook.pages = pagesForm;
    newBook.read = isReadForm;
    newBook.uniqueId = bookCount + 1;
    
    myLibrary.push(newBook);
    console.log('bookCount before:', bookCount)
    
    ++bookCount;

    console.log('bookCount after:', bookCount)

    addBookToTable(newBook.uniqueId);
}

// const book1 = new Book('Paradise Lost', 'John Milton', 509, true, 0, 1)
// bookCount++;
// const book2 = new Book('Rayuela', 'Julio Cortazar', 453, false, 1)
// const book3 = new Book('The Three-Body Problem', 'Cixin Liu', 408, true, 2)

//myLibrary.push(book1);
// myLibrary.push(book2);
// myLibrary.push(book3);

let table = document.querySelector('table');
table.style.border = '1px solid black';


let addButtonCell = document.getElementById('add-book');
let addBookButton = document.createElement('button');
addBookButton.textContent = 'ADD BOOK';
addButtonCell.appendChild(addBookButton);


addBookButton.addEventListener('click', addBookToLibrary);


function addBookToTable(bookId){

        let newRow = document.createElement('tr');

        let tTitle = document.createElement('td');
        let tAuthor = document.createElement('td');
        let tPages = document.createElement('td');
        let tRead = document.createElement('td');

        var removeButton = document.createElement('button');
        removeButton.id = bookCount;

        var toggleReadButton = document.createElement('button')
        toggleReadButton.id = bookCount;
       
        toggleReadButton.textContent = 'Change read status';
    
        tTitle.textContent = `Book Title: ${myLibrary[bookId - 1].title}`;
        tAuthor.textContent = `Author: ${myLibrary[bookId - 1].author}`;
        tPages.textContent = `Number of pages: ${myLibrary[bookId - 1].pages}`;
        tRead.textContent = `Is the book have been read?: ${myLibrary[bookId - 1].read}`;
        removeButton.textContent = 'Remove';


        removeButton.addEventListener('click', (e) => {
            myLibrary.splice(e.target, 1);
            console.log('bookcount: ', bookCount)
            console.log('click')
            console.log('e.target.id: ', e.target.id)
            e.target.parentElement.remove()

        })


        toggleReadButton.addEventListener('click', (e) => {
            console.log('e.target.whatever: ' , e.target.parentElement.children[3])
            console.log('id of toggle button: ', e.target.id)

            let currentBook;

            if (myLibrary.length == 0) {
                console.log('first condition met, myLibrary has zero objects')
                currentBook = myLibrary[e.target.id- 1];

                var currentReadElem = e.target.parentElement.children[3]
 
                if (currentBook.read === 'yes') { 
                currentBook.read = 'no';
                currentReadElem.textContent = `Is the book have been read?: ${myLibrary[e.target.id - 1].read}`;
                } else {
                currentBook.read = 'yes';
                currentReadElem.textContent = `Is the book have been read?: ${myLibrary[e.target.id - 1].read}`;
                }

            } else {
                console.log('else condition met, myLibrary has objects')
                currentBook = myLibrary[e.target.id]

                var currentReadElem = e.target.parentElement.children[3]
 
                if (currentBook.read === 'yes') { 
                currentBook.read = 'no';
                currentReadElem.textContent = `Is the book have been read?: ${myLibrary[e.target.id - 1].read}`;
                } else {
                currentBook.read = 'yes';
                currentReadElem.textContent = `Is the book have been read?: ${myLibrary[e.target.id - 1].read}`;
                }
            }

            //console.log('currentBook: ', currentBook)

            
        })
    
        table.appendChild(newRow);

        newRow.appendChild(tTitle);
        newRow.appendChild(tAuthor);
        newRow.appendChild(tPages);
        newRow.appendChild(tRead);
        newRow.appendChild(removeButton);
        newRow.appendChild(toggleReadButton);
}


// Add a button on each book’s display to change its read status.
// To facilitate this you will want to create the function that toggles a book’s read 
// status on your Book prototype instance.



