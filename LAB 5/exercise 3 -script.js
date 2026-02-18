let students = [];

function loadStudents() {
    fetch("students.json")
        .then(res => res.json())
        .then(data => {
            students = data;
            displayStudents();
        })
        .catch(() => alert("JSON Parsing Error"));
}

function displayStudents() {
    let table = document.getElementById("studentTable");
    table.innerHTML = "";
    students.forEach((s, index) => {
        table.innerHTML += `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.course}</td>
            <td>${s.marks}</td>
            <td><button onclick="deleteStudent(${index})">Delete</button></td>
        </tr>`;
    });
}

function addStudent() {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const course = document.getElementById("course").value;
    const marks = document.getElementById("marks").value;

    if (!id || !name || !course || !marks) {
        alert("All fields required");
        return;
    }

    students.push({id, name, course, marks});
    displayStudents();
}

function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}

window.onload = loadStudents;
