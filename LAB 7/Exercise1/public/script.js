const form = document.getElementById("noteForm");
const notesDiv = document.getElementById("notes");

async function loadNotes(){
    const res = await fetch("/notes");
    const notes = await res.json();

    notesDiv.innerHTML = "";

    notes.forEach(note =>{

        const div = document.createElement("div");

        div.innerHTML = `
        <h3>${note.title}</h3>
        <p><b>Subject:</b> ${note.subject}</p>
        <p>${note.description}</p>
        <button onclick="deleteNote('${note._id}')">Delete</button>
        <hr>
        `;

        notesDiv.appendChild(div);
    });
}

/* ADD NOTE */

form.addEventListener("submit", async(e)=>{
    e.preventDefault();

    const title = document.getElementById("title").value;
    const subject = document.getElementById("subject").value;
    const description = document.getElementById("description").value;

    await fetch("/notes",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({title,subject,description})
    });

    form.reset();
    loadNotes();
});


async function deleteNote(id){

    await fetch(`/notes/${id}`,{
        method:"DELETE"
    });

    loadNotes();
}


loadNotes();
