const student = {
    id: 101,
    name: "Priya",
    department: "CSE",
    marks: 92
};

const { id, name, department, marks } = student;

console.log(id, name, department, marks);

const getGrade = (marks) => {
    if (marks >= 90) return "A";
    else if (marks >= 75) return "B";
    else if (marks >= 60) return "C";
    else return "D";
};

const updatedStudent = {
    ...student,
    grade: getGrade(marks)
};

console.log(updatedStudent);