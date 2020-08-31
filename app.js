const tbody = document.querySelector("tbody");

// toggle active class between different nav options */
let lis = document.querySelectorAll(".nav-item");

//display appropriate active option
let options = document.querySelectorAll(".option");


lis.forEach( (li) => {
    li.addEventListener("click", toggleActive);
})

//toggle active class
function toggleActive(e){
    let target = e.target;
    let targetId;

    if (!(e.target.id)){
        targetId = e.target.parentElement.id + "-content";
    } else {
        targetId = e.target.id + "-content";
    }
    
    // return if target is not a child of list
    if (!(target.closest(".nav-items"))) return;

    //remove existing active class from any list item
    lis.forEach( (li) => {
        li.classList.remove("active");
    });

    if (target.closest(".highlight")){
        target.closest(".highlight").classList.add("active");
    }

    // check for matching id
    options.forEach((option) => {
        option.classList.remove("show")
        if (targetId === option.id){
            option.classList.add("show");
        }
    })
}


/* local storage to store or retrieve books */
function getBooks(){
    let books;

    if (localStorage.getItem("books") === null){
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem("books"));
    }

    return books
}

// display Books
function displayBooks(){
    let books = getBooks();

    tbody.innerHTML = ""

    books.forEach( (book) => {
        tbody.innerHTML += `
            <tr> 
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td class="delete"><a href="#" class="btn btn-sm btn-danger removeBtn">X</a>
            </tr>
        `
    })
}

// add new book 
let addBookForm = document.querySelector("#add-book-form");

addBookForm.addEventListener("submit", addNewBook);

// add new book function 
function addNewBook(e){
    e.preventDefault();

    let books = getBooks();

    // fetch input from user
    let title = addBookForm.querySelector("#title").value;
    let author = addBookForm.querySelector("#author").value;
    let genre = addBookForm.querySelector("#genre").value;
 

    // validate values 
    if (title === "" || author === "" || genre == ""){
        //show alert for invalid details
        showAlert("Please enter valid details", "danger");

    } else {
        let book = {
            title: title,
            author: author,
            genre: genre,
        }

        //set to localstorage
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));

        // display books
        displayBooks();

        //clear input fields
        addBookForm.reset();

        // show alert of success
        showAlert(`${title} successfully added.`, "success");
    }
}


//search a book 
let searchInput = document.querySelector("#search-input");

searchInput.addEventListener("keyup", searchBook);

function searchBook(){
    let searchValue = searchInput.value.toLowerCase();
    let tds = document.querySelectorAll(".books-table-body td:first-child");

    tds.forEach( (td) => {
        let tdText = td.textContent.toLowerCase();
        
        if (tdText.indexOf(searchValue) != -1){
            td.closest("tr").style.display = "";

        } else {
            td.closest("tr").style.display = "none";
        }
    })
}

// Remove Book
tbody.addEventListener("click", removeBook);

function removeBook(e){
    let target = e.target;
    let books = getBooks();

    if (!(target.classList.contains("removeBtn"))) return;

    //get book title of clicked button 
    let bookTitle = target.parentElement.parentElement.children[0].textContent;

    books.forEach( (book, index) => {
        if (book.title === bookTitle){
            books.splice(index, 1);
        }
    })

    //set to local storage
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
}


// showAlert 
function showAlert(msg, color){
    let location = document.querySelector("section .container");
    let div = document.createElement("div");

    div.className = `alert alert-${color}`;
    div.appendChild(document.createTextNode(msg));

    // insert element in html
    location.insertAdjacentElement("afterbegin", div);

    setTimeout(( () => {
        document.querySelector('.alert').remove();
    }), 2000);
}


//toggle show class for hamberger menu
let hamberger = document.querySelector(".hamberger");

hamberger.addEventListener("click", toggleHide);

function toggleHide(e){
    let hambergerMenu = document.querySelector(".hamberger-menu");

    if (!(e.target.classList.contains("fa-bars"))) return;

    hambergerMenu.classList.toggle("hide");
}