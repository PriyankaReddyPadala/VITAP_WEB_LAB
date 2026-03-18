class Course {
    constructor(courseName, instructor) {
        this.courseName = courseName;
        this.instructor = instructor;
    }

    displayCourse() {
        console.log(`Course: ${this.courseName}, Instructor: ${this.instructor}`);
    }
}

let course1 = new Course("Web Technologies", "Dr. Kumar");

course1.displayCourse();

let enrollCourse = new Promise((resolve, reject) => {
    let seatsAvailable = true; 

    if (seatsAvailable) {
        resolve("Enrollment Successful");
    } else {
        reject("Course Full");
    }
});

enrollCourse
    .then(message => console.log(message))
    .catch(error => console.log(error));