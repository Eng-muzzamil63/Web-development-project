const API_URL =
    "http://localhost:3000/students";

const form =
    document.getElementById("studentForm");

const studentsDiv =
    document.getElementById("students");

const searchInput =
    document.getElementById("search");

async function loadStudents() {

    const response =
        await fetch(API_URL);

    const students =
        await response.json();

    displayStudents(students);
}

function displayStudents(students) {

    studentsDiv.innerHTML = "";

    students.forEach(student => {

        studentsDiv.innerHTML += `
            <div class="student-card">

                <h3>${student.name}</h3>

                <p>${student.email}</p>

                <p>${student.course}</p>

                <button
                  class="delete-btn"
                  onclick="deleteStudent(${student.id})"
                >
                  Delete
                </button>

            </div>
        `;
    });
}

form.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const student = {

            name:
                document.getElementById("name").value,

            email:
                document.getElementById("email").value,

            course:
                document.getElementById("course").value

        };

        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        form.reset();

        loadStudents();

    });

async function deleteStudent(id) {

    await fetch(
        `${API_URL}/${id}`,
        {
            method: "DELETE"
        }
    );

    loadStudents();

}

searchInput.addEventListener(
    "input",
    async () => {

        const response =
            await fetch(API_URL);

        const students =
            await response.json();

        const filtered =
            students.filter(student =>

                student.name
                    .toLowerCase()
                    .includes(
                        searchInput.value
                            .toLowerCase()
                    )

            );

        displayStudents(filtered);

    });

loadStudents();