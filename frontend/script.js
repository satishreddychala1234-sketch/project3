const form = document.getElementById("studentForm");
console.log(form);
const studentList = document.getElementById("studentList");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        course: document.getElementById("course").value
    };
    try{
        await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
        });

        loadStudents();
        form.reset();
    } catch (error) {
        console.error("Error registering student:", error);
    }
    
});

async function loadStudents() {
    const res = await fetch("http://localhost:5000/students");
    const data = await res.json();

    studentList.innerHTML = "";

    data.forEach(student => {
        const li = document.createElement("li");
        li.textContent =
            `${student.name} - ${student.email} - ${student.course}-${student.phone}`;
        studentList.appendChild(li);
    });
}

loadStudents();