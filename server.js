const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); 
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(error => console.error("MongoDB connection failed:", error));

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    course: { type: String, required: true }
});

const Student = mongoose.model("Student", studentSchema);

// CREATE
app.post("/api/students", async (req, res) => {
    try {
        const { name, email, course } = req.body;

        if (!name || !email || !course) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const student = new Student({ name, email, course });
        const savedStudent = await student.save();

        res.status(201).json({
            message: "Student added successfully",
            student: savedStudent
        });
    } catch (error) {
        res.status(500).json({ message: "Unable to add student" });
    }
});

// READ ALL
app.get("/api/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch students" });
    }
});

// READ ONE
app.get("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ message: "Invalid student ID" });
    }
});

// UPDATE
app.put("/api/students/:id", async (req, res) => {
    try {
        const { name, email, course } = req.body;

        if (!name || !email || !course) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { name, email, course },
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({
            message: "Student updated successfully",
            student: updatedStudent
        });
    } catch (error) {
        res.status(400).json({ message: "Unable to update student" });
    }
});

// DELETE
app.delete("/api/students/:id", async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);

        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Unable to delete student" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
