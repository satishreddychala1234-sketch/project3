const express = require('express');
const router = express.Router();
const Student = require('../models/student');
router.post('/', async (req, res) => {
    const student = await student.find();
    res.json(student);
});
router.post('/',async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
});
module.exports = router;