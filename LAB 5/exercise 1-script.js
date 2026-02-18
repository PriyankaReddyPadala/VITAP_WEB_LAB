let xmlData;

function loadEmployees() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "employees.xml", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            xmlData = xhr.responseXML;
            displayEmployees();
            showMessage("Employees loaded successfully", "green");
        } else {
            showMessage("Error loading XML file", "red");
        }
    };
    xhr.onerror = () => showMessage("Malformed XML or File Error", "red");
    xhr.send();
}

function displayEmployees() {
    const table = document.getElementById("empTable");
    table.innerHTML = "";

    const employees = xmlData.getElementsByTagName("employee");

    if (employees.length === 0) {
        showMessage("No Employees Found", "red");
        return;
    }

    for (let i = 0; i < employees.length; i++) {
        const row = `
        <tr>
            <td>${employees[i].getElementsByTagName("id")[0].textContent}</td>
            <td>${employees[i].getElementsByTagName("name")[0].textContent}</td>
            <td>${employees[i].getElementsByTagName("department")[0].textContent}</td>
            <td>${employees[i].getElementsByTagName("salary")[0].textContent}</td>
            <td>
                <button onclick="deleteEmployee(${i})">Delete</button>
            </td>
        </tr>`;
        table.innerHTML += row;
    }
}

function addEmployee() {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const dept = document.getElementById("dept").value;
    const salary = document.getElementById("salary").value;

    if (!id || !name || !dept || !salary) {
        showMessage("All fields required", "red");
        return;
    }

    const newEmp = xmlData.createElement("employee");

    ["id","name","department","salary"].forEach((tag, index) => {
        const el = xmlData.createElement(tag);
        el.textContent = [id, name, dept, salary][index];
        newEmp.appendChild(el);
    });

    xmlData.documentElement.appendChild(newEmp);
    displayEmployees();
    showMessage("Employee Added Successfully", "green");
}

function deleteEmployee(index) {
    const employees = xmlData.getElementsByTagName("employee");
    xmlData.documentElement.removeChild(employees[index]);
    displayEmployees();
    showMessage("Employee Deleted", "green");
}

function showMessage(msg, color) {
    const message = document.getElementById("message");
    message.textContent = msg;
    message.style.color = color;
}

window.onload = loadEmployees;
