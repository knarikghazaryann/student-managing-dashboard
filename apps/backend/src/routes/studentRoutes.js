import express from "express";
import {getAllStudents, createStudent, editStudent, searchStudents} from "../controllers/studentController.js";

const router = express.Router()

router.get('/', getAllStudents)
router.post('/', createStudent)
router.patch('/:id', editStudent)
router.post('/search', searchStudents)

export default router