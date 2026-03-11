let currentPage = 1;

function displayBooks(books){

const div = document.getElementById("books");
div.innerHTML = "";

if(books.length === 0){
div.innerHTML = "<p>No books found</p>";
return;
}

books.forEach(book => {

div.innerHTML += `
<div class="book-card">
<h3>${book.title}</h3>
<p><b>Author:</b> ${book.author}</p>
<p><b>Category:</b> ${book.category}</p>
<p><b>Price:</b> ₹${book.price}</p>
<p><b>Rating:</b> ⭐ ${book.rating}</p>
<p><b>Year:</b> ${book.year}</p>
</div>
`;

});

}

async function searchBooks(){

const title = document.getElementById("searchTitle").value;

const res = await fetch(`/books/search?title=${title}`);
const data = await res.json();

displayBooks(data);

}

async function filterCategory(){

const category = document.getElementById("categoryInput").value;

const res = await fetch(`/books/category/${category}`);
const data = await res.json();

displayBooks(data);

}

async function sortPrice(){

const res = await fetch(`/books/sort/price`);
const data = await res.json();

displayBooks(data);

}

async function sortRating(){

const res = await fetch(`/books/sort/rating`);
const data = await res.json();

displayBooks(data);

}

async function topBooks(){

const res = await fetch(`/books/top`);
const data = await res.json();

displayBooks(data);

}

async function loadMore(){

const res = await fetch(`/books?page=${currentPage}`);
const data = await res.json();

const div = document.getElementById("books");

data.forEach(book => {

div.innerHTML += `
<div class="book-card">
<h3>${book.title}</h3>
<p><b>Author:</b> ${book.author}</p>
<p><b>Category:</b> ${book.category}</p>
<p><b>Price:</b> ₹${book.price}</p>
<p><b>Rating:</b> ⭐ ${book.rating}</p>
<p><b>Year:</b> ${book.year}</p>
</div>
`;

});

currentPage++;

}
