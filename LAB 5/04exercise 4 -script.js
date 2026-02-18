let products = [];

function loadInventory() {
    fetch("inventory.json")
        .then(res => res.json())
        .then(data => {
            products = data;
            displayProducts();
        })
        .catch(() => alert("Error loading JSON"));
}

function displayProducts() {
    let table = document.getElementById("inventoryTable");
    table.innerHTML = "";
    let totalValue = 0;

    products.forEach((p, index) => {
        totalValue += p.price * p.stock;
        table.innerHTML += `
        <tr style="color:${p.stock < 10 ? 'red' : 'black'}">
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>${p.price}</td>
            <td>${p.stock}</td>
            <td><button onclick="deleteProduct(${index})">Delete</button></td>
        </tr>`;
    });

    document.getElementById("totalValue").textContent = totalValue;
}

function addProduct() {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;

    if (!id || !name || !category || !price || !stock) {
        alert("All fields required");
        return;
    }

    products.push({id, name, category, price: Number(price), stock: Number(stock)});
    displayProducts();
}

function deleteProduct(index) {
    products.splice(index, 1);
    displayProducts();
}

window.onload = loadInventory;
