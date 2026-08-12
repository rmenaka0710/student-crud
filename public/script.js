const studentForm = document.getElementById("studentForm");
const studentIdInput = document.getElementById("studentId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const courseInput = document.getElementById("course");
const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");
const studentList = document.getElementById("studentList");
const message = document.getElementById("message");

// READ ALL
async function loadStudents() {
    try {
        const response = await fetch("/api/students");
        const students = await response.json();

        studentList.innerHTML = "";

        if (students.length === 0) {
            studentList.innerHTML = "<p>No students found.</p>";
            return;
        }

        students.forEach(student => {
            const div = document.createElement("div");
            div.className = "student-card";

            div.innerHTML = `
                <div class="student-details">
                    <strong>${student.name}</strong><br>
                    ${student.email}<br>
                    Course: ${student.course}
                </div>

                <div class="actions">
                    <button class="edit-btn"
                        onclick="editStudent('${student._id}')">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteStudent('${student._id}')">
                        Delete
                    </button>
                </div>
            `;

            studentList.appendChild(div);
        });
    } catch (error) {
        console.error(error);
        showMessage("Unable to load students");
    }
}

// CREATE / UPDATE
studentForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const student = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        course: courseInput.value
    };

    const studentId = studentIdInput.value;

    try {
        let response;

        if (studentId) {
            response = await fetch(`/api/students/${studentId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(student)
            });
        } else {
            response = await fetch("/api/students", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(student)
            });
        }

        const data = await response.json();

        if (!response.ok) {
            showMessage(data.message);
            return;
        }

        showMessage(data.message);
        resetForm();
        loadStudents();
    } catch (error) {
        console.error(error);
        showMessage("Something went wrong");
    }
});

// READ ONE FOR EDIT
async function editStudent(id) {
    try {
        const response = await fetch(`/api/students/${id}`);
        const student = await response.json();

        if (!response.ok) {
            showMessage(student.message);
            return;
        }

        studentIdInput.value = student._id;
        nameInput.value = student.name;
        emailInput.value = student.email;
        courseInput.value = student.course;

        submitButton.textContent = "Update Student";
        cancelButton.hidden = false;

        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
        console.error(error);
        showMessage("Unable to fetch student");
    }
}

// DELETE
async function deleteStudent(id) {
    const confirmation = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmation) return;

    try {
        const response = await fetch(`/api/students/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            showMessage(data.message);
            return;
        }

        showMessage(data.message);
        loadStudents();
    } catch (error) {
        console.error(error);
        showMessage("Unable to delete student");
    }
}

cancelButton.addEventListener("click", resetForm);

function resetForm() {
    studentForm.reset();
    studentIdInput.value = "";
    submitButton.textContent = "Add Student";
    cancelButton.hidden = true;
}

function showMessage(text) {
    message.textContent = text;
}

loadStudents();
