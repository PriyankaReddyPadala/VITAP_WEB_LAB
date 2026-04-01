import React from "react";

function StudentProfile() {
  const name = "Priyanka Reddy";
  const department = "CSE";
  const year = "3rd Year";
  const section = "A";

  return (
    <div>
      <h1>Student Profile</h1>
      <p><b>Name:</b> {name}</p>
      <p><b>Department:</b> {department}</p>
      <p><b>Year:</b> {year}</p>
      <p><b>Section:</b> {section}</p>
    </div>
  );
}

export default StudentProfile;