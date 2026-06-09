const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentdb")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    course: String
});

const Student = mongoose.model("Student", studentSchema);

app.post("/register", async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "Student Registered" });
});

app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
app.post("/register", async (req, res) => {
    console.log("Received Data:", req.body);

    try {
        const student = new Student(req.body);
        await student.save();

        res.json({
            message: "Student Registered Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
});