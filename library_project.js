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

    newBook = Object.create(Book.prototype);
    
    newBook.title = titleForm;
    newBook.author = authorForm;
    newBook.pages = pagesForm;
    newBook.read = isReadForm;
    newBook.uniqueId = bookCount;
    
    myLibrary.push(newBook);
    console.log('bookCount before:', bookCount)

    console.log('bookCount after:', bookCount)

    addBookToTable(newBook.uniqueId);
}

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
        toggleReadButton.className = 'read-button'
        toggleReadButton.textContent = 'Change read status';
    
        tTitle.textContent = `Book Title: ${myLibrary[bookId].title}`;
        tAuthor.textContent = `Author: ${myLibrary[bookId].author}`;
        tPages.textContent = `Number of pages: ${myLibrary[bookId].pages}`;
        tRead.textContent = `Is the book have been read?: ${myLibrary[bookId].read}`;
        removeButton.textContent = 'Remove';

        removeButton.addEventListener('click', (e) => {
            myLibrary.splice(e.target, 1);
            e.target.parentElement.remove();

            //This re-assigns the id's of the toggleButtons
            let listBooks = document.querySelectorAll('.read-button')
            
            for (let i = 0; i < listBooks.length; i++) {
                listBooks[i].id = i;
                console.log('book id: ', i)
            }
        })


        toggleReadButton.addEventListener('click', (e) => {

            let elemIdToIndex = parseInt(String(e.target.id))
            let currentBook = myLibrary[elemIdToIndex];
            var currentReadElem = e.target.parentElement.children[3] //targets the text

            if (currentBook.read === 'yes') { 
                currentBook.read = 'no';
                currentReadElem.textContent = `Is the book have been read?: ${myLibrary[elemIdToIndex].read}`;
            } else {
                currentBook.read = 'yes';
                currentReadElem.textContent = `Is the book have been read?: ${myLibrary[elemIdToIndex].read}`;
            }
        })
    
        table.appendChild(newRow);

        newRow.appendChild(tTitle);
        newRow.appendChild(tAuthor);
        newRow.appendChild(tPages);
        newRow.appendChild(tRead);
        newRow.appendChild(removeButton);
        newRow.appendChild(toggleReadButton);
        ++bookCount;
} //end of addBookToTable function