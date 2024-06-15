import {query} from "../db/index.js";
import {validateEmail, validatePassword} from "./validate.js";
import {
    createStudentQuery,
    findStudentQuery,
    getAllStudentsQuery, searchStudentsQuery,
} from "./queries.js";
import bcrypt from "bcrypt";

export const getAllStudents = async (req, res) => {
    try {
        const result = await query(getAllStudentsQuery)
        res.status(200).json(result.rows)
    } catch (e) {
        console.error(e)
        res.status(500).send('Server error')
    }
}

export const createStudent = async (req, res) => {
    const { first_name, last_name, email, password, age, country, city } = req.body

    const isEmailValid = validateEmail(email)
    if (!isEmailValid) res.status(400).send('Invalid email.')


    try {
        const findResult = await query(findStudentQuery, [email])
        if (findResult.rows.length > 0) {
            return res.status(400).send('Student with that email already exists.')
        }
    } catch (e) {
        console.error('Error checking email:', e)
        return res.status(500).send('Something went wrong.')
    }

    const { isValid, messages } = validatePassword(password)
    if (!isValid) res.status(400).send(messages[0])

    const hashedPassword = await bcrypt.hash(password, 5)

    try {
        const createResult = await query(createStudentQuery, [first_name, last_name, email, hashedPassword, age, country, city])
        return res.status(200).json(createResult.rows[0])
    } catch (e) {
        console.error('Error creating student:', e)
        return res.status(500).send('Something went wrong.')
    }
};

export const editStudent = async (req, res) => {
    const fields = req.body
    const {id} = req.params

    const updateFields = {}
    const queryPattern = []

    Object.keys(fields).forEach((field, index) => {
        queryPattern.push(`${field} = $${index + 1}`)
        return updateFields[field] = fields[field]
    })

    updateFields.id = id

    if(fields.email) {
        const isEmailValid = validateEmail(fields.email)
        if(!isEmailValid) res.status(400).send('Invalid email.')
    }

    try {
        if(fields.email) {
            const findResult = await query(findStudentQuery, [fields.email])
            if(findResult.rows.length > 0) {
                return res.status(400).send('Student with that email already exists.')
            }
        }

    } catch (e) {
        console.error('Error checking email:', e)
        res.status(500).send('Something went wrong.')
    }

    try {
        const editResult = await query(`
              UPDATE student
              SET ${queryPattern.join(',')}
              WHERE id = $${queryPattern.length + 1} 
              RETURNING *
        `,
            [...Object.values(updateFields)]
        )
        return res.status(200).json(editResult.rows[0])
    } catch (e) {
        console.error('Error editing student:', e)
        res.status(500).send('Something went wrong.')
    }
}

export const searchStudents = async (req, res) => {
    const {first_name, last_name} = req.body
    try {
        const searchResult = await query(searchStudentsQuery, [first_name, last_name])
        if(searchResult.rows.length === 0) res.status(404).send('No student found.')

        return res.status(200).json(searchResult.rows)
    } catch (e) {
        console.error('Error searching student:', e)
        res.status(500).send('Something went wrong.')
    }
}