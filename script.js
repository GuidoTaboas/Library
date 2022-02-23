
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

class Book {
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Display {
    createCard(book) {
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
        display.isReadCheck(IS_READ, isRead);
        
        //Create delete button
        let delBook= document.createElement('div');
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
    
        display.setCardColor(isRead, card)
        
        
    
        return card;
    }  

    displayLibrary(bookDisplay, MY_LIBRARY) {
        MY_LIBRARY.forEach(function(book) {
            let card = display.createCard(book);
            bookDisplay.appendChild(card);
        });
    }

    isReadCheck(currentValue, newValue) {
        if (currentValue.checked) newValue.setAttribute('checked', true);
    }

    displayBook(bookDisplay, book) {
        let card = display.createCard(book);
        bookDisplay.appendChild(card);
    }

    delButtons() {
        document.querySelectorAll('.delBook').forEach(button => {
            button.addEventListener('click', function() {
            display.delBook(button);
        })
    })}

    setCardColor(item, bookCard) {
        if(item.checked) {
            bookCard.style.backgroundColor = '#c0ecc0'; 
            bookCard.style.border = '0.1em solid #c0ecc0';
        } else {
            bookCard.style.backgroundColor = '#ffc397'; 
            bookCard.style.border = '0.1em solid #ffc397';
        }
    }

    checkbox() {
        document.querySelectorAll('.isReadCheckbox').forEach(button => {
            button.addEventListener('change', function() {
                let bookCard = button.parentElement.parentElement
                display.setCardColor(button, bookCard)
                console.log('change')
            })
        })
    }

    delBook(elem) {
        let book = elem.parentNode;
        book.parentNode.removeChild(book);
        MY_LIBRARY.pop(book.childNodes[1].value);
    }
    
}

class Menu {
    addBook() {
        if (TITLE.value == '' || AUTHOR.value == '' || PAGES.value == '' || MY_LIBRARY.some(book => book.title === TITLE.value)) {
            alert('The book you are trying to add is already in the library');
            return;
        } else {
            let newBook = new Book(TITLE.value, AUTHOR.value, PAGES.value, IS_READ.value);
            MY_LIBRARY.push(newBook);
            display.displayBook(BOOK_DISPLAY, newBook);
            display.delButtons();
            display.checkbox();
            menu.clearForm();
        };  
    }

    clearForm() {
        TITLE.value = '';
        AUTHOR.value = '';
        PAGES.value = '';
        IS_READ.checked = false;
    }

    delAll() {
            while (BOOK_DISPLAY.firstChild) {
                BOOK_DISPLAY.removeChild(BOOK_DISPLAY.lastChild);
            }
        }
}

let menu = new Menu();
let display = new Display();

ADD_BOOK_SUBMIT.addEventListener('click', menu.addBook);
CLEAR_BUTTON.addEventListener('click', menu.clearForm);
DEL_ALL.addEventListener('click', menu.delAll);

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet');
let theLordOfTheRings = new Book('The Lord of the Rings', 'J.R.R. Tolkien', '350', 'read');
let theNameOfTheWind = new Book('The Name of the Wind', 'Patrick Rothfuss', '450', 'read');

MY_LIBRARY.push(theLordOfTheRings, theHobbit, theNameOfTheWind);

display.displayLibrary(BOOK_DISPLAY, MY_LIBRARY);
display.delButtons();
display.checkbox();