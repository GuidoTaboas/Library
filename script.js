
const FORM_BUTTON = document.getElementById('formButton');
const BOOK_DISPLAY = document.querySelector('.bookDisplay');
const ADD_BOOK_SUBMIT = document.getElementById('addBookSubmit');
const TITLE = document.getElementById('title');
const AUTHOR = document.getElementById('author');
const PAGES = document.getElementById('pages');
const IS_READ = document.getElementById('isRead');
const CLEAR_BUTTON = document.getElementById('clear');
const DEL_ALL = document.getElementById('deleteAll')
const MY_LIBRARY = [];


function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function delAll() {
    while (BOOK_DISPLAY.firstChild) {
        BOOK_DISPLAY.removeChild(BOOK_DISPLAY.lastChild);
    }
}

function isReadCheck(currentValue, newValue) {
    if (currentValue.checked) newValue.setAttribute('checked', true);
}

function createCard(book) {
    // Create Book card
    let card = document.createElement('div');
    card.className = 'bookCard';

    // Add Title from book object
    let title = document.createElement('span');
    title.innerText = `Title: ${book.title}`;


    // Add author from book object
    let author = document.createElement('span');
    author.innerText = `Author: ${book.author}`;

    // Add number of pages from book object
    let pages = document.createElement('span');
    pages.innerText = `Number of pages: ${book.pages}`;

    // Dynamic ID naming for each book's checkbox
    let checkboxId = `checkbox_${book.title.toLowerCase().split(' ').join('_')}`;

    // Create read checkbox and label
    let isReadDiv = document.createElement('div');
    let isRead = document.createElement('input');
    let isReadLabel = document.createElement('label');
    isReadDiv.className = 'isReadDiv';
    isReadLabel.for = checkboxId;
    isReadLabel.innerText = 'Read';
    isRead.className = 'isReadCheckbox';
    isRead.id = checkboxId;
    isRead.type = 'checkbox';

    //Check the value of the checkbox to give the same value to the new card checkbox
    isReadCheck(IS_READ, isRead);
    
    //Create delete button
    let delBook= document.createElement('button');
    delBook.innerText = 'Remove';
    delBook.className = 'delBook';

    //Appen every element to the main card
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(isReadDiv);
    isReadDiv.appendChild(isReadLabel);
    isReadDiv.appendChild(isRead);
    card.appendChild(delBook);

    return card;
}    

function displayLibrary(bookDisplay, MY_LIBRARY) {
    MY_LIBRARY.forEach(function(book) {
        let card = createCard(book);
        bookDisplay.appendChild(card);
    });
}

function displayBook(bookDisplay, book) {
    let card = createCard(book);
    bookDisplay.appendChild(card);
}

function delButtons(){document.querySelectorAll('.delBook').forEach(button => {
    button.addEventListener('click', function() {
        delBook(button);
    })
})}

function delBook(elem) {
    let book = elem.parentNode;
    book.parentNode.removeChild(book);
    MY_LIBRARY.pop(book.childNodes[1].value);
}

function clearForm() {
    TITLE.value = '';
    AUTHOR.value = '';
    PAGES.value = '';
    IS_READ.checked = false;
}

// function openForm() {
//     let form = document.querySelector('.form');
//     if (form.style.visibility == 'visible') {
//         form.style.visibility = 'hidden';
//     } else {
//         form.style.visibility = 'visible';
//     }
// }


function addBook() {
    if (TITLE.value == '' || AUTHOR.value == '' || PAGES.value == '' || MY_LIBRARY.some(book => book.title === TITLE.value)) {
        console.log('No funciona');
        return;
    } else {
        newBook = new Book(TITLE.value, AUTHOR.value, PAGES.value, IS_READ.value);
        MY_LIBRARY.push(newBook);
        displayBook(BOOK_DISPLAY, newBook);
        delButtons();
        clearForm();
    };  
}

ADD_BOOK_SUBMIT.addEventListener('click', addBook)
CLEAR_BUTTON.addEventListener('click', clearForm)
// FORM_BUTTON.addEventListener('click', openForm)
DEL_ALL.addEventListener('click', delAll)

function changeReadColor() {
    console.log(isRead.parentElement)
}

console.log(isRead)



let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet');
let theLordOfTheRings = new Book('The Lord of the Rings', 'J.R.R. Tolkien', '350', 'read');
let theNameOfTheWind = new Book('The Name of the Wind', 'Patrick Rothfuss', '450', 'read');
let theHobbit1 = new Book('The Hobbit1', 'J.R.R. Tolkien', '295', 'not read yet');
let theLordOfTheRings1 = new Book('The Lord of the Rings1', 'J.R.R. Tolkien', '350', 'read');
let theNameOfTheWind1 = new Book('The Name of the Wind1', 'Patrick Rothfuss', '450', 'read');
let theHobbit2 = new Book('The Hobbit2', 'J.R.R. Tolkien', '295', 'not read yet');
let theLordOfTheRings2 = new Book('The Lord of the Rings2', 'J.R.R. Tolkien', '350', 'read');
let theNameOfTheWind2 = new Book('The Name of the Win2', 'Patrick Rothfuss', '450', 'read');

MY_LIBRARY.push(theLordOfTheRings, theHobbit, theNameOfTheWind,theLordOfTheRings1, theHobbit1, theNameOfTheWind1,theLordOfTheRings2, theHobbit2, theNameOfTheWind2)

displayLibrary(BOOK_DISPLAY, MY_LIBRARY);
delButtons();
isRead.addEventListener('change', changeReadColor)