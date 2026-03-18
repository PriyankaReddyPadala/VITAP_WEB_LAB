let studentName = "Arun";
let mark1 = 85;
let mark2 = 90;
let mark3 = 88;

const calculateTotal = (m1, m2, m3) => m1 + m2 + m3;

const calculateAverage = (total, count) => total / count;

let totalMarks = calculateTotal(mark1, mark2, mark3);
let averageMarks = calculateAverage(totalMarks, 3);

console.log(`Student Name: ${studentName}`);
console.log(`Total Marks: ${totalMarks}`);
console.log(`Average Marks: ${averageMarks.toFixed(2)}`);